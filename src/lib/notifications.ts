export async function getPermission() {
    let result = await Notification.requestPermission();
    console.log('Notification permission:', result);
}