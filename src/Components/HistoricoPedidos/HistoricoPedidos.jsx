import React, { Component } from 'react' 
import { Howl, Howler } from 'howler'
import './HistoricoPedidos.css'
import NavButton from '../Button/NavButton' 
import firebase from '../../utils/firebase'
import MesaData from './MesaData'

import DingSound from '../../Assets/ding.mp3'
import DingSound2 from '../../Assets/ding2.wav'

const arrayColor = ['mesaData vermelho', 'mesaData amarelo', 'mesaData verde']
const dingSound = {sound: DingSound}


export default class HistoricoPedidos extends Component {
    state = {
      pedidos: [],
      pedidosFirebase: [],
      podeDescerCount: 0,
      reset: false,
      playNovoPedido: true,
      playPedidoAlt: true,
      numeroPedidos: 0,
      numeroPedidosNovos: 0
    }
  
    componentDidMount() {
     this.onFirebase() 
     this.timer = setInterval(
      () => { 
        this.onFirebase()
        let pedidosNovos = [];
        let podeDescerCounter = [];   
        let mesas = document.getElementsByClassName('dataMesas')[0].children 
        for (const elem of mesas) {
          for(const classElem of elem.classList) {
            if (classElem === 'novo-pedido' || classElem === 'pedido-alterado') {pedidosNovos.push(classElem)} 
          };
          for(const classElem of elem.classList) {
            if (classElem === 'pode-descer') {
              podeDescerCounter.push(classElem)
            } 
          }
        } 
        if (pedidosNovos.length !== this.state.numeroPedidosNovos) {
          if (pedidosNovos.length > this.state.numeroPedidosNovos){
            this.setState({playNovoPedido: true})
          }
          this.setState({numeroPedidosNovos: pedidosNovos.length})
        }
        if (pedidosNovos.length > 0 && this.state.playNovoPedido) { 
          this.dingSound(DingSound)
          this.setState({playNovoPedido: false}) 
        } 
         
        if (pedidosNovos.length === 0) {
          this.setState({playNovoPedido: true}) 
        }

        if(podeDescerCounter.length !== 0  && podeDescerCounter.length > this.state.podeDescerCount) {
          this.dingSound(DingSound2)
          this.setState({podeDescerCount: podeDescerCounter.length})
        }
         
      },
      5000,
    );
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    } 

    onFirebase = () => {
      const dbRef = firebase.database().ref('Pedidos')
      let dbData = {}
      dbRef.on('value',(snapshot) => {
        dbData = snapshot.val()
        let arrPedidos = []
        for (let pedido in dbData) {
          dbData[pedido].idCode = pedido  

          if(!dbData[pedido].pago){
            arrPedidos.push(dbData[pedido])
          }
        }
        this.setState({ pedidosFirebase: arrPedidos })
      }) 
    } 
 
    dingSound = (src) => {
      const sound = new Howl({
        src,
        loop: false
      })
      sound.play() 
    } 

    keyValues = (obj) => { 

      let arrValues = []
      for (let key in obj) {
        arrValues.push(`${key} : ${obj[key]}` )
      } 
      return arrValues.map(keyValue => {
        return (<p>{keyValue}</p>)
      })
    }


    esconderMesa = (idCode) => { 
      const pedidoRef = firebase.database().ref('Pedidos').child(idCode) 
      pedidoRef.update({
        pago: true
      });
  }

  pedidoVerificado = (novoPedidoVal, pedidoAlteradoVal, idCode, podeDescerVal) => { 
    const pedidoRef = firebase.database().ref('Pedidos').child(idCode)
     
    if(novoPedidoVal){ 
      pedidoRef.update({
        novoPedido: false
      })
    }  
    if(pedidoAlteradoVal){ 
      pedidoRef.update({
        pedidoAlterado: false
      })
    }
      
    if(podeDescerVal){ 
      pedidoRef.update({
        podeDescer: false
      });
      console.log(this.state.podeDescerCount)
      let newCount = this.state.podeDescerCount - 1
      this.setState({podeDescerCount: newCount}, () => {console.log(this.state.podeDescerCount)}) 
    } 
  }

  trocarCor = (e, cor, idCode) => { 
    
    const pedidoRef = firebase.database().ref('Pedidos').child(idCode) 

    let colorCounter = cor
    let mesaDiv = e.target.parentElement.parentElement
    colorCounter++
    
    if(colorCounter === 3){colorCounter = 0} 
    mesaDiv.setAttribute('class', arrayColor[colorCounter]) 
    pedidoRef.update({
      cor: colorCounter
    }) 
}

podeDescer = (e, podeDescer, idCode) => { 
    
  const pedidoRef = firebase.database().ref('Pedidos').child(idCode) 
  pedidoRef.update({
    podeDescer: true
  }) 

  let mesaDiv = e.target.parentElement.parentElement
  mesaDiv.setAttribute('class', 'pode-descer') 
 
  this.dingSound(DingSound2)
}

renderMesas = () => {  

      
  return (

     <>
          {this.state.pedidosFirebase.map((pedido , i) => {   
           let mesaString = pedido.mesa === 'Sem Mesa' ? ' ' : 'Mesa' 
           let novoPedido = pedido.novoPedido ? ' novo-pedido' : ' '
           let pedidoAlterado = pedido.pedidoAlterado ? ' pedido-alterado' : ' '
           let podeDescer = pedido.podeDescer ? 'pode-descer' : ' '
          return (
            <div onClick={ e => this.pedidoVerificado(pedido.novoPedido, pedido.pedidoAlterado, pedido.idCode, pedido.podeDescer)} key={i} id={pedido.id} className={arrayColor[pedido.cor]+novoPedido+pedidoAlterado+podeDescer} > 
              <div onClick={ e => this.pedidoVerificado(pedido.novoPedido, pedido.pedidoAlterado, pedido.idCode, pedido.podeDescer)} className="titulo"> 
                {mesaString} {pedido.mesa}
              
                <NavButton link="/pedidos" customProps={pedido}>
                  <span class="edit-button"> ✎ </span> 
                </NavButton> 
              </div>
              <hr />
              <div onClick={ e => this.pedidoVerificado(pedido.novoPedido, pedido.pedidoAlterado, pedido.idCode)} className="conteudo">
              {this.keyValues(pedido.conteudo)}
              
              </div>
             <div className="void"><p></p></div>
             <div className="button-container">
              <button onClick={ () => this.esconderMesa(pedido.idCode)}>X</button>
              <button onClick={ e => this.trocarCor(e, pedido.cor, pedido.idCode)}>Cor</button>  
              </div>
              <div className="button-container">
              <button onClick={ e => this.podeDescer(e, pedido.podeDescer, pedido.idCode)}>Pode Descer</button>
              </div>
          </div>)
      })}  

      </>
    ) } 



  
    render() {
      Howler.volume(1.0) 
      return (
          <>
           <div className="dataMesas"> 
           {this.renderMesas()}  
          </div>
            
          </>
      )
    }
  }

  //fim


