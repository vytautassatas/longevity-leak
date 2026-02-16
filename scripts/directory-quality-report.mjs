import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const strictMode = process.argv.includes("--strict");
const rootDir = process.cwd();
const directoryPath = path.join(rootDir, "lib", "directory.ts");
const require = createRequire(import.meta.url);

function loadDirectoryModule() {
  const source = fs.readFileSync(directoryPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    }
  }).outputText;

  const moduleObj = { exports: {} };
  const context = vm.createContext({
    module: moduleObj,
    exports: moduleObj.exports,
    require,
    process,
    console,
    URL,
    Date,
    Set,
    Map,
    Error,
    RegExp
  });

  vm.runInContext(transpiled, context, { filename: directoryPath });
  return moduleObj.exports;
}

function summarizeByCode(issues) {
  const counts = new Map();
  for (const issue of issues) {
    counts.set(issue.code, (counts.get(issue.code) ?? 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function summarizeByRecordType(issues) {
  const counts = new Map();
  for (const issue of issues) {
    const type = issue.recordName.split("/")[0] || "unknown";
    counts.set(type, (counts.get(type) ?? 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function printIssueSamples(label, issues) {
  const sampleSize = Math.min(10, issues.length);
  if (sampleSize === 0) return;

  console.log(`\n${label} (sample ${sampleSize}/${issues.length}):`);
  for (const issue of issues.slice(0, sampleSize)) {
    console.log(`- ${issue.recordName}: [${issue.code}] ${issue.detail}`);
  }
}

try {
  const directory = loadDirectoryModule();
  const dataset = {
    supplements: directory.getSupplements(),
    conditions: directory.getConditions(),
    clinics: directory.getClinics()
  };

  const issues = directory.getDirectoryQualityIssues(dataset);
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const errors = issues.filter((issue) => issue.severity === "error");
  const byCode = summarizeByCode(issues);
  const warningsByType = summarizeByRecordType(warnings);

  console.log("Directory Quality Report");
  console.log(`- Supplements: ${dataset.supplements.length}`);
  console.log(`- Conditions: ${dataset.conditions.length}`);
  console.log(`- Clinics: ${dataset.clinics.length}`);
  console.log(`- Errors: ${errors.length}`);
  console.log(`- Warnings: ${warnings.length}`);

  if (byCode.length > 0) {
    console.log("\nIssue counts by code:");
    for (const [code, count] of byCode) {
      console.log(`- ${code}: ${count}`);
    }
  }

  if (warningsByType.length > 0) {
    console.log("\nWarning counts by record type:");
    for (const [type, count] of warningsByType) {
      console.log(`- ${type}: ${count}`);
    }
  }

  printIssueSamples("Errors", errors);
  printIssueSamples("Warnings", warnings);

  if (errors.length > 0) process.exit(1);
  if (strictMode && warnings.length > 0) process.exit(1);
} catch (error) {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(`Directory quality report failed:\n${message}`);
  process.exit(1);
}
