(function () {
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');

  function freezeGif(img) {
    var src = img.src;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var tempImg = new Image();

    tempImg.crossOrigin = 'anonymous';

    tempImg.onload = function () {
      canvas.width = tempImg.naturalWidth;
      canvas.height = tempImg.naturalHeight;
      ctx.drawImage(tempImg, 0, 0);
      img.src = canvas.toDataURL('image/png');
      img.setAttribute('data-reduced-motion', 'frozen');
    };

    // CORS fallback: hide the GIF; the h1 text remains as the visible title
    tempImg.onerror = function () {
      img.classList.add('gif-hidden');
    };

    // Cache-bust so the browser re-fetches with crossOrigin set
    tempImg.src = src + (src.indexOf('?') === -1 ? '?' : '&') + '_rm=' + Date.now();
  }

  function applyToAll() {
    document.querySelectorAll('.header_gif').forEach(function (img) {
      if (img.getAttribute('data-reduced-motion') === 'frozen') return;
      if (img.complete && img.naturalWidth) {
        freezeGif(img);
      } else {
        img.addEventListener('load', function () { freezeGif(img); }, { once: true });
      }
    });
  }

  if (mq.matches) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyToAll);
    } else {
      applyToAll();
    }
  }

  // Respond if the user toggles the setting while the page is open
  mq.addEventListener('change', function (e) {
    if (e.matches) applyToAll();
  });
}());
