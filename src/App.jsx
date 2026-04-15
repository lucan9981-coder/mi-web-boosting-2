import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");

  return (
    <div style={{ background: "black", color: "white", minHeight: "100vh", padding: 40 }}>
      <h1>🔥 Web funcionando</h1>
      <p>Si ves esto, todo está bien configurado</p>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe algo"
        style={{ padding: 10, marginTop: 20 }}
      />

      <p>{text}</p>
    </div>
  );
}