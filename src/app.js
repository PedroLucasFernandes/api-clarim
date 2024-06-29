const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const postRoutes = require('./routes/postRoutes.js');

const app = express();

const cors = require('cors');

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [`http://localhost:${process.env.PORT}`];
        if (!origin || allowedOrigins.indexOf(origin) >= 0) {
            callback(null, true);
        } else {
            callback(new Error('Acesso bloqueado por política CORS'));
        }
    }
}));

app.use(express.json());

app.use('/api/post', postRoutes);


app.use(express.static('src/public'));

function sendIndexFile(req, res) {
    res.sendFile(__dirname + '/public/view/index.html')
}

app.get('/', sendIndexFile);

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});