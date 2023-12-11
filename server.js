
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.post('/upload', upload.array('files'), (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    files.forEach(file => {
        categorizeFile(file);
    });

    res.send('Files uploaded and categorized successfully.');
});

function categorizeFile(file) {
    const filePath = path.join(__dirname, 'uploads', file.originalname);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const category = determineCategory(data);
        const categoryPath = path.join(__dirname, 'categories', category);
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath, { recursive: true });
        }

        const newFilePath = path.join(categoryPath, file.originalname);
        fs.renameSync(filePath, newFilePath);
    });
}

function determineCategory(fileContent) {
    const categories = {
        'mammals': ['lion', 'tiger', 'bear'],
        'birds': ['eagle', 'sparrow', 'parrot'],
        'fish': ['salmon', 'trout', 'goldfish']
    };

    for (const [category, keywords] of Object.entries(categories)) {
        for (const keyword of keywords) {
            if (fileContent.includes(keyword)) {
                return category;
            }
        }
    }

    return 'other';
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
