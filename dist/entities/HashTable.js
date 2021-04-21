"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HashTable {
    constructor(size) {
        this.values = {};
        this.length = 0;
        this.size = size;
    }
    calculateHash(key) {
        return key.toString().length % this.size;
    }
    put(key, value) {
        const hash = this.calculateHash(key);
        if (!this.values.hasOwnProperty(hash)) {
            this.values[hash] = {};
        }
        if (!this.values[hash].hasOwnProperty(key)) {
            this.length++;
        }
        this.values[hash][key] = value;
    }
    get(key) {
        const hash = this.calculateHash(key);
        if (this.values.hasOwnProperty(hash) &&
            this.values[hash].hasOwnProperty(key)) {
            return this.values[hash][key];
        }
        else {
            return null;
        }
    }
    getEntries() {
        let entries = [];
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
exports.default = HashTable;
