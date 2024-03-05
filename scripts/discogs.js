import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

/**
	* 
	* @returns an array of objects with the id and title of all the albums in the collection.
	* 
	* This function returns an array of objects with the id and title
	* of all the albums in the collection.
	* 
	*/
export async function getCollection() {
	const url =
		`${process.env.COLLECTION_URL}/folders/0/releases`;
	const response = await fetch(url);
	const data = await response.json();
	let albums = data.releases.map((e) => {
		let { id, title } = e.basic_information;
		console.log(id, title);
		return { id, title };
	});

	return albums;
}

/**
	* 
	* @returns count of albums in the collection.
	* 
	*/
export async function getCount() {
	const url = `${process.env.COLLECTION_URL}/folders/0`;
	const response = await fetch(url);
	const data = await response.json();

	return data.count;
}

/**
	* 
	* @param {id} release id of the realease to get
	* @returns an object with the data of the album
	* 
	* 
	*/
export async function getRelease(release) {
	const url = `https://api.discogs.com/releases/${release}`;
	const response = await fetch(url);
	const data = await response.json();

	const basic_info = {
		id: data.id,
		year: data.year,
		artist: data.artists_sort,
		title: data.title,
		discogs_url: data.uri,
	};

	if (basic_info.artist === 'Gojira (2)') basic_info.artist = 'Gojira';

	let songs = data.tracklist;
	songs = songs.map((song) => {
		let { position, title, duration } = song;
		let newSong = { pos: position, title, duration, record_id: basic_info.id, id: basic_info.id + position };
		return newSong;
	}).filter((s) => s.pos !== '');


	return { basic_info, songs };
}
