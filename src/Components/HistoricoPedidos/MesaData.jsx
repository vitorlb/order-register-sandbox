import './MesaData.css'
import React, { Component } from 'react' 


export default class MesaData extends Component {
 
 render() { 
      const { children } = this.props; 
    return (
      <div className={'mesaData'} key={this.props.sendKey} id={this.props.pedidoId} >
            {children} 
      </div>
      
    )
  }
}

