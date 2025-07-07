import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Header from "./Header.jsx";
import ConnectionButtons from "./ConnectionButtons.jsx";
import ControlPanel from "./ControlPanel.jsx";
import { StateLog, MessageLog } from "./Logs.jsx";
import CubeDisplay from "./CubeDisplay.jsx";
import CamImage from "./CamImage.jsx";

function App() {
  const [name, setName] = useState("");
  const [stateLog, setStateLog] = useState(["", "", "", "", ""]);
  const [messageLog, setMessageLog] = useState(["", "", "", "", ""]);
  const [connections, setConnections] = useState({
    camera: false,
    can: false,
    led: false,
  });
  const [options, setOptions] = useState({
    mode: "solve",
    type: "normal",
    speed: 1,
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
    scramble: ["random-10", "random-20", "random-30"],
  };
  const colorCycle = [
    "white",
    "red",
    "royalblue",
    "orange",
    "forestgreen",
    "yellow",
  ];
  const initialCubeColors = {
    U: Array(9).fill("white"),
    L: Array(9).fill("orange"),
    F: Array(9).fill("forestgreen"),
    R: Array(9).fill("red"),
    D: Array(9).fill("yellow"),
    B: Array(9).fill("royalblue"),
  };
  const [cubeColors, setCubeColors] = useState(initialCubeColors);

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

  function handleSpeedChange(newSpeed) {
    setOptions((prev) => ({
      ...prev,
      speed: newSpeed,
    }));
  }

  function changeCubeColor(face, index) {
    setCubeColors((prev) => {
      const nextColorIndex =
        (colorCycle.indexOf(prev[face][index]) + 1) % colorCycle.length;
      const newFaceColors = [...prev[face]];
      newFaceColors[index] = colorCycle[nextColorIndex];
      return { ...prev, [face]: newFaceColors };
    });
  }

  return (
    <div>
      <Header />
      <div className="app-layout">
        <div className="left-panel">
          <CamImage />
          <StateLog logs={stateLog} />
          <CubeDisplay
            cubeColors={cubeColors}
            changeCubeColor={changeCubeColor}
          />
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
            handleSpeedChange={handleSpeedChange}
            addLog={addLog}
            setMessageLog={setMessageLog}
          />
          <MessageLog logs={messageLog} />
          <CubeDisplay
            cubeColors={cubeColors}
            changeCubeColor={changeCubeColor}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
