const pool = require('../config/database.js');

const postModel = {
    async createPost(title, banner, description, content, type, sport, created_by, updated_by, additionalImages) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
    
            const postQuery = `
                INSERT INTO post (title, description, content, type, sport, created_by, updated_by) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
            `;
            const postValues = [title, description, content, type, sport, created_by, updated_by];
            const postResult = await client.query(postQuery, postValues);
            const post = postResult.rows[0];

            const images = [];

            const bannerQuery = `
                INSERT INTO image (post_id, image_path, is_banner) 
                VALUES ($1, $2, $3) RETURNING *
            `;
            const bannerValues = [post.id, banner, true];
            const bannerResult = await client.query(bannerQuery, bannerValues);
            images.push(bannerResult.rows[0]);

            for (const image_path of additionalImages) {
                const imageQuery = `
                    INSERT INTO image (post_id, image_path, is_banner) 
                    VALUES ($1, $2, $3) RETURNING *
                `;
                const imageValues = [post.id, image_path, false];
                const imageResult = await client.query(imageQuery, imageValues);
                images.push(imageResult.rows[0]);
            }

            await client.query('COMMIT');

            return { post, images };
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(`${error.message}`);
            throw error;
        } finally {
            client.release();
        }
    },

    async getPost() {
        const query = `SELECT * FROM post`;

        try {
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getPostById(id) {
        const query = `SELECT * FROM post WHERE id = $1`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                return false;
            }
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getImageByPostId(id) {
        const query = `SELECT * FROM image WHERE post_id = $1`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                return false;
            }
            return rows;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getPostByTitle(title) {
        const query = `SELECT * FROM post WHERE title = $1`;
        const values = [title];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                return false;
            }
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async updatePost(id, title, image_path, description, content, type, sport, updated_by) {
        const query = `UPDATE post SET title = $1, description = $2, content = $3, type = $4, sport = $5 updated_at = CURRENT_TIMESTAMP, updated_by = $6 WHERE id = $7 RETURNING *`;
        const values = [title, description, content, type, sport, updated_by, id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                throw new Error(`nenhum post encontrado com o id ${id}`);
            }
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async deletePost(id) {
        const query = `DELETE FROM post WHERE id = $1 RETURNING *`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                throw new Error(`nenhum post encontrado com o id ${id}`);
            }
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    }
}

module.exports = postModel;