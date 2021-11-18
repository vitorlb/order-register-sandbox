import React, { Component } from 'react'
import AdProduto from '../AdProduto/AdProduto'



export default class ListaPm extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      reset: this.props.reset
    }
    this.getProduto = this.props.getProduto
    
  }
  componentDidUpdate(prevProps, prevState) { 
    if (this.props.reset !== prevProps.reset ) {
      this.setState({ reset: true } )
      
    }
  }

  render() {  
      let arrayComidas =  [ '🍅 PM Tomate', '🍄 PM Cogumelos', '🥓 PM Presunto', '🐟 PM Atum' ] 
    return arrayComidas.map((item, index) => {

      return <><div key={index} className={`produto comida ${item}`} > <AdProduto reset={this.props.reset}  getProduto={this.getProduto} item={item} /> </div></>

    })
  }
}