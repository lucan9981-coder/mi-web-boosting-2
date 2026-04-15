import { useState } from "react";

export default function App() {
  const [service, setService] = useState("");
  const [rank, setRank] = useState("");
  const [camoType, setCamoType] = useState("");

  const rankPrices = {
    rebirth: {
      oro: 10,
      plata: 15,
      platino: 20,
      diamante: 30,
      carmesi: 40,
      iridiscente: 60
    },
    multijugador: {
      oro: 15,
      plata: 20,
      platino: 30,
      diamante: 40,
      carmesi: 55,
      iridiscente: 80
    }
  };

  const camoServices = {
    multijugador: { price: 180, days: 5 },
    campaña: { price: 135, days: 6 },
    warzone: { price: 120, days: 3 },
    zombis: { price: 400, days: 7 }
  };

  let price = 0;
  let info = "";

  if (service === "rebirth" || service === "multijugador") {
    if (rank) {
      price = rankPrices[service][rank];
      info = `${service} - ${rank}`;
    }
  }

  if (service === "camos" && camoType) {
    price = camoServices[camoType].price;
    info = `Camuflajes ${camoType}`;
  }

  const buttonStyle = (active) => ({
    margin: 6,
    padding: "12px 18px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: active
      ? "linear-gradient(45deg, #00ffcc, #00ccff)"
      : "#1f1f1f",
    color: active ? "black" : "white",
    boxShadow: active
      ? "0 0 10px #00ffee"
      : "0 0 5px rgba(0,0,0,0.5)",
    transition: "0.2s"
  });

  return (
    <div
      style={{
        backgroundImage: "url('/fastboost.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.75)",
          minHeight: "100vh",
          padding: 30,
          color: "white"
        }}
      >
        <h1 style={{ textShadow: "0 0 10px cyan" }}>
          🔥 FAST BOOST SERVICES
        </h1>
        <p style={{ opacity: 0.8 }}>
          Selecciona servicio y haz tu pedido por Discord
        </p>

        <h2>📦 Servicios</h2>

        <button
          style={buttonStyle(service === "rebirth")}
          onClick={() => {
            setService("rebirth");
            setRank("");
            setCamoType("");
          }}
        >
          Rankeds Rebirth
        </button>

        <button
          style={buttonStyle(service === "multijugador")}
          onClick={() => {
            setService("multijugador");
            setRank("");
            setCamoType("");
          }}
        >
          Rankeds Multi
        </button>

        <button
          style={buttonStyle(service === "camos")}
          onClick={() => {
            setService("camos");
            setRank("");
            setCamoType("");
          }}
        >
          Camuflajes
        </button>

        {(service === "rebirth" || service === "multijugador") && (
          <>
            <h2 style={{ marginTop: 25 }}>🎯 Elige rango</h2>

            {["oro", "plata", "platino", "diamante", "carmesi", "iridiscente"].map((r) => (
              <button
                key={r}
                style={buttonStyle(rank === r)}
                onClick={() => setRank(r)}
              >
                {r}
              </button>
            ))}
          </>
        )}

        {service === "camos" && (
          <>
            <h2 style={{ marginTop: 25 }}>🎯 Elige modo</h2>

            {Object.keys(camoServices).map((type) => (
              <button
                key={type}
                style={buttonStyle(camoType === type)}
                onClick={() => setCamoType(type)}
              >
                {type}
              </button>
            ))}

            {camoType && (
              <p style={{ marginTop: 15, color: "#00ffcc" }}>
                💰 {camoServices[camoType].price}€ | ⏱ {camoServices[camoType].days} días
              </p>
            )}
          </>
        )}

        {price > 0 && (
          <div
            style={{
              marginTop: 30,
              padding: 20,
              background: "#111",
              borderRadius: 10,
              boxShadow: "0 0 15px rgba(0,255,255,0.2)",
              maxWidth: 520
            }}
          >
            <h2 style={{ color: "#00ffcc" }}>💰 {price}€</h2>
            <p>Servicio: {info}</p>

            <p style={{ marginTop: 15, color: "#ccc" }}>
              Entra a nuestro Discord y envíanos este pedido:
              <br />
              <strong>{info} - {price}€</strong>
            </p>

            <a
              href="https://discord.gg/2jvp73eGjs"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: 15,
                padding: 14,
                width: "100%",
                textAlign: "center",
                borderRadius: 10,
                background: "linear-gradient(45deg, #5865F2, #7289DA)",
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
                boxShadow: "0 0 10px rgba(88,101,242,0.7)"
              }}
            >
              💬 Hacer pedido por Discord
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
