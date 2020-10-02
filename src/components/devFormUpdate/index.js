import React, { useState, useEffect } from 'react'
import api from '../../services/api'

import './style.css'



function DevFormUpdate({ onSubmit, onShow, idDev }) {
    const [id, setId] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [name, setname] = useState('')
    const [bio, setBio] = useState('')
    const [techs, setTechs] = useState('')

    useEffect(() => {
        //pegar indo do usuario
        async function loadDev() {
            setId(idDev)
            const response = await api.get(`/devs/${idDev}`)
            const { name, bio, techs, location: { coordinates } } = response.data

            setname(name)
            setBio(bio)
            setTechs(techs)
            setLatitude(coordinates[1])
            setLongitude(coordinates[0])

        }
        setname('')
        setBio('')
        setTechs('')
        setLatitude('')
        setLongitude('')
        loadDev()
        // eslint-disable-next-line
    }, [idDev])

    async function handleSubmit(e) {
        e.preventDefault()

        await onSubmit({
            name,
            bio,
            techs,
            longitude,
            latitude
        })

    }

    async function handleCancelar() {
        onShow(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="name">Nome</label>
                <input name="name"
                    id="name"
                    required
                    value={name}
                    onChange={e => setname(e.target.value)} />
            </div>
            <div className="input-block">
                <label htmlFor="bio">Bio</label>
                <input name="bio"
                    id="bio"
                    required
                    value={bio}
                    onChange={e => setBio(e.target.value)} />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)} />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="Number"
                        name="latitude"
                        id="latitude"
                        required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)} />
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input type="Number"
                        name="longitude"
                        id="longitude"
                        required
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)} />
                </div>
            </div>

            <button type="submit">Salvar Alterações</button>
            <div className="cancelar">
                <a onClick={handleCancelar}>Cancelar</a>
            </div>
        </form>
    )
}

export default DevFormUpdate