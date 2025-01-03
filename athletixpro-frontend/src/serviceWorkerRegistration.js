// src/serviceWorkerRegistration.js

// Controlla se il browser supporta i service worker
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname === '127.0.0.1'
  );
  
  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // Il service worker viene registrato solo in modalità produzione
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // Se è localhost, controlla se esiste un service worker registrato
          checkValidServiceWorker(swUrl, config);
        } else {
          // In altri casi, registra il service worker normalmente
          registerValidSW(swUrl, config);
        }
      });
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker registrato:', registration);
  
        if (config && config.onSuccess) {
          config.onSuccess(registration);
        }
      })
      .catch((error) => {
        console.error('Registrazione del Service Worker fallita:', error);
        if (config && config.onError) {
          config.onError(error);
        }
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    fetch(swUrl)
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType && contentType.indexOf('javascript') === -1)
        ) {
          // Nessun service worker valido trovato
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
          });
        } else {
          // Service worker valido trovato
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log('Non è stato possibile ottenere un service worker');
      });
  }
  