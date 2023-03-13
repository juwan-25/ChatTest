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

io.sockets.on('connection', function(socket) {

    /* 새로운 유저 접속시 다른 소켓에 알림 */
    socket.on('newUser', function(name) {
        console.log(name + '님이 접속하였습니다! ');
        socket.name = name;
        io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다! '})
    });

    /* 전송 메세지 받기 */
    socket.on('message', function(data) {
        data.name = socket.name;
        console.log(data);
        socket.broadcast.emit('update', data);
    });

    /* 접속 종료 */
    socket.on('disconnect', function() {
        console.log(socket.name + '님이 나가셨습니다:(');
        socket.broadcast.emit('update', {type: 'connect', name: 'SERVER', message: socket.name + '님이 나가셨습니다:('});
    });
    
});

server.listen(323, function(){
    console.log('서버 실행');
});