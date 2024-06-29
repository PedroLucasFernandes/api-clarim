const commentService = require('../services/commentService.js');

const commentController = {
    async createComment(req, res) {
        const { post_id, text, created_by } = req.body;
    
        try {
            const newComment = await commentService.createComment(post_id, text, created_by);
            res.status(201).json(newComment);
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ error: 'Error creating comment' });
        }
    },
    
    async getCommentsByPostId(req, res) {
        const { post_id } = req.params;
    
        try {
            const comments = await commentService.getCommentsByPostId(post_id);
            res.status(200).json(comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ error: 'Error fetching comments' });
        }
    },
    
    async deleteComment(req, res) {
        const { id } = req.params;
    
        try {
            const deletedComment = await commentService.deleteComment(id);
            res.status(200).json(deletedComment);
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ error: 'Error deleting comment' });
        }
    }
};

module.exports = commentController;