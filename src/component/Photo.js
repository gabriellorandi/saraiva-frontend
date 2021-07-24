import React, {Component} from 'react'
import {  Link } from "react-router-dom";
import './Photo.css'

class Photo extends Component {

    constructor(props) {
      super(props);
      this.state ={
        link: '/drink/'+this.props.data.idDrink
      }
    }   

    render() {

        return (
            <div className="Photo">
              <Link to={this.state.link}>
                <img
                  src={this.props.data.strDrinkThumb}
                  alt={this.props.data.strDrink}
                  style={{width: '18vw',height: '18vw'}}
                />
                <label className="photo-legend" >{this.props.data.strDrink}</label>  
              </Link>                                                  
            </div>            
        );
  
    }

   
}


export default Photo