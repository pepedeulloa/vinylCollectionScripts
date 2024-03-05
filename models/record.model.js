import { db } from './index.js';

export class Record {
	constructor(id, year, artist, title, discogsUrl) {
		this.id = id;
		this.year = year;
		this.artist = artist;
		this.title = title;
		this.discogsUrl = discogsUrl;
	}

	static async findAll() {
		return await db.execute('SELECT * FROM record');
	}

	static async findAllWithCovers() {
		return await db.execute('SELECT * FROM record_cover_view ORDER BY RANDOM();');
	}

	static async findById(id) {
		return await db.execute({ sql: 'SELECT * FROM record WHERE id = :id', args: { id } });
	}

	static async count() {
		return await db.execute({
			sql: 'SELECT COUNT(*) FROM record',
			args: {},
		});
	}

	static async create({ id, year, artist, title, discogs_url }) {
		return await db.execute({ sql: 'INSERT INTO record (id, year, artist, title, discogs_url) VALUES (:id, :year, :artist, :title, :discogs_url)', args: { id, year, artist, title, discogs_url } });
	}

	static update(record) {
		const record_id = record.id;
		return db.execute({ sql: 'UPDATE record SET record_id WHERE id = :record_id', args: { record_id } });
	}

	static delete(id) {
		return db.execute({ sql: 'DELETE FROM record WHERE id = :id', args: { id } });
	}

	static deleteAll() {
		return db.execute('DELETE FROM record;');
	}
}
