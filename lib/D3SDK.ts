import { D3OSCClient } from "./osc/client.js";
import { SystemsClient } from "./http/systems/client.js";
import { StatusClient } from "./http/status/client.js";
import { ShowControlClient } from "./http/showControl/client.js";

export class D3 {
  #targetPort: number;
  public systems: SystemsClient;
  public session: StatusClient;
  public showControl: ShowControlClient;
  public osc: D3OSCClient;

  constructor({
    targetServer = "127.0.0.1",
    targetPort = 7401,
    receivePort = 7400,
  }) {
    this.#targetPort = targetPort;
    this.osc = new D3OSCClient({
      targetServer,
      targetPort,
    });
    this.systems = new SystemsClient("http://" + targetServer);
    this.session = new StatusClient("http://" + targetServer);
    this.showControl = new ShowControlClient("http://" + targetServer);
  }

  public async goToTime({
    directorUrl,
    transportUid,
    time,
    playMode = "PlaySection",
  }: {
    directorUrl: string;
    transportUid: string;
    time: string;
    playMode?: string;
  }) {
    const res = await fetch(directorUrl + "/api/session/transport/gototime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transports: [
          {
            transport: {
              uid: transportUid,
            },
            time: time,
            playmode: playMode,
          },
        ],
      }),
    });
    console.log(res);
    return res;
  }

  public async goToTimeCode({
    directorUrl,
    transportUid,
    timeCode,
    playMode = "PlaySection",
  }: {
    directorUrl: string;
    transportUid: string;
    timeCode: string;
    playMode?: string;
  }) {
    const res = await fetch(
      directorUrl + "/api/session/transport/gototimecode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transports: [
            {
              transport: {
                uid: transportUid,
              },
              timecode: timeCode,
              ignoreTags: true,
              playmode: playMode,
            },
          ],
        }),
      }
    );
    console.log(res);
    return res;
  }

  public async goToTrack({
    directorUrl,
    transportUid,
    trackUid,
    playMode = "PlaySection",
  }: {
    directorUrl: string;
    transportUid: string;
    trackUid: string;
    playMode?: string;
  }) {
    const res = await fetch(directorUrl + "/api/session/transport/gototrack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transports: [
          {
            transport: {
              uid: transportUid,
            },
            track: {
              uid: trackUid,
            },
            playmode: playMode,
          },
        ],
      }),
    });
    console.log(res);
    return res;
  }

  public getVariables() {
    return this.variables;
  }
}
