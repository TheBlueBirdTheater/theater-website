import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * FontAwesome icon objects store path data as [width, height, ligatures, unicode, svgPathData].
 * This renders that shape as an inline SVG string, avoiding a React icon library or sprite system.
 */
export function iconToSvg(iconDef: IconDefinition, className = ''): string {
  const [width, height, , , svgPathData] = iconDef.icon;
  const paths = Array.isArray(svgPathData) ? svgPathData.join(' ') : svgPathData;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" class="${className}" fill="currentColor" aria-hidden="true"><path d="${paths}"/></svg>`;
}
