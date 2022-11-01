import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import Logo from '../images/logo.png';

const installBtn = document.getElementById('buttonInstall');
if (window.matchMedia('(display-mode: standalone)').matches) {
  installBtn.style.display = "none";
}
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installBtn.style.visibility = 'visible';
  installBtn.addEventListener('click', () => {
    event.prompt();
    installBtn.setAttribute('disabled', true);
    installBtn.textContent = 'Installed!';
    });
  });
  window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
  });
window.addEventListener('load', function () {
  console.log("Load Listener: Engaged")
  document.getElementById('logo').src = Logo;
})

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
