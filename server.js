// ----- Здесь мы создадим собственный веб-сервер


const http = require('http');
const fs = require('fs');
const path = require('path');



const server = http.createServer((req, res) => {


    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    // Проверяем расширение файла
    const ext = path.extname(filePath);
    let contentType = 'text/html'; // По-умолчанию

    switch (ext) {
        case '.css':
            contentType = 'text/css';
            break;

        case '.js': 
            contentType = 'text/javascript';
            break;

        default:
            contentType = 'text/html';
    }

    if (!ext) {
        filePath += '.html';
    }
    // console.log(filePath); // В консоль мы должны получить путь к файлу, при заходе на html страницу в браузере

    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error');
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.end(data);
                }
            });
            // Этот кейс у нас был на случай ошибки. 
            // Если ошибки нет, то:
            } else { 
            res.writeHead(200, {
            'Content-Type': contentType
        });
            res.end(content);
          }
    });
    // Чтобы код filePath заработал, нужно вывзвать метод end()
     

    
});



// первый параметр это номер порта, второй callback-функция
// Для того, чтобы отобразить изменения в браузере нужно перезапустить наш server с помощью ctrl+C, затем опять включить

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`);
});

// Для того, чтобы каждый раз вручную не перезапускать сервер, у нас есть такой пакет nodemon, мы его уже установили
// Для того, чтобы это всё автоматизировать мы заходим в package.json, и в scripts делаем следующие изменения:
/*
    "scripts": {
    "start": "node server.js", --- служит для продакшен работы. Там не нужен nodemon, поэтому запускаем наш файл, через node
    "dev": "nodemon server.js" --- запускаем файл таким образом, если работаем в режиме разработки
  },

  Запускать наши скрипты мы можем с помощью команды: npm run (либо start, либо dev)
*/