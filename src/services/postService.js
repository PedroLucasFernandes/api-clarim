const postModel = require('../models/postModel.js');

const postService = {
    async createPost(title, banner, description, content, type, sport, created_by, updated_by, tags, additionalImages) {
        try {
            const { post, images, tags: addedTags } = await postModel.createPost(title, banner, description, content, type, sport, created_by, updated_by, tags, additionalImages);
            
            return { post, images, tags: addedTags };
        } catch (error) {
            console.error('Error in postService.createPost:', error);
            throw error;
        }
    },

    async getPost() {
        try {
            const posts = await postModel.getPost();
            return posts;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getPostById(id) {
        try {
            const post = await postModel.getPostById(id);
            if(!post) {
                throw new Error(`service: nenhum post encontrado com o id ${id}`);
            }
            return post;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getImageByPostId(id) {
        try {
            const image = await postModel.getImageByPostId(id);
            if(!image) {
                throw new Error(`service: nenhuma imagem  com o id ${id}`);
            }
            return image;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async updatePost(id, title, description, content, type, sport, updated_by) {
        try {
            const existingPost = await postModel.getPostById(id);
            if(!existingPost) {
                throw new Error(`service: nenhum post encontradao com o id ${id}`);
            }

            const updatedPost = await postModel.updatePost(id, title, description, content, type, sport, updated_by);
            return updatedPost;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async deletePost(id) {
        try {
            const existingPost = await postModel.getPostById(id);
            if(!existingPost) {
                throw new Error(`service: nenhum post encontrado com o id ${id}`);
            }

            const deletedPost = await postModel.deletePost(id);
            return deletedPost;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    }
};

module.exports = postService;