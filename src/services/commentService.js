const commentModel = require('../models/commentModel.js');

const commentService = {
    async createComment(post_id, text, created_by) {
        try {
            const newComment = await commentModel.createComment(post_id, text, created_by);
            return newComment;
        } catch (error) {
            console.error('Error in commentService.createComment:', error);
            throw error;
        }
    },
    
    async getCommentsByPostId(post_id) {
        try {
            const comments = await commentModel.getCommentsByPostId(post_id);
            return comments;
        } catch (error) {
            console.error('Error in commentService.getCommentsByPostId:', error);
            throw error;
        }
    },
    
    async deleteComment(id) {
        try {
            const deletedComment = await commentModel.deleteComment(id);
            return deletedComment;
        } catch (error) {
            console.error('Error in commentService.deleteComment:', error);
            throw error;
        }
    }
};

module.exports = commentService;