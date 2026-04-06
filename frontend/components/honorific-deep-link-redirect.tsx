"use client";

import { useLayoutEffect } from "react";

/**
 * Next.js server redirects omit URL fragments; honorifics live at /paths/...#title-slug.
 */
export function HonorificDeepLinkRedirect({ href }: { href: string }) {
  useLayoutEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <p className="text-zinc-400">Opening this honorific on its path…</p>
      <a
        href={href}
        className="mt-6 inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
      >
        Continue
      </a>
    </div>
  );
}
