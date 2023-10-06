// Routes untuk Films
import express from 'express';
import { getAllFilmsQuery, getFilmByIdQuery } from '../query.mjs';

const router = express.Router();

// Routes untuk menampilkan data seluruh list film
router.get('/films', async (req, res) => {
    const pool = req.db;
    try {
        // Menggunakan query untuk seluruh list daftar film
        const { rows } = await pool.query(getAllFilmsQuery);
        res.json(rows);
        // Pesan Berhasil
        console.info('Successfully fetched all films');
    } catch (error) {
        console.error('Error fetching all films: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Routes untuk menampilkan data film tertentu berdasarkan ID
router.get('/films/:id', async (req, res) => {
    const pool = req.db;
    const filmId = req.params.id; // Gunakan req.params untuk mendapatkan nilai ID
    try {
        // Menggunakan query untuk mendapatkan film berdasarkan ID
        const { rows } = await pool.query(getFilmByIdQuery, [filmId]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Film not found' });
        } else {
            res.json(rows[0]);
            // Pesan Berhasil
            console.info(`Successfully fetched film with ID ${filmId}.`);
        }
    } catch (error) {
        console.error('Error fetching film by ID: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
