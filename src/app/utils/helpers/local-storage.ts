export class LocalStorage {
  static get<T>(key: string): T | null {
    const data: string = localStorage.getItem(key);
    let result = null;
    try {
      result = JSON.parse(data);
    } catch (e) {
      result = data;
    }
    return result;
  }

  static set<T>(data: T, key: string): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static delete(key: string): void {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
