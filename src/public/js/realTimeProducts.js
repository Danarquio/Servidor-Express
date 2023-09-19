const socket = io()
socket.emit("message", "Hola, me estoy comuncando desde un webSocket")


socket.on("evento_para_socket_individual", data=>{
    console.log(data)
})

socket.on("evento_para_todos_menos_socket_actual", data => {
    console.log(data)
})

socket.on("evento_para_todos", data => {
    console.log(data)
})

