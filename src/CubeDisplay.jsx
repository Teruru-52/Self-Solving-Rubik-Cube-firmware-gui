export default function CubeDisplay({ cubeColors, changeCubeColor }) {
  return (
    <div className="cube-net">
      <div className="face-row face-center">
        <CubeFace
          face="U"
          colors={cubeColors.U}
          changeCubeColor={changeCubeColor}
        />
      </div>

      <div className="face-row">
        <div className="lfr-group">
          <CubeFace
            face="L"
            colors={cubeColors.L}
            changeCubeColor={changeCubeColor}
          />
          <CubeFace
            face="F"
            colors={cubeColors.F}
            changeCubeColor={changeCubeColor}
          />
          <CubeFace
            face="R"
            colors={cubeColors.R}
            changeCubeColor={changeCubeColor}
          />
        </div>
        <CubeFace
          face="B"
          colors={cubeColors.B}
          changeCubeColor={changeCubeColor}
        />
      </div>

      <div className="face-row face-center">
        <CubeFace
          face="D"
          colors={cubeColors.D}
          changeCubeColor={changeCubeColor}
        />
      </div>
    </div>
  );
}

function CubeFace({ face, colors, changeCubeColor }) {
  return (
    <div className="cube-grid">
      {colors.map((color, index) => {
        const isCenter = index === 4;

        return (
          <div
            key={index}
            className="cube-cell"
            style={{
              backgroundColor: color,
              cursor: isCenter ? "default" : "pointer", // Disable pointer events for center piece
            }}
            onClick={() => {
              if (!isCenter) {
                changeCubeColor(face, index);
              }
            }}
          >
            {isCenter && <div className="face-label">{face}</div>}
          </div>
        );
      })}
    </div>
  );
}
