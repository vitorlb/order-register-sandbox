import './Mesa.css'
import React from 'react'

export default props => 
    <div className="mesa">
        <button value={props.nome} onClick={e => props.btnFunction(e)} className="mesa-btn">
            {props.nome}
        </button>
    </div>