import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

// `new Date()` below reads wall-clock time, which Next treats as a
// dynamic signal — force static so it's fine under `output: "export"`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
