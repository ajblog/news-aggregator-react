import { DB_VERSION } from "../../constants";
import { User } from "../../types";

export class AuthService {
  private static async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  private static async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("newsApp", DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("users")) {
          const userStore = db.createObjectStore("users", { keyPath: "id" });
          userStore.createIndex("usernameIdx", "username", { unique: true });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public static async registerUser(
    username: string,
    password: string
  ): Promise<User | null> {
    try {
      const db = await this.getDB(); // Ensure DB is ready before proceeding
      const hashedPassword = await this.hashPassword(password);

      return new Promise((resolve, reject) => {
        const tx = db.transaction(["users"], "readwrite");
        const store = tx.objectStore("users");

        const user = {
          id: crypto.randomUUID(),
          username,
          passwordHash: hashedPassword,
        };

        const req = store.add(user);
        req.onsuccess = () => resolve(user);
        req.onerror = () => reject(null);
      });
    } catch (error) {
      console.error("Error initializing DB:", error);
      return null;
    }
  }

  public static async loginUser(
    username: string,
    password: string
  ): Promise<User | null> {
    try {
      const db = await this.getDB(); // Ensure DB is ready before proceeding
      const hashedPassword = await this.hashPassword(password);

      return new Promise((resolve, reject) => {
        const tx = db.transaction(["users"], "readonly");
        const store = tx.objectStore("users");

        if (!store.indexNames.contains("usernameIdx")) {
          console.error("Index usernameIdx not found!");
          resolve(null);
          return;
        }

        const index = store.index("usernameIdx");
        const req = index.get(username);

        req.onsuccess = () => {
          const user = req.result;

          if (user && user.passwordHash === hashedPassword) {
            resolve(user);
          } else {
            reject(null);
          }
        };
        req.onerror = () => resolve(null);
      });
    } catch (error) {
      console.error("Error initializing DB:", error);
      return null;
    }
  }
}
