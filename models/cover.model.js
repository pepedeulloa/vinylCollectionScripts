import { db } from './index.js';

export class Cover {
	constructor(id, url, recordID) {
		this.url = url;
		this.recordID = recordID;
	}

	static all() {
		return db.execute('SELECT * FROM cover');
	}

	static async findById(id) {
		try {
			return await db.execute({
				sql: 'SELECT * FROM cover WHERE record_id = :id',
				args: { id },
			});
		} catch (error) {
			console.log(error);
		}
	}

	static async getAllUrls() {
		try {
			return await db.execute('SELECT * FROM url_views;');
		} catch (error) {
			console.log(error);
		}
	}

	static create(cover) {
		return db.execute({ sql: 'INSERT INTO cover SET :cover', args: { cover } });
	}

	static update(id, urls) {
		const [cover1, cover2, cover3, cover4, cover5, cover6, cover7, cover8] = urls;
		return db.execute({
			sql: `UPDATE cover 
		SET 
						cover1 = :cover1,
						cover2 = :cover2,
						cover3 = :cover3,
						cover4 = :cover4,
						cover5 = :cover5,
						cover6 = :cover6,
						cover7 = :cover7,
						cover8 = :cover8
		WHERE record_id = :id;`, args: {
				cover1,
				cover2,
				cover3,
				cover4,
				cover5,
				cover6,
				cover7,
				cover8,
				id
			}
		});
	}

	static delete(id) {
		return db.execute({ sql: 'DELETE FROM cover WHERE id = :id', args: { id } });
	}
	static deleteAll() {
		return db.execute('DELETE FROM cover');
	}
}
