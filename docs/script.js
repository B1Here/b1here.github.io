function switchTheme(theme) {
  if (theme) {
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  } else {
    theme = 'system';
  }
}

function initPage() {
  switchTheme(localStorage.getItem('theme'));
}
