import CamImage from "./CamImage";
import ConnectionButtons from "./ConnectionButtons";
import CubeDisplay from "./CubeDisplay";
import { StateLog, MessageLog } from "./Logs";

export default function ControlPanel({
  options,
  typeOptions,
  handleModeChange,
  handleTypeChange,
  handleSpeedChange,
  addLog,
  setMessageLog,
}) {
  return (
    <div className="button-grid">
      <div className="button-with-select">
        <button
          className="button-run"
          onClick={() =>
            addLog(
              setMessageLog,
              `Run command sent. (Mode: ${options.mode}, Type: ${options.type}, Speed: ${options.speed})`,
            )
          }
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
        onClick={() => addLog(setMessageLog, "Stop command sent.")}
      >
        Stop
      </button>
    </div>
  );
}
