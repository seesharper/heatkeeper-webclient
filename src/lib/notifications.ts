import { Post, createSubscription } from "./api";

export async function getPermission() {
    let result = await Notification.requestPermission();
    console.log('Notification permission:', result);
    if (result === 'granted') {

        console.log('Notification permission granted.');
        const subscription = await getSubscription();
        console.log('Subscription:', subscription);
        await createSubscription(subscription);
    }

    console.log('Notification permission:', result);
}

export async function getSubscription() {

    // TODO Get this from server.
    const publicKey = "BM49Pi0l8BlT6j14YcoQYwMqUA8XluNABnbARslTJaa64dtjyvCNGv-_W8jfmB7f5MPtD0DVz1C6RCmAENIWatA";

    let registration = await navigator.serviceWorker.ready;
    let subscription: PushSubscription = await registration.pushManager.subscribe({ applicationServerKey: publicKey, userVisibleOnly: true })
    return subscription;
}