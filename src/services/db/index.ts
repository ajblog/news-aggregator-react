export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const request = indexedDB.open("newsApp", 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      // User store
      if (!db.objectStoreNames.contains("users")) {
        const userStore = db.createObjectStore("users", { keyPath: "id" });
        userStore.createIndex("usernameIdx", "username", { unique: true });
      }

      // Preference store
      if (!db.objectStoreNames.contains("preferences")) {
        const preferenceStore = db.createObjectStore("preferences", {
          keyPath: "id",
        });
        preferenceStore.createIndex("userIdIdx", "userId");
      }
    };

    request.onsuccess = () => resolve(true);
    request.onerror = () => resolve(false);
  });
};

export * from "./auth";
export * from "./preference";
