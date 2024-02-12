const https = require("https");
const fs = require("fs");

var WebSocketServer = require('ws').Server;
const fetch = require("node-fetch");

const server = https.createServer({
  cert: fs.readFileSync('/opt/bitnami/nginx/conf/wss.apigang.com.crt'),
  key: fs.readFileSync('/opt/bitnami/nginx/conf/wss.apigang.com.key')
});

var connection = function(){

// data send to client
var data = true;

const match_ids = new Map();

let members = [];

function broadcastMessage(match_id, message) {
    // members[match_id] && members[match_id].forEach(m => m.emit('message', message))
    members[match_id] && members[match_id].forEach(m => m.send(message))
}

function addUser(match_id, client) {
    members[match_id].set(client.id, client)
}

function removeUser(client) {
    members.forEach(match_id => match_id.delete(client.id))
}

try {
  // wss = new WebSocketServer({port: 3000})
  // wss = new WebSocketServer({port: 3000, server: httpsServer})
  wss = new WebSocketServer({ server });
  wss.on('connection', function (ws) {
    console.log('Client connected');
    //console.log(ws);
    // connectCounter++;
    ws.on('message', function (data) {
        const { message, method } = JSON.parse(data);
        console.log('received: %s', message)
        if(method === "join") {
            if(!match_ids.get(message)) {
                match_ids.set(message, message);
                members[message] = new Map();
            }
            addUser(message, ws);
        }
    })

    ws.on('disconnect', function () {
      console.log('connection disconnect')
    })

    ws.on('error', function () {
      console.log('connection error')
    })

    ws.on('close', function () {
      console.log('connection closed');
      removeUser(ws);
    })

    API_BASE_URL = "https://abetclub.com/api/getApiData/";
    // let match_id = "32686862";
    setInterval(  
      () => {
        if(data) {
            match_ids && Array.from(match_ids.values()).map((match_id) =>
                fetch(API_BASE_URL+"listMarketBookSession/"+match_id)
                .then((resp) => resp && resp!="" && resp.json())
                .then((response) => {
                    // response && broadcastMessage(match_id, response);
                    response && broadcastMessage(match_id, JSON.stringify(response));
                    // response && ws.send(JSON.stringify(response));
                })
            )
        }
      },
      1000
    )
  })

  } catch (error) {
    console.log(error);
    //  setInterval(connect,300);
    return false;
  }

}

connection();
server.listen(3000);