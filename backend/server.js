const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/order", async (req, res) => {
  try {
    const { customerName, discordUser, notes, service, price } = req.body;

    // Validación básica
    if (!customerName || !discordUser || !service || !price) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const webhookURL = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookURL) {
      return res.status(500).json({ error: "Webhook no configurado" });
    }

    // Mensaje para Discord
    const payload = {
      content: "🛒 Nuevo pedido recibido",
      embeds: [
        {
          title: "FAST BOOST - Pedido nuevo",
          color: 5814783,
          fields: [
            {
              name: "👤 Cliente",
              value: String(customerName),
              inline: true
            },
            {
              name: "🎮 Discord",
              value: String(discordUser),
              inline: true
            },
            {
              name: "📦 Servicio",
              value: String(service),
              inline: false
            },
            {
              name: "💰 Precio",
              value: `${price}€`,
              inline: true
            },
            {
              name: "📝 Notas",
              value: notes?.trim() ? String(notes) : "Sin notas",
              inline: false
            }
          ],
          footer: {
            text: "Pedido automático desde la web"
          },
          timestamp: new Date().toISOString()
        }
      ]
    };

    // Enviar a Discord
    const discordResponse = await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!discordResponse.ok) {
      return res.status(500).json({ error: "Error al enviar a Discord" });
    }

    return res.json({ ok: true, message: "Pedido enviado correctamente" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});