import { useState } from "react";

export default function App() {
  const [service, setService] = useState("");
  const [rank, setRank] = useState("");
  const [camoType, setCamoType] = useState("");
  const [order, setOrder] = useState(false);

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

  return (
    <div style={{ background: "#0f0f0f", color: "white", minHeight: "100vh", padding: 30, fontFamily: "Arial" }}>
      
      <h1>🔥 BOOSTING SERVICES</h1>
      <p>Selecciona servicio, rango o farmeo</p>

      {/* SERVICIOS */}
      <h2>📦 Servicios</h2>

      <button onClick={() => { setService("rebirth"); setRank(""); setCamoType(""); }}>
        Rankeds Rebirth
      </button>

      <button onClick={() => { setService("multijugador"); setRank(""); setCamoType(""); }} style={{ marginLeft: 10 }}>
        Rankeds Multijugador
      </button>

      <button onClick={() => { setService("camos"); setRank(""); }} style={{ marginLeft: 10 }}>
        Farmeo de Camuflajes
      </button>

      {/* RANKEDS */}
      {(service === "rebirth" || service === "multijugador") && (
        <>
          <h2 style={{ marginTop: 20 }}>🎯 Elige rango</h2>

          {["oro", "plata", "platino", "diamante", "carmesi", "iridiscente"].map((r) => (
            <button
              key={r}
              onClick={() => setRank(r)}
              style={{
                margin: 5,
                padding: 10,
                background: rank === r ? "green" : "gray",
                color: "white"
              }}
            >
              {r}
            </button>
          ))}
        </>
      )}

      {/* CAMUFLAJES */}
      {service === "camos" && (
        <>
          <h2 style={{ marginTop: 20 }}>🎯 Elige materia</h2>

          {Object.keys(camoServices).map((type) => (
            <button
              key={type}
              onClick={() => setCamoType(type)}
              style={{
                margin: 5,
                padding: 10,
                background: camoType === type ? "green" : "gray",
                color: "white"
              }}
            >
              {type}
            </button>
          ))}

          {camoType && (
            <p style={{ marginTop: 10 }}>
              💰 Precio: {camoServices[camoType].price}€ | ⏱ {camoServices[camoType].days} días
            </p>
          )}
        </>
      )}

      {/* PRECIO FINAL */}
      {price > 0 && (
        <div style={{ marginTop: 30 }}>
          <h2>💰 Precio: {price}€</h2>
          <p>📦 Servicio: {info}</p>

          <button
            onClick={() => setOrder(true)}
            style={{ padding: 10, background: "cyan", color: "black", marginTop: 10 }}
          >
            Hacer pedido
          </button>
        </div>
      )}

      {/* PEDIDO */}
      {order && (
        <div style={{ marginTop: 30 }}>
          <h2>✅ Pedido creado</h2>
          <p>{info}</p>
          <p>Total: {price}€</p>
          <p>Te contactaremos por Discord</p>
        </div>
      )}
    </div>
  );
}
