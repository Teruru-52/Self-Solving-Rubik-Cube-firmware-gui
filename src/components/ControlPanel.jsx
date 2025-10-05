import CamImage from "./CamImage";
import ConnectionButtons from "./ConnectionButtons";
import CubeDisplay from "./CubeDisplay";
import { StateLog, MessageLog } from "./Logs";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function ControlPanel({
  connections,
  options,
  typeOptions,
  handleModeChange,
  handleTypeChange,
  handleSpeedChange,
  addLog,
  setMessageLog,
  runState,
  setRunState,
}) {
  async function run_solver() {
    if (!connections.can) {
      return "[ERR] CAN is not connected.";
    }
    if (runState) {
      return "[ERR] Already running.";
    }

    addLog(
      setMessageLog,
      `[LOG] Run command sent. (Mode: ${options.mode}, Type: ${options.type}, Speed: ${options.speed})`,
    )
    const response = await invoke("run_solver", {
      mode: options.mode,
      ctrltype: options.type,
      speed: options.speed,
    });
    setRunState(true);
    return response;
  }

  async function stop_solver() {
    const response = await invoke("stop_solver");
    setRunState(false);
    return response;
  }

  return (
    <div className="button-grid">
      <div className="button-with-select">
        <button
          className="button-run"
          onClick={async () => {
            const responseMsg = await run_solver();
            addLog(setMessageLog, responseMsg);
          }}
        >
          Run
        </button>
        <select
          value={options.mode}
          onChange={(e) => handleModeChange(e.target.value)}
        >
          <option value="solve">solve</option>
          <option value="trick">trick</option>
          <option value="test">test</option>
          <option value="scramble">scramble</option>
        </select>
        <select
          value={options.type}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          {typeOptions[options.mode].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={options.speed}
          onChange={(e) => handleSpeedChange(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((speed) => (
            <option key={speed} value={speed}>
              speed: {speed}
            </option>
          ))}
        </select>
      </div>
      <button
        className="button-stop"
        onClick={async () => {
          addLog(setMessageLog, "[LOG] Stop command sent.");
          const responseMsg = await stop_solver();
          addLog(setMessageLog, responseMsg);
        }}
      >
        Stop
      </button>
    </div>
  );
}
