/*
 * diem — signup fallback
 *
 * Beehiiv only renders its embed when the page is served from a real
 * http(s) origin — it silently shows nothing if this file is opened
 * directly (file://) instead of through a server. That's the one
 * failure mode we can detect for certain, so we show a plain fallback
 * message right away instead of leaving an empty box. See README.
 */
(function () {
  var signup = document.getElementById("signup");
  var fallback = signup && signup.querySelector(".signup-fallback");
  if (!signup || !fallback) return;

  function hasForm() {
    return !!signup.querySelector("iframe");
  }

  // Beehiiv still inserts its (non-functional) wrapper markup even when
  // it can't actually render — hide anything but our own fallback so the
  // two never show at once.
  function hideBeehiivMarkup() {
    Array.prototype.forEach.call(signup.children, function (el) {
      if (el !== fallback) el.style.display = "none";
    });
  }

  if (window.location.protocol === "file:") {
    // Beehiiv can never render here, however long we wait, so don't
    // bother with the timeout below: show the fallback immediately and
    // keep hiding anything Beehiiv's script inserts afterward.
    fallback.hidden = false;
    hideBeehiivMarkup();
    new MutationObserver(hideBeehiivMarkup).observe(signup, { childList: true });
    return;
  }

  // Served over http(s): Beehiiv should load. As a secondary safety net
  // (an ad/privacy blocker, offline, or Beehiiv briefly down), fall back
  // if its script never even inserts the form's iframe.
  var timer = window.setTimeout(function () {
    if (!hasForm()) fallback.hidden = false;
  }, 4000);

  new MutationObserver(function () {
    if (hasForm()) {
      window.clearTimeout(timer);
      fallback.hidden = true;
    }
  }).observe(signup, { childList: true });
})();
