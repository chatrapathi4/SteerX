export default function EchoStack({ word }) {
  return (
    <div className="echo-stack">
      <span className="echo-layer bg e4">{word}</span>
      <span className="echo-layer bg e3">{word}</span>
      <span className="echo-layer bg e2">{word}</span>
      <span className="echo-layer bg e1">{word}</span>
      <span className="echo-layer fg">{word}</span>
    </div>
  );
}