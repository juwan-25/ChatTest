let socket = io();

socket.on('connect', function() {
    let name = prompt('반가워요!! 이름을 입력해주세요!', '');
    if(!name){
        name = '익명';
    }

    socket.emit('newUser', name);
});

socket.on('update', function(data){
    console.log(`${data.name}:${data.message}`);
});

function send() {
    let message = document.getElementById('test').value;
    document.getElementById('test').value = '';
    socket.emit('message', {type : 'message', message: message});
};