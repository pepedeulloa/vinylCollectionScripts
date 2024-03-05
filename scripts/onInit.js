import { getCollection, getRelease } from './discogs.js';

import { Record } from '../models/record.model.js';
import { Song } from '../models/song.model.js';
import { Opinion } from '../models/opinion.model.js';

const getData = async (callback) => {
	let i = 0;

	let albums = await getCollection();
	let data = [];
	const interval = setInterval(async () => {
		const progress = (i / albums.length) * 100;
		let a = albums[i];
		console.log(`${progress.toFixed(2)}%`);
		let info = await getRelease(a.id);
		data.push(info);
		if (i == albums.length - 1) {
			clearInterval(interval);
			callback(data, null);
		}
		i++;
	}, 2500);
};

const deleteAllData = async () => {
	await Record.deleteAll();
	await Opinion.deleteAll();
	await Song.deleteAll();
};

export const initialUpdate = async () => {
	await deleteAllData();
	await getData((data, error) => {
		if (error) {
			console.log('error:', error);
			return;
		} else if (data) {
			data.forEach(async (album) => {
				let { basic_info, songs } = album;
				await Record.create(basic_info);
				songs.forEach(async (song) => {
					try {
						await Song.create(song);
					} catch (error) {
						console.error('Error al realizar la operación:', error);
					}
				});
			});
		}
	});
};
