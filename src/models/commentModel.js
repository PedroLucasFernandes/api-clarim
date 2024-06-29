const pool = require('../config/database.js');

const commentModel = {
    async createComment(post_id, text, created_by) {
        const query = `
            INSERT INTO comment (post_id, text, created_by) 
            VALUES ($1, $2, $3) RETURNING *
        `;
        const values = [post_id, text, created_by];
    
        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    },
    
    async getCommentsByPostId(post_id) {
        const query = `
            SELECT * FROM comment WHERE post_id = $1
        `;
        const values = [post_id];
    
        try {
            const { rows } = await pool.query(query, values);
            return rows;
        } catch (error) {
            console.error('Error fetching comments by post_id:', error);
            throw error;
        }
    },
    
    async deleteComment(id) {
        const query = `
            DELETE FROM comment WHERE id = $1 RETURNING *
        `;
        const values = [id];
    
        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }
}

module.exports = commentModel;