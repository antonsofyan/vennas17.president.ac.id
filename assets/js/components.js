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
        .then(function (html) { 
          el.innerHTML = html; 
          
          if (c.id === 'nav-placeholder') {
            initNav();
          }
        })
        .catch(function (err) { console.error('Failed to load ' + c.file, err); });
    }
  });

  function initNav() {
    var toggle = document.getElementById('nav-toggle');
    var sidebar = document.getElementById('nav-sidebar');
    var overlay = document.getElementById('nav-overlay');
    var iconOpen = document.getElementById('nav-icon-open');
    var iconClose = document.getElementById('nav-icon-close');
    var closeBtn = document.getElementById('nav-close-btn');
    var open = false;

    if (!toggle || !sidebar) return;

    function setNav(show) {
      open = show;
      if (show) {
        sidebar.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        if (iconOpen) iconOpen.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');
      } else {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        if (iconOpen) iconOpen.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      }
    }

    toggle.addEventListener('click', function() { setNav(!open); });
    
    if (closeBtn) {
      closeBtn.addEventListener('click', function() { setNav(false); });
    }
    if (overlay) {
      overlay.addEventListener('click', function() { setNav(false); });
    }
  }
});
