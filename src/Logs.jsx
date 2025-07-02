export default function Logs({ stateLog, messageLog }) {
    return (
      <div className="logs">
        <div className="comment-container">
          <div className="comment-label">State log</div>
          <div className="comment-display">
            {stateLog.map((msg, idx) => (
              <div key={idx} className="comment-line">
                {msg !== "" ? msg : <span>&nbsp;</span>}
              </div>
            ))}
          </div>
        </div>
  
        <div className="comment-container">
          <div className="comment-label">Message log</div>
          <div className="comment-display">
            {messageLog.map((msg, idx) => (
              <div key={idx} className="comment-line">
                {msg !== "" ? msg : <span>&nbsp;</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }