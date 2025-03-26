let deferredPrompt;
const installButton = document.getElementById('install-button');

// Obsługa zdarzenia, gdy przeglądarka wykryje możliwość instalacji PWA
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.style.display = 'block';
});

// Obsługa kliknięcia przycisku instalacji
installButton.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    deferredPrompt = null;
    installButton.style.display = 'none';
  }
});

// Rejestracja Service Workera
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker zarejestrowany:', reg.scope))
      .catch(err => console.log('Błąd rejestracji SW:', err));
  });
}
