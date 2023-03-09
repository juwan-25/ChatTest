const express = require('express');
const socket = require('socket.io');
const http = require('http');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));

app.get('/', function(request, response){
    fs.readFile('./static/index.html', function(err, data){
        if(err) {
            response.send('에러');
        } else {
            response.writeHead(200, {'Content-Type':'text/html'}); // 헤더 작성
            response.write(data); // html 데이터 보내기 
            response.end(); // write 응답 시 end 필수
        }
    });
});

server.listen(323, function(){
    console.log('서버 실행');
});