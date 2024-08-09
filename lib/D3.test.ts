import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { D3 } from "./D3SDK.js"; // adjust the import path as needed
import { Client as OscClient, Server as OscServer, Message } from "node-osc";

// Mock node-osc
vi.mock("node-osc", () => {
  const Client = vi.fn(() => ({
    send: vi.fn(),
  }));
  const Server = vi.fn(() => ({
    on: vi.fn(),
  }));
  return { Client, Server, Message: vi.fn() };
});

describe("D3", () => {
  let d3: D3;
  let mockClient: { send: vi.Mock };
  let mockServer: { on: vi.Mock };

  beforeEach(() => {
    mockClient = { send: vi.fn() };
    mockServer = { on: vi.fn() };
    (OscClient as any).mockImplementation(() => mockClient);
    (OscServer as any).mockImplementation(() => mockServer);
    d3 = new D3({
      targetServer: "127.0.0.1",
      targetPort: 7401,
      receivePort: 7400,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Sending OSC messages", () => {
    it("should send play command", () => {
      d3.play();
      expect(mockClient.send).toHaveBeenCalledWith(expect.any(Message));
      expect(Message).toHaveBeenCalledWith("/d3/showcontrol/play");
    });

    it("should send setCue command", () => {
      d3.setCue("1.2.3");
      expect(mockClient.send).toHaveBeenCalledWith(expect.any(Message));
      expect(Message).toHaveBeenCalledWith("/d3/showcontrol/cue", 1, 2, 3);
    });

    it("should send setVolume command", () => {
      d3.setVolume(75);
      expect(mockClient.send).toHaveBeenCalledWith(expect.any(Message));
      expect(Message).toHaveBeenCalledWith("/d3/showcontrol/volume", 0.75);
    });
  });

  describe("Receiving OSC messages", () => {
    it("should update variables when receiving heartbeat", () => {
      const messageHandler = mockServer.on.mock.calls[0][1];
      messageHandler(["/d3/showcontrol/heartbeat", "1"]);
      expect(d3.variables.heartbeat).toBe("1");
    });

    it("should update variables when receiving track position", () => {
      const messageHandler = mockServer.on.mock.calls[0][1];
      messageHandler(["/d3/showcontrol/trackposition", "01:02:03:04"]);
      expect(d3.variables.trackPosition).toBe("01:02:03:04");
      expect(d3.variables.trackPosition_hh).toBe("01");
      expect(d3.variables.trackPosition_mm).toBe("02");
      expect(d3.variables.trackPosition_ss).toBe("03");
      expect(d3.variables.trackPosition_ff).toBe("04");
    });

    it("should update variables when receiving volume", () => {
      const messageHandler = mockServer.on.mock.calls[0][1];
      messageHandler(["/d3/showcontrol/volume", 0.5]);
      expect(d3.variables.volume).toBe("50.00");
    });
  });

  describe("getVariables", () => {
    it("should return all variables", () => {
      const variables = d3.getVariables();
      expect(variables).toEqual(d3.variables);
    });
  });
});
