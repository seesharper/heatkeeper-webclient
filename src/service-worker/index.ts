self.addEventListener('activate', event => {
    console.log('Service worker activated:', event);
});


self.addEventListener('install', (event) => {
    console.log('Service worker installed:', event);
});