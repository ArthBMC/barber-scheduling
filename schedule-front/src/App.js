import { useEffect, useState } from 'react';

function App() {
  const [servicos, setServicos] = useState([]);

useEffect(() => {
    fetch("http://localhost:8080/services")
      .then(response => response.json())
      .then(data => {
        setServicos(data); 
      })
      .catch(err => console.error("Erro ao buscar:", err));
}, []);

  return (
    <div>
      <h1>Serviços da Barbearia</h1>
      <ul>
        {servicos.map(s => (
          <li key={s.id}>{s.name} - R$ {s.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
