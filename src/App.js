import React, { useEffect, useState } from 'react';
import api from './services/api'

import './global.css'
import './App.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'
import DevFormUpdate from './components/devFormUpdate'

function App() {
  const [devs, setDevs] = useState([])
  const [devId, setDevId] = useState('')
  const [alterar, setAlterar] = useState(false)

  useEffect(() => {
    loadDev()
  }, [])

  async function loadDev() {
    //buscar todos os devs
    const response = await api.get('/devs')
    setDevs(response.data)
  }

  async function handleAddDev(data) {

    const response = await api.post('/devs', data)

    //setando novo dev cadastrado
    setDevs([...devs, response.data])

  }

  async function handleDeleteDev(id) {
    await api.delete(`/devs/${id}`)
    loadDev()
  }



  function handleShow(show, id) {
    setAlterar(show)
    setDevId(id)
  }

  async function handleUpdateDev(data) {
    const { name, bio, techs, latitude, longitude } = data

    await api.put(`/devs/${devId}`, {
      name, bio, techs, latitude, longitude
    })

    loadDev()
  }

  return (
    <div id="app">

      {alterar === false ? (
        <aside >
          <strong >Cadastrar</strong>
          <DevForm onSubmit={handleAddDev} />
        </aside>

      ) : (<aside >
        <strong >Alterar</strong>
        <DevFormUpdate onSubmit={handleUpdateDev} onShow={handleShow} idDev={devId} />
      </aside>)}

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onClick={handleDeleteDev} onShow={handleShow} />
          ))}
        </ul>
      </main>

    </div>
  );
}

export default App;
