import React, {Component} from 'react'
import "./SearchBar.css"
import DrinkService from '../api/DrinkService';
import { MDBCol, MDBIcon } from "mdbreact";
import logo from '../image/logo.png'
import {  Link } from "react-router-dom";

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.drinkService = new DrinkService();
        this.state = {
          keyword: "",
          link: "/favorites"
        };
        
        this._onChange = this._onChange.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
        this._onClick = this._onClick.bind(this);

    }

    _onClick(e) {

        this.props.setLoader(true);
        this.drinkService.getByLetter(e.target.innerText).then(data => { 
            this.setState({
                loading: false
            });          
            this.props.setLoader(false)   
            this.props.getAllImages(data);           
        });

    }

    _onChange(e) {
       
        this.setState({
            keyword: e.target.value
        });        
        
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.setLoader(true)    

            this.drinkService.getAll(this.state.keyword).then(data => { 
                this.setState({
                    loading: false
                });          
                this.props.setLoader(false)   
                this.props.getAllImages(data);           
            });
        
        },3000);
    }

    _onKeyPress(e) {

        this.setState({
            keyword: e.target.value
        })

        if(e.charCode === 13){    

            clearTimeout(this.timeout);

            this.props.setLoader(true);

            this.drinkService.getAll(this.state.keyword).then(data => { 
                this.setState({
                    loading: false
                });          
                this.props.setLoader(false)   
                this.props.getAllImages(data);           
            });        
        }
    }

    render() {

        return (
            <div>
                <div className="div-searchBar">
                    <img className="logo" alt="" src={logo} ></img>
                    <p className="name-searchBar" > Massive Drinks </p>

                    <MDBCol md="7">
                        <div className="input-group md-form form-sm form-1 pl-0">
                            <div className="input-group-prepend">
                                <span className="input-group-text purple lighten-3" id="basic-text1">
                                    <MDBIcon className="text-white" icon="search" />
                                </span>
                            </div>
                            <input className="form-control my-0 py-0"
                                            value={this.props.keyword}
                                            placeholder={"Search drinks"}            
                                            onChange={this._onChange}
                                            onKeyPress={this._onKeyPress}
                                            type="search"
                                    />
                        </div>
                    </MDBCol>   
                    <Link className="link-favorites" to={this.state.link}>Favorites</Link>
             
                </div>                

                <div className="div-letters">
                    <p>Browse By Name</p>
                </div>
                <div className="div-letters">
                    <p>
                    <button onClick={this._onClick}>A</button> / 
                    <button onClick={this._onClick}>B</button> / 
                    <button onClick={this._onClick}>C</button> / 
                    <button onClick={this._onClick}>D</button> / 
                    <button onClick={this._onClick}>E</button> / 
                    <button onClick={this._onClick}>F</button> / 
                    <button onClick={this._onClick}>G</button> / 
                    <button onClick={this._onClick}>H</button> / 
                    <button onClick={this._onClick}>I</button> / 
                    <button onClick={this._onClick}>J</button> / 
                    <button onClick={this._onClick}>K</button> / 
                    <button onClick={this._onClick}>L</button> / 
                    <button onClick={this._onClick}>M</button> / 
                    <button onClick={this._onClick}>N</button> / 
                    <button onClick={this._onClick}>O</button> / 
                    <button onClick={this._onClick}>P</button> / 
                    <button onClick={this._onClick}>Q</button> / 
                    <button onClick={this._onClick}>R</button> / 
                    <button onClick={this._onClick}>S</button> / 
                    <button onClick={this._onClick}>T</button> / 
                    <button onClick={this._onClick}>U</button> / 
                    <button onClick={this._onClick}>V</button> / 
                    <button onClick={this._onClick}>W</button> / 
                    <button onClick={this._onClick}>X</button> / 
                    <button onClick={this._onClick}>Y</button> / 
                    <button onClick={this._onClick}>Z</button>	
                    </p>
                </div>

                
            </div>
            
            
        );
    }

}

export default SearchBar

