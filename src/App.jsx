import { useState } from "react";
import githubLogo from "./assets/github.png";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [connections, setConnections] = useState({
    camera: false,
    can: false
  });
  const [options, setOptions] = useState({
    mode: "solve",
    type: "normal"
  });
  const typeOptions = {
    solve: ["normal", "checker", "heso", "string-H", "string-T", "stripe", "in-Cube"],
    trick: ["move-24", "move-112", "move-126"],
    test: ["move-U", "move-D", "move-R", "move-L", "move-F", "move-B"]
  };

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
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
      type: typeOptions[newMode][0]
    });
  }

  function handleTypeChange(newType) {
    setOptions((prev) => ({
      ...prev,
      type: newType
    }));
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://github.com/Teruru-52/Self-Solving-Rubik-Cube-firmware-gui" target="_blank">
          <img src={githubLogo} className="logo github" alt="Github logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {/* <p>Click on the Tauri, Vite, and React logos to learn more.</p> */}

      {/* <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form> */}

      <div className="button-grid">
        <button onClick={() => toggleConnection('camera')}>
          {connections.camera ? "Disconnect Camera" : "Connect Camera"}
        </button>
        <button onClick={() => toggleConnection('can')}>
          {connections.can ? "Disconnect CAN" : "Connect CAN"}
        </button>
        <button>Image Sampling</button>
        <button>Random Scramble</button>
        <div className="button-with-select">
        <button className="button-run">Run</button>
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
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button className="button-stop">Stop</button>
      </div>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
