// Routes untuk Categories
import express from 'express';
import { getAllCategoriesQuery, getFilmsByCategoryQuery } from '../query.mjs';

const router = express.Router();

// Routes untuk menampilkan data seluruh list kategori
router.get('/categories', async (req, res) => {
    const pool = req.db;
    try {
        // Menggunakan query untuk menampilkan seluruh list daftar kategori
        const { rows } = await pool.query(getAllCategoriesQuery);
        res.json(rows);
        // Pesan Berhasil
        console.info('Successfully fetched all category'); 
    } catch (error) {
        console.error('Error fetching all films: ', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});


export default router;
