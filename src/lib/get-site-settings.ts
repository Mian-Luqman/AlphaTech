import { siteConfig } from "@/config/site"

interface SiteSettings {
  siteName: string
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return {
    siteName: siteConfig.name,
  }
}
