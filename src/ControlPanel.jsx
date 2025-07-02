export default function ControlPanel({
    options,
    typeOptions,
    handleModeChange,
    handleTypeChange,
    addLog,
    setMessageLog,
  }) {
    return (
      <div className="button-grid">
        <div className="button-with-select">
          <button
            className="button-run"
            onClick={() => addLog(setMessageLog, "Run command sent.")}
          >
            Run
          </button>
          <select
            value={options.mode}
            onChange={(e) => handleModeChange(e.target.value)}
          >
            <option value="solve">Solve</option>
            <option value="trick">Trick</option>
            <option value="test">Test</option>
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