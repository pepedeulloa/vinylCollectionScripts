USE records-db;

DROP TABLE IF EXISTS records-db.opinion, records-db.record, records-db.song, records-db.tracklist;
CREATE TABLE record(
	id int unique,
    year int not null,
    artist varchar(100) not null,
    title varchar(100) not null,
    discogs_url text  not null,
    tracklist_id INT,
    opinion_id INT,
    covers_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE tracklist(
	id int unique auto_increment,
    record_id int not null,
    primary key (id)
);

CREATE TABLE song(
	id int unique auto_increment,
    pos text,
    title text,
    duration text,
	tracklist_id INT NOT NULL,
    record_id int not null,
    primary key (id)
);

CREATE TABLE opinion(
	id int unique auto_increment,
    record_id int not null,
    text TEXT,
    primary key (id)
);

CREATE TABLE cover(
	id int unique auto_increment,
    record_id int not null,
    cover varchar(255),
    primary key (id)
);

ALTER TABLE record 
ADD CONSTRAINT fk_record_tracklist 
FOREIGN KEY (tracklist_id) references tracklist(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE record 
ADD CONSTRAINT fk_record_opinion 
FOREIGN KEY (opinion_id) references opinion(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE record 
ADD CONSTRAINT fk_record_cover
FOREIGN KEY (covers_id) references cover(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE tracklist 
ADD CONSTRAINT fk_tracklist_record 
FOREIGN KEY (record_id) references record(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE opinion 
ADD CONSTRAINT fk_opinion_record 
FOREIGN KEY (record_id) references record(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE song 
ADD CONSTRAINT fk_song_record 
FOREIGN KEY (record_id) references record(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE song 
ADD CONSTRAINT fk_song_tracklist 
FOREIGN KEY (tracklist_id) references tracklist(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE cover
ADD CONSTRAINT fk_cover_record
FOREIGN KEY (record_id) references record(id)
ON DELETE CASCADE ON UPDATE CASCADE;