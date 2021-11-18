import './Zona.css'
import React, { Component } from 'react' 

export default class Zona extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            nome: this.props.zona.nome,
            mesas: this.props.zona.mesas
        }
      } 
    
      getMesasZonas(){   
            this.displayMesasZonas(this.state.mesas, this.state.nome )  

      }

      displayMesasZonas(arrayMesas, respNome){
            
            let mesas = []
            arrayMesas.forEach(i => {
                mesas.push(i)
            })
            this.props.renderMesas(mesas, respNome)
      } 

   

    render(){ 
        return ( 
        <button className="zona-display" onClick={e => this.getMesasZonas(e)}>{this.state.nome}</button>
         )
    }
    

    }