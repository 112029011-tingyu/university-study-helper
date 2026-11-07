(function () {
  var slides = [].slice.call(document.querySelectorAll('.slide'));
  if (!slides.length) return;
  document.documentElement.classList.add('js');
  var i = 0;
  var counter = document.createElement('div');
  counter.className = 'counter';
  var nav = document.createElement('div');
  nav.className = 'nav';
  nav.innerHTML = '<button type="button" aria-label="上一張">←</button><button type="button" aria-label="下一張">→</button>';
  document.body.appendChild(counter);
  document.body.appendChild(nav);
  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, k) { s.classList.toggle('active', k === i); });
    slides[i].scrollTop = 0;
    counter.textContent = (i + 1) + ' / ' + slides.length;
    history.replaceState(null, '', '#' + (i + 1));
  }
  nav.children[0].onclick = function () { show(i - 1); };
  nav.children[1].onclick = function () { show(i + 1); };
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'SUMMARY') return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') show(i + 1);
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') show(i - 1);
  });
  var x0 = null;
  document.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; });
  document.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 60) show(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });
  show((parseInt(location.hash.slice(1), 10) || 1) - 1);
})();
