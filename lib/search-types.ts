export type SearchItemType = "article" | "supplement" | "condition";

export type SearchIndexItem = {
  id: string;
  type: SearchItemType;
  title: string;
  description: string;
  href: string;
  slug: string;
  keywords: string[];
  updatedAt: string;
};

export type SearchIndexResponse = {
  generatedAt: string;
  items: SearchIndexItem[];
};
