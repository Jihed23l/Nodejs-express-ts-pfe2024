const message = document.querySelector('#message')
const button = document.querySelector('button')

const socket = io()

function printMessage(e){
    e.preventDefault()
    socket.emit('message',message.value)
}

button.addEventListener('click',printMessage)

