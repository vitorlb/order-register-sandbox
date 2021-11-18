import './Pedidos.css'
import React, { Component } from 'react'
import Zona from '../Zona/Zona'
import Button from '../Button/Button'
import Mesa from '../Mesa/Mesa'
import MesaJourney from '../MesaJourney/MesaJourney' 
import firebase from '../../utils/firebase'
import mesaInfo from '../../utils/mesasInfo'


const initialState =  { 
    id: 0, 
    conteudo: null, 
    mesa:null,
    mesas: [],
    zona: '',
    cor: 0,
    pedidoAlterado: false,
    podeDescer: false,
    descricao: ''
} 

let mesaCheck = false

export default class Wrapper extends Component{
     constructor(props) {
         
        super(props)
        this.state = { ...initialState }
        this.renderMesas = this.renderMesas.bind(this)
        this.escolherMesa = this.escolherMesa.bind(this)
        this.getMesaData = this.getMesaData.bind(this)
        this.mesaUnCheck = this.mesaUnCheck.bind(this)
        this.saveMesa = this.saveMesa.bind(this) 
        this.mesaJourneyRef = React.createRef()
      }

      componentDidMount() { 
          if (this.props.location.myCustomProps !== undefined) {
              let updateContent = this.props.location.myCustomProps
              updateContent.pedidoAlterado = true 
              let {id, conteudo, mesa, zona, cor, pedidoAlterado, podeDescer, idCode, descricao} = updateContent
              this.setState( { id, conteudo, mesa, zona, cor, pedidoAlterado, podeDescer, idCode, descricao } ) 
              this.mesaCheck()
          }
      }

      getMesaData(data) {
          let {id, conteudo, mesa, zona, cor, pedidoAlterado, podeDescer, idCode, descricao} = this.state 
          let prevContent = this.props.location.myCustomProps ? this.props.location.myCustomProps.conteudo : null
          conteudo = data 
          if (prevContent !== null) {
            for(let key in conteudo ) {
                if(prevContent.hasOwnProperty(key)) {
                    let soma = conteudo[key] + prevContent[key] 
                    conteudo[key] = soma 
            }
            }
            conteudo = {...prevContent, ...conteudo} 
          }
          let mesaLength = Object.keys(conteudo).length  
          
          if (mesa && mesaLength > 0){
            
            this.setState({ conteudo, id })
            let novoPedido = true
            let postPedido = { mesa, conteudo , zona, cor, novoPedido, pedidoAlterado, podeDescer, descricao}
            
            
             
            if (pedidoAlterado){   
                const dbRef = firebase.database().ref('Pedidos').child(idCode)
                dbRef.update({ mesa, conteudo , zona, cor, novoPedido, pedidoAlterado, podeDescer, descricao}).then(alert(`mesa ${mesa} alterada`), window.location.reload()) 
                this.props.location.myCustomProps = null 
                this.setState({pedidoAlterado: false})                

            } else{

                let dt = new Date(); 
                
                postPedido.regDate = `${
                    (dt.getMonth()+1).toString().padStart(2, '0')}/${
                    dt.getDate().toString().padStart(2, '0')}/${
                    dt.getFullYear().toString().padStart(4, '0')} ${
                    dt.getHours().toString().padStart(2, '0')}:${
                    dt.getMinutes().toString().padStart(2, '0')}:${
                    dt.getSeconds().toString().padStart(2, '0')}`    

                const dbRef = firebase.database().ref('Pedidos')
                console.log('poooooooooooost ->' , postPedido)
                dbRef.push(postPedido).then(alert(`mesa ${mesa} guardada`)) 
            } 
            this.setState( {...initialState, id} ) 
            }
            else {
                if(!mesa){alert('escolha uma mesa')}
                if(mesa && mesaLength === 0){alert('mesa sem produtos')}
            }
          }
        



      escolherMesa(valor){
        if(this.state.mesa === null || mesaCheck === false){
        let mesa = this.state.mesa
        let numeroMesa = valor.target.value
        mesa = numeroMesa
        this.setState({ mesa }, () => console.log('mesa' , mesa, this.state)) }
        else{
            console.log('aberta mesa' , this.state.mesa)
        }
        };


        saveMesa() {
            this.mesaJourneyRef.current.saveMesa()
        }

        mesaCheck() {
            mesaCheck = true 
        }

        mesaUnCheckAtConfirm()  {
            mesaCheck = false  
        }

        mesaUnCheck()  {
            mesaCheck = false 
            this.setState({...this.state, mesa: null})
        }

        hideShow = (elem) => {
            let nextSib =  elem.target.nextSibling
            console.log (nextSib)
            nextSib.style.display !== 'none' ? nextSib.style.display = 'none' : nextSib.style.display = 'block' 
            

        }

        noteRegister(e){
            console.log('keyUp' , e.target.value)
            this.setState({descricao: e.target.value})
        }

      renderMesas(mesas, nome) { this.setState({zona: nome, mesas}) }

     // getPedidoJourney(pedido)

      pintaMesas() {
          let mesas = this.state.mesas 
          if (mesas.length === 0) { } else{
          return (
              <div className="lista-mesas">
                  {mesas.map((mesa, index) => { return <Mesa btnFunction={this.escolherMesa} nome={mesa} key={index}></Mesa>})}
                  
                  {/* <div className="confirmar-mesa">
                      <Button className="confirm" btnFunction={this.mesaCheck} >Confirmar</Button>
                      <Button className="unConfirm" btnFunction={this.mesaUnCheckAtConfirm} >Trocar Mesa</Button>
                      </div> */}
              </div>
          )} };

     
      
     

      render() {

        return(
                <>
              
                
               <div className="novo-pedido-wrapper">
                <section className="mesa-journey-section">
                    <h4> </h4>
                    <MesaJourney ref={this.mesaJourneyRef} mesaUnCheck={this.mesaUnCheck} mesa={this.state.mesa} getMesaData={this.getMesaData}></ MesaJourney>
                </section>
                {/* <input placeholder="notas"  onKeyUp={e => this.noteRegister(e)}></input> */}
                 <section className="zonas">
                 <div className="sem-mesa"><Mesa btnFunction={this.escolherMesa} nome={'Sem Mesa'}></Mesa></div>
               <Zona renderMesas={this.renderMesas} zona={mesaInfo.balcao}id="1"> </Zona>
               <Zona renderMesas={this.renderMesas} zona={mesaInfo.esplanada} id="2"> </Zona>
               <Zona renderMesas={this.renderMesas} zona={mesaInfo.galeria} id="3"> </Zona>
               <Zona renderMesas={this.renderMesas} zona={mesaInfo.marquize} id="4"> </Zona> 
               
               <div className="display-mesas">
               
                    {this.pintaMesas()}
                    
                    <p>{this.state.zona} - {this.state.mesa}</p>
                </div>
                <Button btnFunction={this.saveMesa}>Salvar Mesa</Button>
               </section>
               <section>
                   <div>
                    
                    </div>
                    
                </section>
                </div>
                

                
                </>
        )
    }


    }

        
    
    

   
