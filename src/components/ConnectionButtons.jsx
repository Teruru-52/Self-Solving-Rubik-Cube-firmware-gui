export default function ConnectionButtons({
  connections,
  toggleConnection,
  addLog,
  setMessageLog,
}) {
  return (
    <div className="button-grid">
      <button
        className={connections.camera ? "disconnect-button" : "connect-button"}
        onClick={() => {
          toggleConnection("camera");
          addLog(setMessageLog, "Camera connection command sent.");
        }}
      >
        {connections.camera ? "Disconnect Camera" : "Connect Camera"}
      </button>
      <button
        className={connections.can ? "disconnect-button" : "connect-button"}
        onClick={() => {
          toggleConnection("can");
          addLog(setMessageLog, "CAN connection command sent.");
        }}
      >
        {connections.can ? "Disconnect CAN" : "Connect CAN"}
      </button>
      <button
        onClick={() => addLog(setMessageLog, "Image sampling command sent.")}
      >
        Image Sampling
      </button>
      <button
        className={connections.led ? "disconnect-button" : "connect-button"}
        onClick={() => {
          toggleConnection("led");
          addLog(setMessageLog, "LED command sent.");
        }}
      >
        {connections.led ? "Turn off LED" : "Turn on LED"}
      </button>
    </div>
  );
}
