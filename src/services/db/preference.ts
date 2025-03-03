import { DB_VERSION } from "../../constants";
import { Preference } from "../../types";

// preferences.ts
export class PreferenceService {
  public static async savePreferences(
    userId: string,
    preferences: Partial<Preference>
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const request = indexedDB.open("newsApp", DB_VERSION);

      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(["preferences"], "readwrite");
        const store = tx.objectStore("preferences");

        // Get existing preferences or create new
        const req = store.index("userIdIdx").get(userId);
        req.onsuccess = () => {
          const existingPref = req.result;
          const prefToSave = existingPref || {
            id: crypto.randomUUID(),
            userId,
          };

          // Update with new values
          Object.assign(prefToSave, preferences);

          const saveReq = store.put(prefToSave);
          saveReq.onsuccess = () => resolve(true);
          saveReq.onerror = () => resolve(false);
        };
      };
    });
  }

  public static async getPreferences(
    userId: string
  ): Promise<Preference | null> {
    return new Promise((resolve) => {
      const request = indexedDB.open("newsApp", DB_VERSION);

      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(["preferences"], "readonly");
        const store = tx.objectStore("preferences");
        const index = store.index("userIdIdx");

        const req = index.get(userId);
        req.onsuccess = () => resolve(req.result || null);
      };
    });
  }
}
