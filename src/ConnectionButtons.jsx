export default function ConnectionButtons({
    connections,
    toggleConnection,
    addLog,
    setMessageLog,
  }) {
    return (
      <div className="button-grid">
        <button onClick={() => toggleConnection("camera")}>
          {connections.camera ? "Disconnect Camera" : "Connect Camera"}
        </button>
        <button onClick={() => toggleConnection("can")}>
          {connections.can ? "Disconnect CAN" : "Connect CAN"}
        </button>
        <button
          onClick={() =>
            addLog(setMessageLog, "Image sampling command sent.")
          }
        >
          Image Sampling
        </button>
        <button
          onClick={() =>
            addLog(setMessageLog, "Random scramble command sent.")
          }
        >
          Random Scramble
        </button>
      </div>
    );
  }