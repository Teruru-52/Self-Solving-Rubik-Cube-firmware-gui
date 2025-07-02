import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Header from "./Header.jsx";
import ConnectionButtons from "./ConnectionButtons.jsx";
import ControlPanel from "./ControlPanel.jsx";
import Logs from "./Logs.jsx";

function App() {
  const [name, setName] = useState("");
  const [stateLog, setStateLog] = useState(["", "", "", "", ""]);
  const [messageLog, setMessageLog] = useState(["", "", "", "", ""]);
  const [connections, setConnections] = useState({
    camera: false,
    can: false,
  });
  const [options, setOptions] = useState({
    mode: "solve",
    type: "normal",
  });
  const typeOptions = {
    solve: [
      "normal",
      "checker",
      "heso",
      "string-H",
      "string-T",
      "stripe",
      "in-Cube",
    ],
    trick: ["move-24", "move-112", "move-126"],
    test: ["move-U", "move-D", "move-R", "move-L", "move-F", "move-B"],
  };

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  function addLog(setter, newComment) {
    setter((prev) => {
      const updated = [...prev, newComment];
      if (updated.length > 5) updated.shift();
      return updated;
    });
  }

  // Toggle connection state
  function toggleConnection(type) {
    setConnections((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  }

  // Handle selection changes for options
  function handleModeChange(newMode) {
    setOptions({
      mode: newMode,
      type: typeOptions[newMode][0],
    });
  }

  function handleTypeChange(newType) {
    setOptions((prev) => ({
      ...prev,
      type: newType,
    }));
  }

  return (
    <div>
      <Header/>
      <div className="app-layout">
        <div className="left-panel">
          <h2>左側のコンテンツ</h2>
          <p>ここにカメラ映像や別の情報などを表示できます。</p>
        </div>
        <main className="right-panel">
        <ConnectionButtons
            connections={connections}
            toggleConnection={toggleConnection}
            addLog={addLog}
            setMessageLog={setMessageLog}
          />
          <ControlPanel
            options={options}
            typeOptions={typeOptions}
            handleModeChange={handleModeChange}
            handleTypeChange={handleTypeChange}
            addLog={addLog}
            setMessageLog={setMessageLog}
          />
          <Logs stateLog={stateLog} messageLog={messageLog} />
        </main>
      </div>
    </div>
  );
}

export default App;
