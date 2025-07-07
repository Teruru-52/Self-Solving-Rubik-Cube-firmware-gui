import githubLogo from "../assets/github.png";
import reactLogo from "../assets/react.svg";

export default function Header() {
  return (
    <div>
      <h1 className="main-title">Self-Solving Rubik's Cube GUI</h1>
      <div className="row">
        <a
          href="https://github.com/Teruru-52/Self-Solving-Rubik-Cube-firmware-gui"
          target="_blank"
        >
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
    </div>
  );
}
