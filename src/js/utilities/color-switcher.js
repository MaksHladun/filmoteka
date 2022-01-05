const toggleSwitch = document.querySelector('.theme-switch__toggle');
const bodyRef = document.querySelector('body');
const fotBack = document.querySelector('.footer-container');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

toggleSwitch.addEventListener('change', switchTheme, false);

export function switchTheme(e) {
  if (e.target.checked) {
    bodyRef.classList.remove(Theme.LIGHT);
    bodyRef.classList.add(Theme.DARK);
    localStorage.setItem('theme', Theme.DARK);
    fotBack.style.backgroundColor = ('var(--backg-fot-second)');
  } else {
    bodyRef.classList.remove(Theme.DARK);
    bodyRef.classList.add(Theme.LIGHT);
    localStorage.setItem('theme', Theme.LIGHT);
     fotBack.style.backgroundColor = ('var(--backg-fot-color)');
  }
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
  bodyRef.classList.add(currentTheme);

  if (currentTheme === Theme.DARK) {
    toggleSwitch.checked = true;
     fotBack.style.backgroundColor = ('var(--backg-fot-second)');
  }
}