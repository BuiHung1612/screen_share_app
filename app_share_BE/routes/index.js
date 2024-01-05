

const express = require('express');
const router = express.Router();
const server = require('../server')
const io = require('socket.io')(server);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('caller_offer', function(params){
    console.log('[Local Srteam] received: '+ params);
    io.emit('caller_offer', params);
  });
  socket.on('callee_answer', function(msg){
    io.emit('callee_answer', msg);
  });
  socket.on('ice-candidate', function(msg){
    io.emit('ice-candidate', msg);
  });

  socket.on('end_call', function(msg){
    io.emit('end_call', msg);
  });
  

});




module.exports = router;
