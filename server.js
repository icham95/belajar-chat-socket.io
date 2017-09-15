var express = require('express');
var app = express();
var http= require('http').Server(app);
var io 	= require('socket.io')(http);

app.use('/assets',express.static("assets"));

// app.use('/assets', app.static('public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	// kalo ada message baru
	socket.on('newMessage', function (msg) {
		io.emit('newMessage', msg);
		console.log('chat baru dari : ' + msg.nama + ' ' + msg.val);
	});

	// user dissconect
	socket.on('disconect', function (msg) {
		console.log('user disconected');
	})
})


http.listen(3000, function () {
	console.log('listening on 3000');
});
