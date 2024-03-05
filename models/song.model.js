import { db } from './index.js';

export class Song {
	constructor(id, pos, duration, title, record_id) {
		this.id = id;
		this.pos = pos;
		this.duration = duration;
		this.title = title;
		this.record_id = record_id;
	}

	static all() {
		return db.execute('SELECT * FROM song');
	}

	static findById(id) {
		return db.execute({ sql: 'SELECT * FROM song WHERE record_id = :id', args: { id } });
	}

	static create({ id, pos, title, duration, record_id }) {
		console.log(id, pos, title, duration, record_id);
		return db.execute({ sql: 'INSERT INTO song (id, pos, title, duration, record_id) VALUES (:id, :pos, :title, :duration, :record_id);', args: { id, pos, title, duration, record_id } });
	}

	static delete(id) {
		return db.execute({ sql: 'DELETE FROM song WHERE id = :id', args: { id } });
	}

	static deleteAll() {
		return db.execute('DELETE FROM song;');
	}
}
