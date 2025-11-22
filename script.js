/**
 * @typedef {'system' | 'light' | 'dark'} Theme
 */

/**
 * @typedef {object} PageState
 * @property {Theme} theme
 */

/**
 * @type {PageState}
 */
const pageState = {
  theme: 'light',
};

const themeSwitchButton = document.querySelector('#theme-switch-button');
const menuBackdrop = document.querySelector('#menu-backdrop');
const navBar = document.querySelector('nav');
const themeChoices = document.querySelector('#theme-choices');

const systemThemeButton = document.querySelector('#system-theme-button');
const lightThemeButton = document.querySelector('#light-theme-button');
const darkThemeButton = document.querySelector('#dark-theme-button');

function systemSvg() {
  return document.querySelector('#icon-contrast').content.cloneNode(true);
}

function lightSvg() {
  return document.querySelector('#icon-light').content.cloneNode(true);
};

function darkSvg() {
  return document.querySelector('#icon-dark').content.cloneNode(true);
};

function toggleMenu() {
  navBar.classList.toggle('open');
  menuBackdrop.classList.toggle('visible');
  if (themeChoices.classList.contains('visible')) {
    themeChoices.classList.remove('visible');
  }
}

function toggleThemeMenu() {
  themeChoices.classList.toggle("visible");
}

/**
 * @param {Theme | null} theme
 */
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

  themeSwitchButton.replaceChildren();
  switch (theme) {
    case 'system':
      themeSwitchButton.appendChild(systemSvg());
      systemThemeButton.setAttribute('disabled', '');
      lightThemeButton.removeAttribute('disabled');
      darkThemeButton.removeAttribute('disabled');
      break;
    case 'light':
      themeSwitchButton.appendChild(lightSvg());
      systemThemeButton.removeAttribute('disabled');
      lightThemeButton.setAttribute('disabled', '');
      darkThemeButton.removeAttribute('disabled');
      break;
    case 'dark':
      themeSwitchButton.appendChild(darkSvg());
      systemThemeButton.removeAttribute('disabled');
      lightThemeButton.removeAttribute('disabled');
      darkThemeButton.setAttribute('disabled', '');
      break;
  }

  pageState.theme = theme;
  localStorage.setItem('theme', theme);
  themeChoices.classList.remove('visible');
}


function initTemplates() {
  // copyright date
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  document.querySelector('#copyright-info').textContent = `© ${currentYear} B1 Gaming`;
}

function initListeners() {
  document.querySelector('#menu-button').addEventListener('click', toggleMenu);
  menuBackdrop.addEventListener('click', toggleMenu);
  document.querySelector('#close-button').addEventListener('click', toggleMenu);
  themeSwitchButton.addEventListener('click', toggleThemeMenu);

  systemThemeButton.addEventListener('click', () => switchTheme('system'));
  lightThemeButton.addEventListener('click', () => switchTheme('light'));
  darkThemeButton.addEventListener('click', () => switchTheme('dark'));
}

function initPage() {
  switchTheme(localStorage.getItem('theme'));
  initTemplates();
  initListeners();

  const systemSvgClone = systemSvg();
  systemSvgClone.children[0].classList.remove('icon-link');
  const lightSvgClone = lightSvg();
  lightSvgClone.children[0].classList.remove('icon-link');
  const darkSvgClone = darkSvg();
  darkSvgClone.children[0].classList.remove('icon-link');

  systemThemeButton.prepend(systemSvgClone);
  lightThemeButton.prepend(lightSvgClone);
  darkThemeButton.prepend(darkSvgClone);
}

addEventListener('DOMContentLoaded', initPage);
