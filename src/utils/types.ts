export interface PageFrontmatter {
  title: string;
  description: string;
  /** OG/Twitter share image path, relative to site root. Defaults to /images/og-default.jpg if omitted. */
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  /** Overrides the auto-computed canonical URL. Rarely needed. */
  canonical?: string;
}
