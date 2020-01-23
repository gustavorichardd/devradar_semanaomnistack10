// COMPONETE
// Criamos um componente quando não vai interferir no restante do sistema
// É uma função que retorna algum conteúdo HTML 
// (pode retornar CSS também ou até um JS em questão 
// de interface)
// E não pode interferir no restante da aplicação

// PROPRIEDADE
// semelhante aos atributos do HTML, são informações tipo "title" que a gente dava para um elemento
// Informações que um componente PAI passa para o componente FILHO
// Pode passar não só string,pode passar até outra função

// ESTADO
// informações mantidas pelo componente
// o estado tu não pode simplesmente alterar uma variável, você vai ter de usar a função que o useState vai te dar para criar uma nova variável para substituir a anterior (imutabilidade)

import React, { useState, useEffect } from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import api from './services/api'
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

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
    <div id='app'>
      
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
        
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App;
