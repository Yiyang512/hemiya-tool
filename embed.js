(function () {

  if (window.__SFWH_OFFER_EMBED__) return;
  window.__SFWH_OFFER_EMBED__ = true;

  var SOURCE = 'https://yiyang512.github.io/hemiya-tool/';
  var DESKTOP_WIDTH = 1660;
  var MOBILE_BREAKPOINT = 900;

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


  /* -----------------------------
     EMBED CONTAINER
  ----------------------------- */

  mount.style.width = '100%';
  mount.style.maxWidth = 'none';
  mount.style.margin = '0 auto';
  mount.style.padding = '0';
  mount.style.position = 'relative';
  mount.style.overflow = 'hidden';
  mount.style.background = '#fff';


  /* -----------------------------
     IFRAME
  ----------------------------- */

  var frame = document.createElement('iframe');

  frame.src = SOURCE;
  frame.title = 'Simple French with Hems — Hemiya';
  frame.loading = 'lazy';

  frame.setAttribute('allowfullscreen', '');
  frame.setAttribute(
    'referrerpolicy',
    'no-referrer-when-downgrade'
  );

  frame.style.border = '0';
  frame.style.display = 'block';
  frame.style.background = '#fff';
  frame.style.transformOrigin = 'top left';

  mount.appendChild(frame);


  /* -----------------------------
     HEIGHT + SCALE
  ----------------------------- */

  var contentHeight = 5200;

  function updateEmbedSize() {

    var availableWidth = mount.clientWidth;

    if (!availableWidth) return;


    /*
      DESKTOP / TABLET

      Give Hemiya a wider virtual browser
      so its complete desktop interface fits,
      then scale it down to the Payhip section.
    */

    if (availableWidth >= MOBILE_BREAKPOINT) {

      var scale = Math.min(
        1,
        availableWidth / DESKTOP_WIDTH
      );

      frame.style.position = 'absolute';
      frame.style.top = '0';
      frame.style.left = '0';

      frame.style.width = DESKTOP_WIDTH + 'px';
      frame.style.height = contentHeight + 'px';

      frame.style.transform =
        'scale(' + scale + ')';

      mount.style.height =
        Math.ceil(contentHeight * scale) + 'px';

    }


    /*
      MOBILE

      Do not scale the desktop version.
      Let Hemiya use its normal responsive layout.
    */

    else {

      frame.style.position = 'absolute';
      frame.style.top = '0';
      frame.style.left = '0';

      frame.style.width = '100%';
      frame.style.height = contentHeight + 'px';

      frame.style.transform = 'none';

      mount.style.height =
        contentHeight + 'px';
    }

  }


  /* -----------------------------
     RECEIVE AUTO HEIGHT
     FROM HEMIYA
  ----------------------------- */

  window.addEventListener(
    'message',
    function (event) {

      if (
        event.origin !== 'https://yiyang512.github.io'
      ) {
        return;
      }

      if (
        !event.data ||
        event.data.type !== 'sfwh:resize'
      ) {
        return;
      }

      var height = Number(event.data.height);

      if (!height || height < 100) return;

      contentHeight = height;

      updateEmbedSize();
    }
  );


  /* -----------------------------
     RESIZE WHEN WEBSITE WIDTH
     CHANGES
  ----------------------------- */

  window.addEventListener(
    'resize',
    updateEmbedSize
  );

  if ('ResizeObserver' in window) {

    var observer = new ResizeObserver(
      updateEmbedSize
    );

    observer.observe(mount);
  }


  /* Initial render */

  updateEmbedSize();

})();
