import type { PageFrontmatter } from './types';

/**
 * Astro's Markdown/MDX `layout:` frontmatter field invokes the layout with
 * `Astro.props.frontmatter` (plus `headings`, `url`, etc.), while a layout imported
 * and used directly as a component (`<DefaultLayout title="...">`) receives the same
 * fields as flat top-level props. LayoutProps covers both shapes.
 */
export interface LayoutProps extends PageFrontmatter {
  frontmatter?: PageFrontmatter;
  headings?: { depth: number; slug: string; text: string }[];
  [key: string]: unknown;
}

export function resolveFrontmatter(props: LayoutProps): PageFrontmatter {
  return (props.frontmatter ?? props) as PageFrontmatter;
}
