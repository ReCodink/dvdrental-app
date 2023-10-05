import express from 'express';
import pkg from 'pg';
import { readFile } from 'fs/promises';
import filmsRouter from './routes/films.mjs';
import categoriesRouter from './routes/categories.mjs';

const { Pool } = pkg;
const app = express();
const port = 3000;

// Middleware untuk mendapatkan koneksi database dari pool
const connectDatabase = (pool) => (req, res, next) => {
    req.db = pool;
    next();
};

debugger;

// Fungsi untuk membaca file konfigurasi JSON
const readConfig = async () => {
    try {
        const jsonConfig = await readFile('database.json', 'utf8');
        return JSON.parse(jsonConfig);
    } catch (error) {
        console.error('Error reading database.json: ', error.message);
        throw new Error('Failed to read database.json: ' + error.message);
    }
};

// Fungsi untuk memulai server
const startServer = async () => {
    try {
        const databaseConfig = await readConfig(); // Membaca konfigurasi dari file JSON
        const pool = new Pool(databaseConfig);

        // Menggunakan middleware sebagai penghubung database ke seluruh route
        app.use(connectDatabase(pool));

        // Menggunakan rute filmsRouter untuk rute terkait film
        app.use('/api', filmsRouter);

        // Menggunakan rute categoriesRouter untuk rute terkait kategori
        app.use('/api', categoriesRouter);

        // Menjalankan server pada port yang telah ditentukan
        app.listen(port, () => {
            console.info(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting server: ', error);
    }
};

// Panggil fungsi startServer untuk memulai server
startServer();
