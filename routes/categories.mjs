// Routes untuk Categories
import express from 'express';
import { getAllCategoriesQuery, getFilmsByCategoryQuery } from '../query.mjs';

const router = express.Router();

// Middleware untuk mendapatkan koneksi database dari pool
const connectDatabase = (pool) => (req, res, next) => {
    req.db = pool;
    next();
};

// Menampilkan seluruh kategori
router.get('/categories', connectDatabase, async (req, res) => {
    const pool = req.db;
    try {
        // Menggunakan query untuk seluruh kategori
        const { rows } = await pool.query(getAllCategoriesQuery);
        res.json(rows);
        // Pesan Berhasil
        console.info('Successfully fetched all categories');
    } catch (error) {
        console.error('Error fetching all categories: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Menampilkan list film berdasarkan kategori
router.get('/categories/:categoryId/films', connectDatabase, async (req, res) => {
    const pool = req.db;
    const categoryId = req.params.categoryId;
    try {
        // Menggunakan query untuk list film berdasarkan kategori
        const { rows } = await pool.query(getFilmsByCategoryQuery, [categoryId]);
        res.json(rows);

        // Pesan Berhasil
        console.info(`Successfully fetched films by category with ID ${categoryId}`);
    } catch (error) {
        console.error('Error fetching films by category: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
