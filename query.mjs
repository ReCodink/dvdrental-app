// Membuat query select 

export const getAllFilmsQuery = 'SELECT * FROM film';
export const getFilmByIdQuery = 'SELECT * FROM film WHERE film_id = $1';
export const getAllCategoriesQuery = 'SELECT * FROM category';
export const getFilmsByCategoryQuery = `
    SELECT c.name AS category_name, f.title AS film_title, fc.last_update
    FROM film_category AS fc
    JOIN film AS f ON fc.film_id = f.film_id
    JOIN category AS c ON fc.category_id = c.category_id;
`;