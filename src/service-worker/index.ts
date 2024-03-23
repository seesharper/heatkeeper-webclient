/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

export type { };
declare const self: ServiceWorkerGlobalScope;

self.addEventListener('activate', event => {
    console.log('Service worker activated:', event);
});

self.addEventListener('install', (event) => {
    console.log('Service worker installed:', event);
});

self.addEventListener('push', (event: PushEvent) => {
    console.log('Service worker push:', event.data?.text());
    const options: NotificationOptions = {
        body: event.data?.text(),
    };

    event.waitUntil(
        self.registration.showNotification("HeatKeeper", options
        ));
});

