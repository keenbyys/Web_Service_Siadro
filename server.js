const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const lecturerData = {
    lecturer: {
        fullName: "Oksana Yuriivna Lebid",
        position: "Associate Professor, Department of Higher Mathematics and Informatics",
        fieldOfInterest: "“Optimization methods and algorithms, theoretical issues of computer science and cybernetics, cognitive modeling, cognitive psychology.”",
        email: "Lebyed_oksana@ua.fm, lebid@umsf.dp.ua",
        phone: "+380000000000"
    },
    subjects: [
        "“Higher and Applied Mathematics,”",
        "“Fundamentals of Higher Mathematics and Modern Information Systems,”",
        "“Object-Oriented Programming,”",
        "“Software Development Technology.”"
    ],
    experience: []  // Якщо є досвід, додайте сюди; наразі порожній масив
};
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    // API endpoint
    if (parsedUrl.pathname === '/api/lecturer' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(lecturerData));
        return;
    }
    // Статичні файли з папки client
    let filePath = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
    filePath = path.join(__dirname, 'client', filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.ico': 'image/x-icon'
    }[ext] || 'application/octet-stream';
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Not Found');
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});
server.listen(PORT, '0.0.0.0', () => {
    console.log('Сервер запущен!');
    console.log('Сайт: https://oksana-lebid-page.onrender.com');  // Замініть на ваше ім'я проєкту
    console.log('API: https://your-project-name.onrender.com/api/lecturer');
});