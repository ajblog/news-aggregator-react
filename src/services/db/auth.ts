import { User } from "../../types";

// auth.ts
export class AuthService {
  private static async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  public static async registerUser(
    username: string,
    password: string
  ): Promise<User | null> {
    const hashedPassword = await this.hashPassword(password);

    return new Promise((resolve) => {
      const request = indexedDB.open("newsApp", 1);

      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(["users"], "readwrite");
        const store = tx.objectStore("users");

        const user = {
          id: crypto.randomUUID(),
          username,
          passwordHash: hashedPassword,
        };

        const req = store.add(user);
        req.onsuccess = () => resolve(user);
        req.onerror = () => resolve(null);
      };
    });
  }

  public static async loginUser(
    username: string,
    password: string
  ): Promise<User | null> {
    const hashedPassword = await this.hashPassword(password);

    return new Promise((resolve) => {
      const request = indexedDB.open("newsApp", 1);

      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(["users"], "readonly");
        const store = tx.objectStore("users");
        const index = store.index("usernameIdx");

        const req = index.get(username);
        req.onsuccess = () => {
          const user = req.result;
          if (user && user.passwordHash === hashedPassword) {
            resolve(user);
          } else {
            resolve(null);
          }
        };
      };
    });
  }
}
