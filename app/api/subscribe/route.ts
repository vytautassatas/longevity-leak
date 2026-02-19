import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SHEET_ID  = process.env.GOOGLE_SHEET_ID   ?? "";
const SHEET_TAB = process.env.GOOGLE_SHEET_TAB  ?? "Subscribers";

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON ?? "";
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON env var is not set");
  const creds = JSON.parse(raw) as {
    client_email: string;
    private_key: string;
  };
  return new google.auth.JWT(
    creds.client_email,
    undefined,
    creds.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { email?: string };
    const email = (body.email ?? "").trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    if (!SHEET_ID) {
      return NextResponse.json({ ok: false, error: "Sheet not configured" }, { status: 500 });
    }

    const auth   = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const timestamp = new Date().toISOString();
    const source    = (req.headers.get("referer") ?? "").includes("/join") ? "join-page" : "hero";

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range:         `${SHEET_TAB}!A:C`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [[email, timestamp, source]] },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
