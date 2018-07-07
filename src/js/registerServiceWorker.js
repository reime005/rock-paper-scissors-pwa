export default () => {
  if (!navigator.serviceWorker) {
    return;
  }

  function install(worker) {
    console.log('Service Worker is installing ...');

    worker.addEventListener('statechange', () => {
      console.log(`Service Worker state changed: ${worker.state}`);
    });
  }

  navigator.serviceWorker.register('serviceWorker.js', {
    scope: './'
  }).then(registration => {
    console.log('Service Worker has been registered');

    if (typeof navigator.serviceWorker.controller === 'undefined') {
      return;
    }

    if (registration.waiting) {
      console.log('Service Worker has been installed');
      return;
    }

    if (registration.installing) {
      install(registration.installing);
      return;
    }

    registration.addEventListener('updatefound', () => {
      console.log('Service Worker is updating');
      install(registration.installing);
    });
  }).catch(error => {
    console.log(`Service Worker registration error: ${error.message}`);
  });
}
