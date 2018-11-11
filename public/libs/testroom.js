(() => {
  const roomIdReg = /roomId=([a-zA-Z0-9\-_]+)/;
  if (location.href.search(roomIdReg) === -1) return;
  
  const roomId = location.href.match(/roomId=([a-zA-Z0-9\-_]+)/)[1];
  const host = window.document.location.host.replace(/:.*/, '');
  const client = new Colyseus.Client(
    location.protocol.replace('http', 'ws') +
      host +
      (location.port ? ':' + location.port : ''),
  );
  let room = client.join(roomId);

  room.onStateChange.addOnce(function(state) {
    console.log("this is the first room state!", state);
  });
  
  room.onStateChange.add(function(state) {
    console.log("the room state has been updated:", state);
  });

  room.onMessage.add(function(message) {
    console.log("server just sent this message:");
    console.log(message);
  });

  room.onJoin.add(function() {
    console.log("client joined successfully");
  });

  room.onLeave.add(function() {
    console.log("client left the room");
  });

  room.onError.add(function(err) {
    console.log("oops, error ocurred:");
    console.log(err);
  });
})();
