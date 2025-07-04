export function StateLog({ logs }) {
  return (
    <div className="comment-container">
      <div className="comment-label">State log</div>
      <div className="comment-display">
        {logs.map((msg, idx) => (
          <div key={idx} className="comment-line">
            {msg !== "" ? msg : <span>&nbsp;</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MessageLog({ logs }) {
  return (
    <div className="comment-container">
      <div className="comment-label">Message log</div>
      <div className="comment-display">
        {logs.map((msg, idx) => (
          <div key={idx} className="comment-line">
            {msg !== "" ? msg : <span>&nbsp;</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
