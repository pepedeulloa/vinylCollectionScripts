import { db } from './index.js';

export class Opinion {
	constructor(text, recordID) {
		this.text = text;
		this.recordID = recordID;
	}

	static all() {
		return db.execute('SELECT * FROM opinion;');
	}

	static async findById(id) {
		try {
			let query = await db.execute({
				sql: 'SELECT * FROM opinion WHERE record_id = :id',
				args: { id }
			});
			let query_flat = query.flat();
			let opinion = query_flat[0];
			return opinion.id;
		} catch (error) {
			console.log(error);
		}
	}

	static create(opinion) {
		return db.execute({ sql: 'INSERT INTO opinion SET :opinion', args: { opinion } });
	}

	static async update(record_id, opinion) {
		return await db.execute({
			sql: 'UPDATE opinion SET text = :opinion WHERE record_id = :record_id',
			args: {
				opinion,
				record_id
			}
		});
	}

	static delete(id) {
		return db.execute({ sql: 'DELETE FROM opinion WHERE id = ?', args: { id } });
	}
	static deleteAll() {
		return db.execute('DELETE FROM opinion;');
	}
}
