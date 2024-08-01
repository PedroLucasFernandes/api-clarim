const postService = require('../services/postService.js');
const fs = require("fs");

const postController = {
    async createPost(req, res) {
        const { title, description, content, type, sport, created_by, updated_by } = req.body;
        const files = req.files;
        let tags = req.body.tags;
    
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'Imagem para capa do post é obrigatória' });
        }

        if (typeof tags === 'string') {
            try {
                tags = JSON.parse(tags);
            } catch (error) {
                return res.status(400).json({ error: 'Formato de tags inválido' });
            }
        }

        if (!Array.isArray(tags)) {
            return res.status(400).json({ error: 'Tags devem ser uma lista' });
        }

        const filenames = files.map(file => file.filename);
        const banner = filenames[0];
        const additionalImages = filenames.slice(1);

        try {
            const newPost = await postService.createPost(title, banner, description, content, type, sport, parseInt(created_by), parseInt(updated_by), tags, additionalImages);
            res.status(201).json(newPost);
        } catch (error) {
            console.error(`${error.message}`);
            
            for (const image of filenames) {
                if (fs.existsSync(`src/public/uploads/${image}`)) {
                    try {
                        fs.unlinkSync(`src/public/uploads/${image}`);
                        console.log(`Arquivo ${image} deletado com sucesso.`);
                    } catch (err) {
                        console.error('Erro ao excluir o arquivo:', err);
                    }
                }
            }
            res.status(500).json({ error: 'Erro ao tentar adicionar novo post e suas respectivas imagens' });
        }
    },

    async getPost(req, res) {
        try {
            const posts = await postService.getPost();
            res.status(200).json(posts);
        } catch (error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar buscar posts' });
        }
    },

    async getPostById(req, res) {
        const { id } = req.params;
        const id_number = parseInt(id);

        try {
            const post = await postService.getPostById(id_number);
            res.status(200).json(post);
        } catch (error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar buscar post' });
        }
    },

    async updatePost(req, res) {
        const id = req.params.id;
        const { title, description, content, type, sport, updated_by } = req.body;
        const file = req.files;
    
        const id_number = parseInt(id);
        const updated_by_number = parseInt(updated_by);

        try {
            const oldPost = await postService.getPostById(id_number);
            const banner = file?.[0]?.filename || oldPost.image_path;
            
            const updatedPost = await postService.updatePost(id_number, title, description, content, type, sport, updated_by_number);

            if (updatedPost.image_path !== oldPost.image_path && fs.existsSync(`src/public/uploads/${oldPost.image_path}`)) {
                try {
                    fs.unlinkSync(`src/public/uploads/${oldPost.image_path}`);
                } catch (err) {
                    console.error('erro ao excluir o arquivo:', err);
                }
            } 
            
            res.status(200).json(updatedPost);
        } catch (error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar atualizar post' });
        }

    },

    async deletePost(req, res) {
        const { id } = req.params;
        const id_number = parseInt(id);
    
        try {
            const images = await postService.getImageByPostId(id_number);
    
            for (const image of images) {
                if (fs.existsSync(`src/public/uploads/${image.image_path}`)) {
                    try {
                        fs.unlinkSync(`src/public/uploads/${image.image_path}`);
                        console.log(`Arquivo ${image.image_path} deletado com sucesso.`);
                    } catch (err) {
                        console.error('Erro ao excluir o arquivo:', err);
                    }
                }
            }
    
            const deletedPost = await postService.deletePost(id_number);
    
            res.status(200).json(deletedPost);
        } catch (error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'Erro ao tentar excluir post' });
        }
    }
};

module.exports = postController;