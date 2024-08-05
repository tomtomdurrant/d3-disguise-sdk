import { Message, Client as OscClient } from "node-osc";

export class D3 {
  #client: OscClient;
  #targetPort: number;

  constructor({
    targetServer = "127.0.0.1",
    targetPort = 7401,
    receivePort = 7400,
  }) {
    this.#targetPort = targetPort;
    this.#client = new OscClient(targetServer, targetPort);
  }

  private send(address: string, ...args: any[]) {
    this.#client.send(new Message(address, ...args));
  }

  public setCue(cue: string) {
    const values = cue
      .split(".")
      .map((x) => parseInt(x, 10))
      .filter((x) => !Number.isNaN(x));
    this.send("/d3/showcontrol/cue", ...values);
  }

  play() {
    this.send("/d3/showcontrol/play");
  }

  playToEndOfSection() {
    this.send("/d3/showcontrol/playsection");
  }

  loopSection() {
    this.send("/d3/showcontrol/loop");
  }

  stop() {
    this.send("/d3/showcontrol/stop");
  }

  previousSection() {
    this.send("/d3/showcontrol/previoussection");
  }

  nextSection() {
    this.send("/d3/showcontrol/nextsection");
  }

  returnToStart() {
    this.send("/d3/showcontrol/returntostart");
  }

  previousTrack() {
    this.send("/d3/showcontrol/previoustrack");
  }

  nextTrack() {
    this.send("/d3/showcontrol/nexttrack");
  }
}
