// src/App.jsx
import { useEffect, useState } from "react";
import { api } from "../api";
import "./App.css"; // Importamos o CSS que acabamos de criar

function App() {
  // 1. Variavel para guardar a LISTA de serviços (começa vazia: [])
  const [servicos, setServicos] = useState([]);

  // 2. Variavel para controlar mensagens de carregamento ou erro na tela
  const [mensagem, setMensagem] = useState(
    "Carregando serviços da barbearia...",
  );

  useEffect(() => {
    // Fazemos a requisição para o Spring Boot
    api
      .get("/services")
      .then((response) => {
        // Sucesso! Guardamos a lista real (Array) na nossa variável 'servicos'
        setServicos(response.data);
        // Limpamos a mensagem de "Carregando" pois os dados já chegaram
        setMensagem("");
      })
      .catch((error) => {
        console.error("Ops, deu erro:", error);
        setMensagem(
          "Não foi possível carregar os serviços. Tente novamente mais tarde.",
        );
      });
  }, []);

  return (
    <div className="container">
      <h1>Nossos Serviços ✂️</h1>

      {/* Se existir algum texto na variável 'mensagem', ele exibe aqui */}
      {mensagem && <p>{mensagem}</p>}

      {/* Container que segura todos os cards */}
      <div className="grid-cards">
        {/* 
          A MÁGICA DO REACT: O .map()
          Ele percorre a lista 'servicos'. Para cada item, ele cria a estrutura HTML abaixo.
          A propriedade 'key' é obrigatória no React para listas, ajuda na performance.
        */}
        {servicos.map((servico) => (
          <div key={servico.id} className="card">
            {/* Puxando as propriedades exatas do seu banco de dados */}
            <h2>{servico.name}</h2>
            <p className="descricao">{servico.description}</p>

            <div className="detalhes">
              <span className="preco">R$ {servico.price},00</span>
              <span className="duracao">⏱️ {servico.duration} min</span>
            </div>

            <button className="btn-agendar">Agendar Horário</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
