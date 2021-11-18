import './AdProduto.css'
import React, { Component } from 'react'
import Button from '../Button/Button' 

let produtoInfo = {
  semSopaCheck: false,
  checkZerar: false
}


export default class AdProduto extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
        ...produtoInfo
     }
    /* this.saveSemSopa = this.saveSemSopa.bind(this) */
    this.saveProduto = this.saveProduto.bind(this)
    this.retroceder = this.retroceder.bind(this)
    this.returnQuantity = this.returnQuantity.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    let item = this.props.item
    if (this.props.reset !== prevProps.reset && this.state[item]) {
      this.setState({[item]: null})
      
      produtoInfo[item] = null 
    }
  }

  zerarValor = () => {
    if (this.props.reset === true) { 
      for (let key in this.state) {
        delete this.state[key]
     };
     this.setState({...produtoInfo}) }
  
  }

  saveProduto(valor) { 
    let item = this.props.item 
    
      if (produtoInfo[`${item}`]) {
          let quantidade = produtoInfo[item]
          quantidade++
          produtoInfo[item] = quantidade
      } else { produtoInfo[item] = 1 }


    
     
    this.setState({[item]: produtoInfo[item]})
    let produto = produtoInfo
    let produtoKey = item 
    console.log('added' , this.state , produto[item] , produtoKey, produto)
    this.props.getProduto(produto, produtoKey)
     
};


 
retroceder(valor) {
    let nextSib =  valor.target.nextSibling.innerHTML  
    let prevSib = null
    let propEstado = null 
    
    if (prevSib === null) {propEstado = nextSib}
    else {propEstado = `${prevSib}SemSopa`}
    
    let quantidade = this.state[propEstado]
    if(!quantidade){quantidade = 0};
    produtoInfo[propEstado] = quantidade - 1
         
    this.setState( {[propEstado] : produtoInfo[propEstado]} )
    
    let produto = produtoInfo
    let produtoKey = propEstado 

    
    console.log('added' , this.state , produto[produtoKey] , produtoKey)
    
    this.props.getProduto(produto, produtoKey)

    };

    returnQuantity() {
        let content = ' '
        let item = this.props.item
        if (this.state.semSopaCheck === false){return <div className="mostrador"><span>{this.state[item]}{content}</span></div>   }
        else {return <div className="mostrador"><span>{this.state.semSopaCheck}{content}</span></div>}
    }


 

 render() { 
      
      let item = this.props.item
 
      let flex3 ={
        flex: '3'
      }
      return ( 
        <>
        <Button btnFunction={this.retroceder}>↵</Button>
        <Button style={flex3} btnFunction={this.saveProduto}>{item}</Button>
        {this.returnQuantity()}
        </> )
 }



} //fim


    