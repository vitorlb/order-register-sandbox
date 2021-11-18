import './Header.css'
import React, { Component } from 'react'

export default class Header extends Component{
    
    renderText = () => {
        if (this.props.state.botaoGravarDia === true) {
        return this.props.state.dia.data
        } else {return 'Duas de Letra'}
    }

    alert = () => {console.log(this.props.state)}
   
    render() {

        return(
            <header > 
                <span>Duas De Letra</span>
            </header>
        )
    }
}