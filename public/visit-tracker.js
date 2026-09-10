(() => {
  if (/^\/(admin|api)(\/|$)/.test(location.pathname) || navigator.webdriver) return;
  function track() {
    if (document.visibilityState !== "visible") return;
    document.removeEventListener("visibilitychange", track);
    let visitorId;
    try {
      visitorId = localStorage.getItem("portfolio-visitor");
      if (!visitorId || !/^[a-f0-9-]{36}$/i.test(visitorId)) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("portfolio-visitor", visitorId);
      }
      const last = Number(localStorage.getItem("portfolio-visit-at") || 0);
      if (Date.now() - last < 30 * 60 * 1000) return;
    } catch { return; }
    fetch("/api/visits", {
      method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true,
      body: JSON.stringify({ visitorId, path: location.pathname, referrer: document.referrer }),
    }).then((response) => {
      if (response.ok) { try { localStorage.setItem("portfolio-visit-at", String(Date.now())); } catch {} }
    }).catch(() => {});
  }
  if (document.visibilityState === "visible") track();
  else document.addEventListener("visibilitychange", track);
})();
