document.addEventListener('DOMContentLoaded', function () {
  var components = [
    { id: 'footer-placeholder', file: 'components/footer.html' },
    { id: 'nav-placeholder', file: 'components/nav.html' }
  ];

  components.forEach(function (c) {
    var el = document.getElementById(c.id);
    if (el) {
      fetch(c.file)
        .then(function (r) { return r.text(); })
        .then(function (html) { el.innerHTML = html; })
        .catch(function (err) { console.error('Failed to load ' + c.file, err); });
    }
  });
});

