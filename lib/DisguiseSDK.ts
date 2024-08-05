import { Client, Message } from "node-osc";
export class D3DisguiseSDK {
  #client: Client;
  #sendPort: number;
  #receivePort: number;
  #variables: any;
  constructor(host = "127.0.0.1", sendPort = 7401, receivePort = 7400) {
    this.#client = new Client(host, sendPort);
    this.#sendPort = sendPort;
    this.#receivePort = receivePort;

    this.#variables = {
      heartbeat: "0",
      trackPosition: "00:00:00:00",
      trackPosition_hh: "00",
      trackPosition_mm: "00",
      trackPosition_ss: "00",
      trackPosition_ff: "00",
      trackName: "None",
      trackID: "0",
      currentSectionName: "None",
      nextSectionName: "None",
      sectionHint: "None",
      volume: "100",
      brightness: "100",
      bpm: "0",
      playMode: "None",
    };

    // this.initOSC();
  }

  public close() {
    this.#client.close();
  }

  // initOSC() {
  //   this.sender = new OSC.UDPPort({
  //     localAddress: "0.0.0.0",
  //     localPort: 0,
  //     remoteAddress: this.host,
  //     remotePort: this.sendPort,
  //   });

  // this.receiver = new OSC.UDPPort({
  //   localAddress: "0.0.0.0",
  //   localPort: this.receivePort,
  //   metadata: true,
  // });

  // this.sender.open();
  // this.receiver.open();

  // this.receiver.on("message", this.handleMessage.bind(this));

  public sendOSC(address: string, ...args: any[]) {
    const message = new Message(address, ...args);
    console.log(this.#client);

    console.log("sending message", message);
    this.#client.send(new Message("/d3/showcontrol/cue", 10));
    // console.log("sending message", message);

    // this.#client.send(message);
  }

  // handleMessage(message) {
  //   switch (message.address) {
  //     case "/d3/showcontrol/heartbeat":
  //       this.variables.heartbeat = message.args[0].value;
  //       break;
  //     case "/d3/showcontrol/trackposition":
  //       const trackPosition = message.args[0].value;
  //       this.variables.trackPosition = trackPosition;
  //       this.variables.trackPosition_hh = trackPosition.slice(0, 2);
  //       this.variables.trackPosition_mm = trackPosition.slice(3, 5);
  //       this.variables.trackPosition_ss = trackPosition.slice(6, 8);
  //       this.variables.trackPosition_ff = trackPosition.slice(9, 11);
  //       break;
  //     case "/d3/showcontrol/trackname":
  //       this.variables.trackName = message.args[0].value;
  //       break;
  //     case "/d3/showcontrol/trackid":
  //       this.variables.trackID = message.args[0].value;
  //       break;
  //     case "/d3/showcontrol/currentsectionname":
  //       this.variables.currentSectionName = message.args[0].value;
  //       break;
  //     case "/d3/showcontrol/nextsectionname":
  //       this.variables.nextSectionName = message.args[0].value;
  //       break;
  //     case "/d3/showcontrol/sectionhint":
  //       this.variables.sectionHint = message.args[0].value;
  //       break;
  //     case "/d3/showcontrol/volume":
  //       this.variables.volume = (message.args[0].value * 100).toFixed(2);
  //       break;
  //     case "/d3/showcontrol/brightness":
  //       this.variables.brightness = (message.args[0].value * 100).toFixed(2);
  //       break;
  //     case "/d3/showcontrol/bpm":
  //       this.variables.bpm = message.args[0].value;
  //       break;
  //     case "/d3/showcontrol/playmode":
  //       this.variables.playMode = message.args[0].value;
  //       break;
  //   }
  // }

  // Getter for all variables
  getVariables() {
    return this.variables;
  }

  // Control methods
  play() {
    this.sendOSC("/d3/showcontrol/play");
  }

  playToEndOfSection() {
    this.sendOSC("/d3/showcontrol/playsection");
  }

  loopSection() {
    this.sendOSC("/d3/showcontrol/loop");
  }

  stop() {
    this.sendOSC("/d3/showcontrol/stop");
  }

  previousSection() {
    this.sendOSC("/d3/showcontrol/previoussection");
  }

  nextSection() {
    this.sendOSC("/d3/showcontrol/nextsection");
  }

  returnToStart() {
    this.sendOSC("/d3/showcontrol/returntostart");
  }

  previousTrack() {
    this.sendOSC("/d3/showcontrol/previoustrack");
  }

  nextTrack() {
    this.sendOSC("/d3/showcontrol/nexttrack");
  }

  setTrackName(name) {
    this.sendOSC("/d3/showcontrol/trackname", [{ type: "s", value: name }]);
  }

  setTrackID(id) {
    this.sendOSC("/d3/showcontrol/trackid", [
      { type: "i", value: parseInt(id) },
    ]);
  }

  setCue(cue) {
    this.sendOSC("/d3/showcontrol/cue", [{ type: "i", value: parseInt(cue) }]);
  }

  fadeUp() {
    this.sendOSC("/d3/showcontrol/fadeup");
  }

  fadeDown() {
    this.sendOSC("/d3/showcontrol/fadedown");
  }

  hold() {
    this.sendOSC("/d3/showcontrol/hold");
  }

  setVolume(volume: number) {
    this.sendOSC("/d3/showcontrol/volume", [
      { type: "f", value: parseFloat(volume) / 100 },
    ]);
  }

  setBrightness(brightness) {
    this.sendOSC("/d3/showcontrol/brightness", [
      { type: "f", value: parseFloat(brightness) / 100 },
    ]);
  }
}
