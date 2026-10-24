import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import "./style.css";

/* ===== EDITE SOMENTE ESTES DADOS ===== */
const convite = {
  nome: "Seu Nome",
  data: "31/12/2026",
  horario: "20:00",
  local: "Nome do Local",
  endereco: "Endereço do evento",
  mapa: "https://www.google.com/maps",
  whatsapp: "5500000000000",
  dataContador: "2026-12-31T20:00:00"
};

function App() {
  const [aberto, setAberto] = useState(false);
  const [tempo, setTempo] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const atualizar = () => {
      let restante = Math.max(0, new Date(convite.dataContador) - new Date());
      const d = Math.floor(restante / 86400000);
      restante %= 86400000;
      const h = Math.floor(restante / 3600000);
      restante %= 3600000;
      const m = Math.floor(restante / 60000);
      restante %= 60000;
      const s = Math.floor(restante / 1000);
      setTempo({ d, h, m, s });
    };
    atualizar();
    const id = setInterval(atualizar, 1000);
    return () => clearInterval(id);
  }, []);

  const confirmar = `https://wa.me/${convite.whatsapp}?text=${encodeURIComponent(
    "Olá! Quero confirmar minha presença no evento."
  )}`;

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {!aberto ? (
          <motion.div
            className="capa"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="cartao"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="mini">Você está convidado</p>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {convite.nome}
              </motion.h1>
              <div className="linha" />
              <p>Um momento especial merece ser celebrado com pessoas especiais.</p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setAberto(true)}
              >
                Abrir convite
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.main
            className="convite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <section className="hero">
              <motion.p
                className="mini"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Save the date
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {convite.nome}
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                Minha celebração
              </motion.h2>
              <div className="linha" />
              <p>Será um prazer ter você comigo nesse momento especial.</p>
            </section>

            <section className="info">
              <p className="mini">Detalhes do evento</p>
              <h2>Quando e onde</h2>

              <div className="grid">
                <Info icon="📅" titulo="Data" valor={convite.data} />
                <Info icon="🕐" titulo="Horário" valor={convite.horario} />
                <Info
                  wide
                  icon="📍"
                  titulo="Local"
                  valor={`${convite.local} — ${convite.endereco}`}
                />
              </div>

              <a className="botao" href={convite.mapa} target="_blank">
                Ver localização
              </a>
            </section>

            <section className="contador">
              <p className="mini">Contagem regressiva</p>
              <h2>Falta pouco!</h2>

              <div className="tempo">
                {[
                  ["d", "dias"],
                  ["h", "horas"],
                  ["m", "min"],
                  ["s", "seg"]
                ].map(([chave, nome]) => (
                  <div className="caixa" key={chave}>
                    <strong>{String(tempo[chave]).padStart(2, "0")}</strong>
                    <small>{nome}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className="confirmacao">
              <p className="mini">Confirme sua presença</p>
              <h2>Espero você!</h2>
              <p>Clique abaixo para confirmar sua presença pelo WhatsApp.</p>
              <a className="botao" href={confirmar} target="_blank">
                Confirmar presença
              </a>
            </section>

            <footer>Com carinho, {convite.nome} ♡</footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

function Info({ icon, titulo, valor, wide }) {
  return (
    <motion.div
      className={`infoBox ${wide ? "wide" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="icon">{icon}</div>
      <b>{titulo}</b>
      <span>{valor}</span>
    </motion.div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
