import React, { useState, useEffect } from 'react';

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// JSX => Java Script + XML (Sintaxe do HTM)

// Componente -> Função que retorna conteúdo HTML, CSS, ou conteúdo JS para interface.
// Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação.

// Propriedade -> Atributos para componentes HTML.
// Informações que um componente PAI(App()) passa para o componente FILHO(<h1> </h1>)

// Estado -> Uma informação Mantida, Lida e Atualizada pelo componente.
// Informações mantidas pelo componente.
// Imutabilidade -> Nunca altera um dado, e sim, cria um novo dado a partir do 
// valor antigo.

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm  onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem  key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
