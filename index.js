const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

if(!fs.existsSync("images")){
    fs.mkdirSync("images");
}

app.get('/image/:name', (req, res) => {
    const imageName = req.params.name;
    const imagePath = path.join(__dirname, 'images', imageName);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('Image not found');
        }

        res.sendFile(imagePath);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
