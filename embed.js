(function () {
  if (window.__SFWH_OFFER_EMBED__) return;
  window.__SFWH_OFFER_EMBED__ = true;

  var SOURCE = 'https://yiyang512.github.io/hemiya-tool/';
  var script = document.currentScript;
  var mount = document.getElementById('sfwh-offer-embed');

  if (!mount) {
    mount = document.createElement('div');
    mount.id = 'sfwh-offer-embed';
    if (script && script.parentNode) {
      script.parentNode.insertBefore(mount, script);
    } else {
      (document.body || document.documentElement).appendChild(mount);
    }
  }

  mount.style.cssText =
    'width:100%;max-width:1320px;margin:0 auto;min-height:900px;';

  var frame = document.createElement('iframe');
  frame.src = SOURCE;
  frame.title = 'Simple French with Hems — What We Offer';
  frame.loading = 'lazy';
  frame.setAttribute('allowfullscreen', '');
  frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
  frame.style.cssText =
    'width:100%;height:5200px;border:0;display:block;background:#fff;';
  mount.appendChild(frame);

  window.addEventListener('message', function (event) {
    if (!event || !event.data || event.data.type !== 'sfwh:resize') return;
    var height = Number(event.data.height);
    if (!height) return;
    frame.style.height = Math.max(900, height) + 'px';
  });
})();
