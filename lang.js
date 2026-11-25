// 依網址 #en／#ja／#zh-Hans／#zh-Hant 或瀏覽器語言顯示對應段落
(function () {
  var langs = ['zh-Hant', 'en', 'ja', 'zh-Hans'];
  function pick() {
    var h = location.hash.slice(1);
    if (langs.indexOf(h) >= 0) return h;
    var n = (navigator.language || 'en').toLowerCase();
    if (n.indexOf('ja') === 0) return 'ja';
    if (n.indexOf('zh') === 0) return /hans|cn|sg/.test(n) ? 'zh-Hans' : 'zh-Hant';
    return 'en';
  }
  function show(l) {
    document.documentElement.lang = l;
    document.querySelectorAll('section[data-lang]').forEach(function (s) { s.classList.toggle('on', s.dataset.lang === l); });
    document.querySelectorAll('nav.lang button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.l === l); });
    var t = document.querySelector('section[data-lang="' + l + '"]');
    if (t && t.dataset.title) document.title = t.dataset.title;
  }
  document.querySelectorAll('nav.lang button').forEach(function (b) {
    b.onclick = function () { history.replaceState(null, '', '#' + b.dataset.l); show(b.dataset.l); };
  });
  window.addEventListener('hashchange', function () { show(pick()); });
  show(pick());
})();
