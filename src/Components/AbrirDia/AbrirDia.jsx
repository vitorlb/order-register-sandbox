import './AbrirDia.css'
import React, { Component } from 'react'


export default class AbrirDia extends Component {
    constructor(props) {
        super(props)
        this.state = {
            botaoGravarDia: this.props.state.botaoGravarDia
        }
      }


diaDeHoje() {
    var dia = this.props.state.dia
    var data = this.getDataDeHoje()
    dia.data = data
    console.log(dia)
    this.setState( { dia } )
    this.setState({botaoGravarDia: true})
    this.botaoGravarDia()
}  

getDataDeHoje() {
    var hoje = new Date()
    var dd = String(hoje.getDate()).padStart(2, '0');
    var mm = String(hoje.getMonth()).padStart(2, '0');
    var yyyy = hoje.getFullYear();
    var final = `${dd} / ${mm} / ${yyyy}` 

    return( final )
}

botaoGravarDia() {
    if (this.state.botaoGravarDia === true){
    return <button type="button" className="btn btn-outline-success" onClick={e => this.props.salvarDia(e)}> ✓ </button>
}
    else {return}
}


    
render() {

    return(
        <div>
            <button type="button" className="btn btn-outline-danger" onClick={e => this.diaDeHoje(e)}>Abrir Dia </button>
            <div ><p>{this.props.state.dia.data}  {this.botaoGravarDia()}</p></div>
        </div>
    )
}
}