import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://realthergroup.com";
  const currentDate = new Date().toISOString();

  // Core static routes
  const staticRoutes = [
    "",
    "/all-homes",
    "/sold-homes",
    "/buyer",
    "/seller",
    "/meet-realther",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" || route.includes("homes") ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : route.includes("homes") ? 0.9 : 0.7,
  }));

  return staticRoutes;
}