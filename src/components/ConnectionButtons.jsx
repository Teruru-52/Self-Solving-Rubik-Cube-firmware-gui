import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function ConnectionButtons({
  connections,
  toggleConnection,
  addLog,
  setMessageLog,
  runState,
  setRunState,
}) {
  async function connect_camera(connect) {
    const response = await invoke("connect_camera", { connect });
    return response;
  }

  async function connect_can(connect) {
    const response = await invoke("connect_can", { connect });
    return response;
  }

  async function connect_led(connect) {
    const response = await invoke("connect_led", { connect });
    return response;
  }

  async function sample_image() {
    if (!connections.camera) {
      return "[ERR] Camera is not connected.";
    }
    if (!connections.can) {
      return "[ERR] CAN is not connected.";
    }
    if (runState) {
      return "[ERR] Already running.";
    }

    const response = await invoke("sample_image");
    setRunState(true);
    return response;
  }

  return (
    <div className="button-grid">
      <button
        className={connections.camera ? "disconnect-button" : "connect-button"}
        onClick={async() => {
          addLog(setMessageLog, "[LOG] Camera connection command sent.");
          const responseMsg = await connect_camera(!connections.camera);
          toggleConnection("camera");
          addLog(setMessageLog, responseMsg);
        }}
      >
        {connections.camera ? "Disconnect Camera" : "Connect Camera"}
      </button>
      <button
        className={connections.can ? "disconnect-button" : "connect-button"}
        onClick={async() => {
          addLog(setMessageLog, "[LOG] CAN connection command sent.");
          const responseMsg = await connect_can(!connections.can);
          toggleConnection("can");
          addLog(setMessageLog, responseMsg);
        }}
      >
        {connections.can ? "Disconnect CAN" : "Connect CAN"}
      </button>
      <button
        onClick={async() => {
          addLog(setMessageLog, "[LOG] Image sampling command sent.");
          const responseMsg = await sample_image();
          addLog(setMessageLog, responseMsg);
        }}
      >
        Image Sampling
      </button>
      <button
        className={connections.led ? "disconnect-button" : "connect-button"}
        onClick={async() => {
          addLog(setMessageLog, "[LOG] LED command sent.");
          const responseMsg = await connect_led(!connections.led);
          toggleConnection("led");
          addLog(setMessageLog, responseMsg);
        }}
      >
        {connections.led ? "Turn off LED" : "Turn on LED"}
      </button>
    </div>
  );
}
