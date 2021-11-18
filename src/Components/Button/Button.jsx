import React, { Component } from 'react'

export default class Button extends Component {
  render() {
      const { btnFunction, children, className, style } = this.props;
    return (
      <button style={style} onClick={e => btnFunction(e)} className={className}>
            {children}
      </button>
    )
  }
}




        
    