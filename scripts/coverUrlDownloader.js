import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

import { Cover } from '../models/cover.model.js';

const loadNscrap = async (url) => {

	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	await page.goto(url);
	await page.waitForSelector('body');

	await page.click('.link_33If6');

	await page.waitForSelector('.overlay_S5G6s');
	await page.waitForSelector('.thumbnails_20oKg');

	const pageData = await page.evaluate(() => {
		const ul = document.querySelector('.thumbnails_20oKg');
		const li = ul.querySelectorAll('li');

		const srcs = [];

		li.forEach((li) => {
			const img = li.querySelector('img');

			srcs.push(img.src);

		});

		return srcs;

	});

	console.log(pageData);

	await browser.close();

	return pageData;
};

const updateCover = async (record_id, urls) => {
	while (urls.length < 8) {
		urls.push(null);
	}

	urls = urls.slice(0, 8);

	console.log(urls.length, urls);

	return await Cover.update(record_id, urls);
};

const updateAllRecordCovers = async () => {
	const { rows } = await Cover.getAllUrls();

	for (const record of rows) {
		try {
			console.log(record);
			const urls = await loadNscrap(record.discogs_url);
			const result = await updateCover(record.id, urls);
			console.log('Resultado: ', result.rowsAffected);
		} catch (error) {
			console.error('Error en la iteración:', error);
		}
	}
};

const updateOneRecordCovers = async (record_id, discogs_url) => {
	const urls = await loadNscrap(discogs_url);
	const result = await updateCover(record_id, urls);
	console.log('Resultado: ', result.rowsAffected);
};
