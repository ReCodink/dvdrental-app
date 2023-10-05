import pkg from 'pg';
import { readFile } from 'fs/promises'; // Import modul fs untuk membaca file JSON
const { Pool } = pkg;

async function readConfig() {
    try {
        const jsonConfig = await readFile('database.json', 'utf8');
        return JSON.parse(jsonConfig);
    } catch (error) {
        console.error('Error reading database.json: ', error.message);
        throw new Error('Failed to read database.json: ' + error.message);
    }
}

// Fungsi untuk melakukan seeding data
async function seedActorData() {
    try {
        const databaseConfig = await readConfig(); // Baca konfigurasi dari file JSON
        const pool = new Pool(databaseConfig);

        const actorData = [
            { actor_id: 201, first_name: 'Daniel', last_name: 'Radcliffe', last_update: '2023-10-05 20:02:32.62' },
            { actor_id: 202, first_name: 'Tom', last_name: 'Holland', last_update: '2023-10-05 20:02:33.62' },
            { actor_id: 203, first_name: 'Tobey', last_name: 'Maguire', last_update: '2023-10-05 20:02:34.62' },
            { actor_id: 204, first_name: 'Benedict', last_name: 'Cumberbatch', last_update: '2023-10-05 20:02:35.62' },
            { actor_id: 205, first_name: 'Benedict', last_name: 'Wong', last_update: '2023-10-05 20:02:36.62' },
        ];

        for (const actor of actorData) {
            await pool.query('INSERT INTO actor (actor_id, first_name, last_name, last_update) VALUES ($1, $2, $3, $4)', [actor.actor_id, actor.first_name, actor.last_name, actor.last_update]);
        }
        console.info('Seeding data into actor table complete.');
    } catch (error) {
        console.error('Error seeding data: ', error);
    }
}

// Jalankan fungsi seeding
seedActorData();
