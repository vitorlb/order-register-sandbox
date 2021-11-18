import React, { Component } from 'react'
import AdProduto from '../AdProduto/AdProduto'



export default class ListaBebidas extends Component {
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
      let arrayBebidas =  [ '🌡️ cháQuente', '🥃 cháFrio', '🍋 limonada', '🗿🗿🗿 pedras', '🍷 CVT', '🍸 CVB', '🍺 fino', '🧴 super', '🌊 agua', '⛄ aguaFria' , '🌴🍑 maracujá', '🩸 groselha', 'outro' ] 
    return arrayBebidas.map((item, index) => {

      return <><div key={index} className={`produto bebida ${item}`} > <AdProduto reset={this.props.reset}  getProduto={this.getProduto} item={item} /> </div></>

    })
  }
}