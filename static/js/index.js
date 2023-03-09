let socket = io();

socket.on('connect', function() {
    let input = document.getElementById('test');
    input.value = '접속 완료';
});

function send() {
    let message = document.getElementById('test').value;
    document.getElementById('test').value = '';
    socket.emit('send', {msg: message});
};