import dotenv from 'dotenv';
import { createClient } from '@libsql/client';

import process from 'process';

dotenv.config();

const db = createClient({
	url: process.env.DB_URL,
	authToken: process.env.DB_TOKEN,
});

/* const createTriggers = async () => {
	await db.execute(`
	CREATE TRIGGER insert_record_trigger AFTER INSERT ON record
		FOR EACH ROW
			BEGIN
				INSERT INTO opinion (record_id) VALUES (NEW.id);
				INSERT INTO cover (record_id) VALUES (NEW.id);
	END;
	`);
}; */

const createTables = async () => {

	await db.execute(`
	PRAGMA foreign_keys=off;
	`);

	await db.execute(`
	DROP TABLE IF EXISTS record;
	`);

	await db.execute(`
	DROP TABLE IF EXISTS opinion;
	`);

	await db.execute(`
	DROP TABLE IF EXISTS tracklist;
	`);

	await db.execute(`
	DROP TABLE IF EXISTS song;
	`);

	await db.execute(`
	DROP TABLE IF EXISTS cover;
	`);

	await db.execute(`
	PRAGMA foreign_keys=on;
	`);

	await db.execute(`
	CREATE TABLE record(
		id int unique,
					year int not null,
					artist varchar(100) not null,
					title varchar(100) not null,
					discogs_url text  not null,
					PRIMARY KEY (id)
	);
	`);

	await db.execute(`
			CREATE TABLE song(
				id text unique,
							pos text,
							title text,
							duration text,
				record_id INT NOT NULL,
							primary key (id),
							FOREIGN KEY (record_id) references record(id) ON DELETE CASCADE ON UPDATE CASCADE
			);`
	);

	await db.execute(`
			CREATE TABLE opinion (                                                              
				record_id INT NOT NULL,                                                               
				text TEXT,                                                                            
				PRIMARY KEY (record_id),                                                              
				FOREIGN KEY (record_id) REFERENCES record(id) ON DELETE CASCADE ON UPDATE CASCADE     
				);
	`);

	await db.execute(`
			CREATE TABLE cover (                                                                
				record_id INT NOT NULL,                                                               
				cover VARCHAR(255),                                                                   
				PRIMARY KEY (record_id),                                                              
				FOREIGN KEY (record_id) REFERENCES record(id) ON DELETE CASCADE ON UPDATE CASCADE     
				);
			`
	);
};

createTables();