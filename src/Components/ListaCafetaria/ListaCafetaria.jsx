import React, { Component } from 'react'
import AdProduto from '../AdProduto/AdProduto'



export default class ListaComidas extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      reset: this.props.reset
    }
    this.getProduto = this.props.getProduto
    
  }
  componentDidUpdate(prevProps, prevState) {
    let item = this.props.item
    if (this.props.reset !== prevProps.reset ) {
      this.setState({ reset: true } )
      
    }
  }

  render() {  
      let arrayComidas =  [ 'Café', 'Café Cheio', 'Café Curto', 'Pingo', 'Abatanado', '1/2 leite', 'Galão' ] 
    return arrayComidas.map((item, index) => {

      return <><div key={index} className={`produto comida ${item}`} > <AdProduto reset={this.props.reset}  getProduto={this.getProduto} item={item} /> </div></>

    })
  }
}