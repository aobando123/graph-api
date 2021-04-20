import Vertex from "./Vertex";

interface HashValues<T> {
  [index: number]: { [index: string]: T };
}

export default class HashTable<T> {
  private values: HashValues<T>;
  private size: number;
  private length: number;
  constructor(size: number) {
    this.values = {};
    this.length = 0;
    this.size = size;
  }

  private calculateHash(key: string) {
    return key.toString().length % this.size;
  }

  put(key: string, value: T) {
    const hash = this.calculateHash(key);
    if (!this.values.hasOwnProperty(hash)) {
      this.values[hash] = {};
    }
    if (!this.values[hash].hasOwnProperty(key)) {
      this.length++;
    }
    this.values[hash][key] = value;
  }

  get(key: string): T | null {
    const hash = this.calculateHash(key);
    if (
      this.values.hasOwnProperty(hash) &&
      this.values[hash].hasOwnProperty(key)
    ) {
      return this.values[hash][key];
    } else {
      return null;
    }
  }

  getEntries() {
    let entries: T[] = [];
    Object.keys(this.values).map((hash) => {
      const nHash = Number(hash);
      Object.keys(this.values[nHash]).map((key) => {
        entries.push(this.values[nHash][key]);
      });
    });

    return entries;
  }

  getLength() {
    return this.length;
  }
}
