import React from 'react'


import './style.css'

function DevItem({ dev, onClick, onShow }) {

    function handleSubmit(e) {
        e.preventDefault()

        onClick(dev._id)

    }

    function handleUpdate(e, id) {
        e.preventDefault()
        onShow(true, id)

    }

    return (
        <li className="dev-item" >
            <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
                <div className="button-excluir">
                    <button type='button' onClick={handleSubmit}>Excluir</button>
                </div>
            </header>
            <p>{dev.bio}</p>
            <div className="items-a">
                <a href={`https://github.com/${dev.github_username}`}>Acessar perfil do Github</a>

                <a onClick={e => handleUpdate(e, dev._id)}>Editar Perfil</a>
            </div>
        </li >
    )
}

export default DevItem