import './Wrapper.css'
import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'

import Routes from './Routes' 
import Header from './Header' 
import NavButton from '../Button/NavButton'

const initialState = {
    dia: {
        data: 'obter data',
        pedidos: []
    },
    botaoGravarDia: false
} 

export default class Wrapper extends Component{
    constructor(props) {
        super(props)
        this.state = {...initialState} 
      } 
    

    render() {

        return(
            <HashRouter>
            <main className="App-header">
                <div className="wrapper">
                {/* <Header state={this.state}></Header>  */}
                <nav>
                <NavButton link="/pedidos" customProps={undefined}>Novo Pedido</NavButton>
                <NavButton link="/historico">Historico Pedidos</NavButton>
                </nav> 
                <Routes></Routes>
                </div>
            
            </main>
            </HashRouter>
        )
    }
}