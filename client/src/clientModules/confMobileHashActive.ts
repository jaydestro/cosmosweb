fix the function runWhenBrowser(fn: () => void): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  fn();
}

function isConfHomePathname(pathname: string): boolean {
  // Docusaurus may run under a baseUrl, but in our site baseUrl is '/'.
  // Be defensive and match the end of the path.
  return pathname === "/conf" || pathname === "/conf/" || pathname.endsWith("/conf") || pathname.endsWith("/conf/");
}

function setActiveForConfHash(): void {
  const { pathname, hash } = window.location;

  // Only handle the /conf homepage anchors.
  if (!isConfHomePathname(pathname)) return;

  const sidebar = document.querySelector<HTMLElement>(".navbar-sidebar");
  if (!sidebar) return;

  const allMenuLinks = Array.from(
    sidebar.querySelectorAll<HTMLAnchorElement>("a.menu__link")
  );

  // Remove active styling from conf hash links only (avoid breaking real-page actives).
  for (const link of allMenuLinks) {
    const href = link.getAttribute("href") || "";
    if (href.startsWith("/conf#")) {
      link.classList.remove("menu__link--active");
    }
  }

  if (!hash) return;

  const wanted = `/conf${hash}`;
  for (const link of allMenuLinks) {
    const href = link.getAttribute("href") || "";
    if (href === wanted) {
      link.classList.add("menu__link--active");
    }
  }
}

runWhenBrowser(() => {
  const applySoon = () => {
    // The menu can render async; try a couple frames.
    requestAnimationFrame(() => setActiveForConfHash());
    setTimeout(() => setActiveForConfHash(), 0);
    setTimeout(() => setActiveForConfHash(), 150);
  };

  window.addEventListener("hashchange", applySoon, { passive: true });
  window.addEventListener("popstate", applySoon, { passive: true });

  // When the mobile sidebar opens, its links may be inserted after the click.
  const observer = new MutationObserver(() => applySoon());
  observer.observe(document.body, { attributes: true, childList: true, subtree: true });

  applySoon();
});
