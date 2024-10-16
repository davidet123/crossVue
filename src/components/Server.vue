<template>
  <v-row>
    <v-col>
      <v-btn color="success" size = "x-small" @click="iniciarServidor()">INICIAR SERVIDOR</v-btn>
    </v-col>
  </v-row>

</template>

<script setup>

import net from "net"


let clients = [];
let port = 12345

const iniciarServidor = () => {
  net.createServer(function (socket){
    socket.name = socket.remoteAddress + ":" + socket.remotePort

    clients.push(socket);
    consolelog(socket.name + " joined the chat\n", socket)

    // Handle incoming messages from clients.
  socket.on('data', function (data) {
    // broadcast(socket.name + "> " + data, socket);
    const b = Buffer.from(data)
    console.log(data.toString())
  });
 
  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the chat.\n");
  });
 
  socket.on('error', function(e){
        console.log(e);
  });


  }).listen(port)
}



</script>