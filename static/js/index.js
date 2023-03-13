let socket = io()

socket.on('connect', function() {
  /* 이름 입력 */
  let name = prompt('반갑습니다! 이름을 입력해주세요!!', '')
  if(!name) {
    name = '익명'
  }

  /* 새로운 유저 알림 */
  socket.emit('newUser', name)
})

/* 서버로부터 데이터 받은 경우 */
socket.on('update', function(data) {
  let chat = document.getElementById('chat')

  let message = document.createElement('div')
  let node = document.createTextNode(`${data.name} : ${data.message}`)
  let className = ''

  switch(data.type) {
    case 'message':
      className = 'other'
      break

    case 'connect':
      className = 'connect'
      break

    case 'disconnect':
      className = 'disconnect'
      break
  }

  message.classList.add(className)
  message.appendChild(node)
  chat.appendChild(message)
})

/* 메시지 전송 함수 */
function send() {
  let message = document.getElementById('test').value
  document.getElementById('test').value = ''

  let chat = document.getElementById('chat')
  let msg = document.createElement('div')
  let node = document.createTextNode(message)
  msg.classList.add('me')
  msg.appendChild(node)
  chat.appendChild(msg)

  socket.emit('message', {type: 'message', message: message})
}