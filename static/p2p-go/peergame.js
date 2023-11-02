const PEER_SERVER_KEY = 'lwjd5qra8257b9';

const MESSAGE_TYPE_PLAY = 1;
const MESSAGE_TYPE_PASS = 2;

function makeMessage(type, data, time) {
  return {type : type, data : data, time : time};
}

class PeerGame {
  constructor() {
    
    this.peerID = "no id";
      
    this.peer = new Peer(null, { debug: 2 });
    this.peer.on('open', id => { this.peerID = id; });
    
    this.peer.on('connection', conn => {
      this.connection = conn;
      
      this.guestID = this.connection.peer;
      this.startReceivingData();
    });
    
    this.guestID = "";
    
    this.connectionOpen = undefined;
  }
  
  startReceivingData() {
    this.connection.on('open', () => { 
      this.guestID = this.connection.peer;
      this.player = this.peerID < this.guestID ? -1 : 1;
      board.changePassButton(); });
    this.connection.on('data', data => this.receivedData(data));
    this.connection.on('error', err => console.log(err));
    this.connection.on('close', (err) => console.log(err));
  }
  
  receivedData(data) {
    this.receivedMessage(data.type, data.data, data.time);
  }
  
  receivedMessage(type, data, time) {
    if(type == MESSAGE_TYPE_PLAY) {
      enemyPlayed(data[0], data[1]);
    } else if(type == MESSAGE_TYPE_PASS) {
      enemyPassed();
    }
  }
  
  resendLastPlay() {
    let l = board.plays.length;
    if(l < 1) return;
    let lplay = board.plays[l - 1];
    if(lplay.player == this.player) this.sendMessage(MESSAGE_TYPE_PLAY, lplay.position, 0);
  }
  
  sendMessage(type, data, time) {
    if(this.connection) this.connection.send(makeMessage(type, data, time));
  }
  
  connectToPeer(peerID) {
    if(this.connection) return;
    
    this.guestID = peerID || this.guestID;

    this.connection = this.peer.connect(this.guestID);
    this.startReceivingData();
  }
}