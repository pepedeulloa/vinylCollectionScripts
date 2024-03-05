# My Record Collection Scripts

This repository contains scripts used to extract data from Discogs, including album art URLs and album details, which are then stored in the database used by the Vinyl Collection API and Record Collection App.

## Overview

The scripts in this repository are written in Node.js and use libraries such as Cheerio and Puppeteer for web scraping. They are designed to retrieve record data from the [discogs API](https://www.discogs.com/developers) and scrape image urls from the Discogs website.

The data obtained is then processed and stored in the database hosted by [Turso](https://turso.tech/), which provides the backend for the Vinyl Collection API. The API in turn powers the Record Collection app, which allows users to access and browse the curated collection of vinyl records.

## Technologies used

- Node.js
- Cheerio
- Puppeteer


Feel free to contact us if you have any questions or suggestions!