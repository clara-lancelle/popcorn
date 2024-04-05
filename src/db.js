// db.js
import Dexie from 'dexie';

export const db = new Dexie('popcorn');
db.version(1).stores({
    comments: '++id, movieId, content, creation_date' // Primary key and indexed props
});