import React, { useState, useEffect } from 'react'

import './style.css'

function DevForm({ onSubmit }) {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [github_username, setGithub_username] = useState('')
    const [techs, setTechs] = useState('')

    useEffect(() => {
        //pegar localização do usuario
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setLatitude(latitude)
                setLongitude(longitude)
            },
            (err) => {
                console.log(err)
            }, {
            timeout: 30000
        }
        )
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        })

        setGithub_username('')
        setTechs('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuario do Github</label>
                <input name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={e => setGithub_username(e.target.value)} />
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

            <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm