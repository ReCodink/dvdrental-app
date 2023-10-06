import express from 'express';
import { getFilmsByCategoryQuery } from '../query.mjs';

const router = express.Router();

// Routes untuk menampilkan data film berdasarkan category
router.get('/films_category', async (req, res) => {
    const pool = req.db;
    try {
        // Menggunakan query untuk film berdasarkan category
        const { rows } = await pool.query(getFilmsByCategoryQuery);
        res.json(rows);
        // Pesan Berhasil 
        console.info('Successfully fetched all films with category');
    } catch (error) {
        console.error('Error fetching all films with category: ', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

export default router;