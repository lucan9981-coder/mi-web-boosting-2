import { useState } from "react";

export default function App() {
  const [service, setService] = useState("");
  const [rank, setRank] = useState("");
  const [order, setOrder] = useState(false);

  const prices = {
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

  const price = service && rank ? prices[service][rank] : 0;

  return (
    <div style={{ background: "#0f0f0f", color: "white", minHeight: "100vh", padding: 30, fontFamily: "Arial" }}>
      
      <h1>🔥 BOOSTING SERVICES</h1>
      <p>Selecciona un servicio y rango para ver el precio</p>

      {/* SERVICIOS */}
      <h2>📦 Servicios</h2>

      <button onClick={() => { setService("rebirth"); setRank(""); }}>
        Rankeds Rebirth
      </button>

      <button onClick={() => { setService("multijugador"); setRank(""); }} style={{ marginLeft: 10 }}>
        Rankeds Multijugador
      </button>

      {/* RANGOS */}
      {service && (
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

      {/* PRECIO */}
      {price > 0 && (
        <div style={{ marginTop: 30 }}>
          <h2>💰 Precio: {price}€</h2>

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
          <p>Servicio: {service}</p>
          <p>Rango: {rank}</p>
          <p>Total: {price}€</p>
          <p>Te contactaremos por Discord</p>
        </div>
      )}
    </div>
  );
}
