const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export async function requestNotificationPermission(): Promise<void> {
  if ("Notification" in window) {
    try {
      const result = await Notification.requestPermission();
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diizinkan.");
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan izin.");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const arrayBufferToArrayNumber = (
  arrBuffer: ArrayBuffer | null
): number[] | null => {
  if (!arrBuffer) return null;

  const uint8Arr = new Uint8Array(arrBuffer);
  return Array.from(uint8Arr);
};

export async function getNotificationSubscription(): Promise<void> {
  navigator.serviceWorker.ready.then(async () => {
    if ("PushManager" in window) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration !== undefined) {
          const subscribtion = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "BKrlDhc0zQnMTPFjLdezIyRaxklJTEegifGWrNHhN3TvHkNVSAI-jYwqRUhigqeqG42C3mFnJL7uJ-JUpGzWbCs"
            ),
          });

          const p256dhKey = arrayBufferToArrayNumber(
            subscribtion.getKey("p256dh")
          );
          const authKey = arrayBufferToArrayNumber(subscribtion.getKey("auth"));

          if (!p256dhKey || !authKey) return;

          console.log(
            `endpoint: '${subscribtion.endpoint}', keys: { p256dh: '${btoa(
              String.fromCharCode.apply(null, p256dhKey)
            )}', auth: '${btoa(String.fromCharCode.apply(null, authKey))}'}`
          );
        }
      } catch (error) {
        console.error("Tidak mendapatkan registration", error);
      }
    } else {
      console.log("PushManager tidak didukung browser ini.");
    }
  });
}
