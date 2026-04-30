import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "z0n67hcj",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
