import { Client, Message } from "node-osc";
interface D3OSCClientOptions {
  targetServer: string;
  targetPort?: number;
}

export class D3OSCClient {
  private client: Client;
  constructor({ targetServer, targetPort }: D3OSCClientOptions) {
    targetPort = targetPort || 7401;
    this.client = new Client(targetServer, targetPort);
  }
  private send(address: string, ...args: any[]) {
    this.client.send(new Message(address, ...args));
  }

  // private handleMessage(message: [string, ...any[]]) {
  //   const [address, ...args] = message;
  //   switch (address) {
  //     case "/d3/showcontrol/heartbeat":
  //       this.variables.heartbeat = args[0];
  //       break;
  //     case "/d3/showcontrol/trackposition":
  //       const trackPosition = args[0];
  //       this.variables.trackPosition = trackPosition;
  //       this.variables.trackPosition_hh = trackPosition.slice(0, 2);
  //       this.variables.trackPosition_mm = trackPosition.slice(3, 5);
  //       this.variables.trackPosition_ss = trackPosition.slice(6, 8);
  //       this.variables.trackPosition_ff = trackPosition.slice(9, 11);
  //       break;
  //     case "/d3/showcontrol/trackname":
  //       this.variables.trackName = args[0];
  //       break;
  //     case "/d3/showcontrol/trackid":
  //       this.variables.trackID = args[0];
  //       break;
  //     case "/d3/showcontrol/currentsectionname":
  //       this.variables.currentSectionName = args[0];
  //       break;
  //     case "/d3/showcontrol/nextsectionname":
  //       this.variables.nextSectionName = args[0];
  //       break;
  //     case "/d3/showcontrol/sectionhint":
  //       this.variables.sectionHint = args[0];
  //       break;
  //     case "/d3/showcontrol/volume":
  //       this.variables.volume = (args[0] * 100).toFixed(2);
  //       break;
  //     case "/d3/showcontrol/brightness":
  //       this.variables.brightness = (args[0] * 100).toFixed(2);
  //       break;
  //     case "/d3/showcontrol/bpm":
  //       this.variables.bpm = args[0];
  //       break;
  //     case "/d3/showcontrol/playmode":
  //       this.variables.playMode = args[0];
  //       break;
  //   }
  // }

  public setCue(cue: string) {
    const values = cue
      .split(".")
      .map((x) => parseInt(x, 10))
      .filter((x) => !Number.isNaN(x));
    this.send("/d3/showcontrol/cue", ...values);
  }

  public play() {
    this.send("/d3/showcontrol/play");
  }

  public playToEndOfSection() {
    this.send("/d3/showcontrol/playsection");
  }

  public loopSection() {
    this.send("/d3/showcontrol/loop");
  }

  public stop() {
    this.send("/d3/showcontrol/stop");
  }

  public previousSection() {
    this.send("/d3/showcontrol/previoussection");
  }

  public nextSection() {
    this.send("/d3/showcontrol/nextsection");
  }

  public returnToStart() {
    this.send("/d3/showcontrol/returntostart");
  }

  public previousTrack() {
    this.send("/d3/showcontrol/previoustrack");
  }

  public nextTrack() {
    this.send("/d3/showcontrol/nexttrack");
  }

  public setTrackName(name: string) {
    this.send("/d3/showcontrol/trackname", name);
  }

  public setTrackID(id: number) {
    this.send("/d3/showcontrol/trackid", id);
  }

  public fadeUp() {
    this.send("/d3/showcontrol/fadeup");
  }

  public fadeDown() {
    this.send("/d3/showcontrol/fadedown");
  }

  public hold() {
    this.send("/d3/showcontrol/hold");
  }

  public setVolume(volume: number) {
    this.send("/d3/showcontrol/volume", volume / 100);
  }

  public setBrightness(brightness: number) {
    this.send("/d3/showcontrol/brightness", brightness / 100);
  }
}
