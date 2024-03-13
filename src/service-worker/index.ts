self.addEventListener('activate', event => {
    console.log('Service worker activated:', event);
});


self.addEventListener('install', (event) => {
    console.log('Service worker installed:', event);
});

// self.addEventListener('visibilitychange', function () {
//     if (document.visibilityState === 'visible') {
//         console.log('APP resumed');
//         window.location.reload();
//     }
// });