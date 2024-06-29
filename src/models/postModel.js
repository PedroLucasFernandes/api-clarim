const pool = require('../config/database.js');

const postModel = {
    async createPost(title, image_path, description, content, type, sport, created_by, updated_by, tags, additionalImages) {
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
    
            const imageQueries = [
                {
                    text: 'INSERT INTO image (post_id, image_path, is_banner) VALUES ($1, $2, $3) RETURNING *',
                    values: [post.id, image_path, true]
                },
                ...additionalImages.map(img => ({
                    text: 'INSERT INTO image (post_id, image_path, is_banner) VALUES ($1, $2, $3) RETURNING *',
                    values: [post.id, img, false]
                }))
            ];
    
            const imageResults = await Promise.all(imageQueries.map(q => client.query(q)));
            const images = imageResults.map(result => result.rows[0]);
    
            const tagIds = await Promise.all(tags.map(async (tag) => {
                const tagQuery = 'SELECT id FROM tag WHERE name = $1';
                const tagResult = await client.query(tagQuery, [tag]);
                if (tagResult.rows.length > 0) {
                    return tagResult.rows[0].id;
                } else {
                    const insertTagQuery = 'INSERT INTO tag (name) VALUES ($1) RETURNING id';
                    const insertTagResult = await client.query(insertTagQuery, [tag]);
                    return insertTagResult.rows[0].id;
                }
            }));
    
            const postTagQueries = tagIds.map(tagId => ({
                text: 'INSERT INTO post_tag (post_id, tag_id) VALUES ($1, $2) RETURNING *',
                values: [post.id, tagId]
            }));
    
            const postTagResults = await Promise.all(postTagQueries.map(q => client.query(q)));
            const insertedPostTags = postTagResults.map(result => result.rows[0]);
    
            await client.query('COMMIT');
    
            return { post, images, tags: insertedPostTags };
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error creating post:', error);
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