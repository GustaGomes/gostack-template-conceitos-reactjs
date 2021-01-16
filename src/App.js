import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [ repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    })
  }, []); 

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:'Gustavo Gomes',
      url:'https://github.com/GustaGomes/gostack-template-conceitos-reactjs',
      techs: ['Node.js', 'ReactJS']
    })

    setRepositories([ ... repositories, response.data ]);
    // assim eu vou copiar todos os  'repositories' que eu ja tenho e adiciono ele no final do array de repositorios 'response.data'
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
              <li key={repository.id}>
              {repository.title}
    
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
