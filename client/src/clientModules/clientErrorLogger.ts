function runWhenBrowser(fn: () => void): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  fn();
}

runWhenBrowser(() => {
  const logPrefix = "[client-error]";

  window.addEventListener("error", (event) => {
    const errorEvent = event as ErrorEvent;
    const details = {
      message: errorEvent.message,
      filename: errorEvent.filename,
      lineno: errorEvent.lineno,
      colno: errorEvent.colno,
      stack: errorEvent.error?.stack,
      href: window.location.href,
      userAgent: navigator.userAgent,
    };
    console.error(logPrefix, "window.error", details);
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason as Error | string | undefined;
    const details = {
      reason: typeof reason === "string" ? reason : reason?.message,
      stack: typeof reason === "string" ? undefined : reason?.stack,
      href: window.location.href,
      userAgent: navigator.userAgent,
    };
    console.error(logPrefix, "unhandledrejection", details);
  });
});
