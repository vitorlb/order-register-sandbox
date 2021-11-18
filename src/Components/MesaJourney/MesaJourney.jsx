import './MesaJourney.css'
import React, { Component } from 'react'
import AdProduto from '../AdProduto/AdProduto'
import ListaBebidas from '../ListaBebidas/ListaBebidas' 
import ListaComidas from '../ListaComidas/ListaComidas'  
import ListaCafetaria from '../ListaCafetaria/ListaCafetaria'  
import ListaPm from '../ListaPm/ListaPm'
import Button from '../Button/Button'

let carrinho = { }




export default class MesaJourney extends Component{
    constructor(props) {
       super(props)
       this.myRef = React.createRef();
       this.state = {
           ...carrinho,
           reset: false
        }
       this.getProduto = this.getProduto.bind(this)
       this.saveMesa = this.saveMesa.bind(this)
     }

     getProduto(produto, produtoKey) {

         carrinho[produtoKey] =  produto[produtoKey]
         this.setState({[produtoKey]: produto[produtoKey]})
     }

     refPass = () => {this.addProduto.current.zerarValor()}

     saveMesa() {
        
        if(this.props.mesa !== null){
         let mesa = carrinho 

         Object.keys(mesa).map(function(key, index) {
            if(mesa[key] === 0) {
               console.log('ZEROOOOO')
               delete mesa[key]
               console.log(mesa)
            };
          });
         
         let reset = this.state.reset
         reset = !reset 
         this.props.getMesaData(mesa) 
         for (let key in this.state) {
            if (key !== reset) {
            delete this.state[key]
            }
         }
         this.setState({ reset })
         carrinho = {  }
         this.props.mesaUnCheck()
       
        }
        else alert('escolha uma mesa')
         
        }


     hitRender = () => { 
        this.render()
        }

     hideShow = (elem) => {
        let nextSib =  elem.target.nextSibling 
        nextSib.style.display !== 'none' ? nextSib.style.display = 'none' : nextSib.style.display = 'block'
        }
      
      hideShowOwn = (elem) => {
         let parentElem =  elem.target.parentElement 
         parentElem.style.display !== 'none' ? parentElem.style.display = 'none' : parentElem.style.display = 'block'
         }


     render() {

         const divStyle = {
            display: 'none' 
         };

         return ( 
            <>
            <div className="prato-dia-wrapper"> 
                    
                    <div className="header-categoria" onClick={this.hideShow}>Pratos Dia</div>
                    <div>
                    <ListaComidas reset={this.state.reset} getProduto={this.getProduto}></ListaComidas>
                    </div>
                    
                    
                    <div className="header-categoria" onClick={this.hideShow}>Bebida</div>
                    <div style={divStyle}>
                    <ListaBebidas reset={this.state.reset} getProduto={this.getProduto} ></ListaBebidas>
                    <div className="header-categoria fechar-aba" onClick={this.hideShowOwn}>Fechar Bebidas ✕</div>
                    </div> 

                    <div className="header-categoria" onClick={this.hideShow}>Pães Montados</div>
                    <div style={divStyle}>
                    <ListaPm reset={this.state.reset} getProduto={this.getProduto}></ListaPm>
                    </div>

                    <div className="header-categoria" onClick={this.hideShow}>Cafetaria</div>
                    <div style={divStyle}>
                    <ListaCafetaria reset={this.state.reset} getProduto={this.getProduto} ></ListaCafetaria>
                    </div>
                    


            </div>
             
            
            </>
            
            )
     }  //fim


    }