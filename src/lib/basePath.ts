/**
 * GitHub Pages serves this site under /Portfolio/, not the domain root.
 * Next's basePath config rewrites its own routing/asset URLs automatically,
 * but plain hardcoded root-absolute hrefs (e.g. "/resume.pdf") don't get
 * that treatment — so anything reaching into `public/` by hand needs to
 * go through this helper. NEXT_PUBLIC_BASE_PATH is inlined at build time
 * and only set in the GitHub Actions workflow; local dev/build is
 * unaffected (empty prefix).
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
