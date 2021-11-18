import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavButton extends Component {
  render() {
      
    return (
      <Link to={
        {
          pathname: this.props.link,
          myCustomProps: this.props.customProps
        }
        
        } className={this.props.className}>
            {this.props.children}
      </Link>
    )
  }
}