import React, {Component} from 'react';
import './DrinkDescription.css';
import DrinkService from '../api/DrinkService';
import Loading from './Loading';
import NotFound from './NotFound';
import StarFull from '../image/star_full.png'
import StarEmpty from '../image/star_empty.png'
import { FacebookShareButton, WhatsappShareButton, WhatsappIcon , FacebookIcon } from 'react-share'

class DrinkDescription extends Component {


    constructor(props) {
        super(props);
        this.drinkService = new DrinkService();  
        this.state = {
            data: { strDrinkThumb:"", strDrink:"" },
            loading: true,
            notFound: false,
            mouseOver: false,            
            ingredients: [],
            url: String(window.location.href),
            shareTitle: "Massive drinks",
            shareSize: 50,
            appIdFacebook:2576877819274909

        };  
        
        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
    }
    

    componentDidMount() {
        this.getDrink();     
    }

    getDrink() {

        if(this.props.id) {
            
            this.drinkService.getById(this.props.id).then(data => { 
                this.setState({
                    data: data,
                    loading: false,
                    ingredients: data.ingredients
                });

            }).catch(e =>{
                this.setState({
                    loading: false,
                    notFound: true
                });   
                console.log(`Error on loading drink: ${e}`);
            });

        } 

    }

    _onMouseEnter(e) {
        if (this.state.mouseOver === false) {
            this.setState({
                mouseOver: true
              })
        }       
    }

    _onMouseLeave(e) {
        if (this.state.mouseOver === true) {
            this.setState({
                mouseOver: false
              })
        }        
    }

 
    render() {
        
        const onClickEmpty = (drink) => {
            if(localStorage.getItem(drink.idDrink) === null){
                localStorage.setItem(drink.idDrink, JSON.stringify(drink));
            }
        }

        const onClickFull = (drink) => {
            if(localStorage.getItem(drink.idDrink) !== null){
                localStorage.removeItem(drink.idDrink);
            }
        }

        const hasStar = (drink) => {
            return localStorage.getItem(drink.idDrink)       
        }
        
        const listIngredients = this.state.ingredients.map((ing, index) => {
            return  (this.state.data.measures[index]) ?
                <li key={index}> {ing} - {this.state.data.measures[index]} </li>  : 
                <li key={index}> {ing}  </li>     
        });   

        let star_style =  this.state.mouseOver 
                            ? {width: '3.2vw',height: '3.2vw'}
                            : {width: '3vw',height: '3vw'} 

		return (
   

            <div>
                {this.state.notFound ? <NotFound/> : 

                <div>
                    {this.state.loading ? <Loading/> : 

                    <div className="div-center">

             
                            <tr>
                                <td className="td-image">
                                    <div className="div-inline">
                                        <p className="drink-name">{this.state.data.strDrink}</p>	
                                        {hasStar(this.state.data)?
                                         <img
                                            onClick={() => onClickFull(this.state.data)}
                                            alt=""
                                            onMouseEnter={this._onMouseEnter}
                                            onMouseLeave={this._onMouseLeave}
                                            src={StarFull}
                                            style={star_style} />
                                        :
                                        <img
                                            onClick={() => onClickEmpty(this.state.data)}
                                            alt=""
                                            onMouseEnter={this._onMouseEnter}
                                            onMouseLeave={this._onMouseLeave}
                                            src={StarEmpty}
                                            style={star_style} />
                                        }                                                                              
                                    </div>                                	
                                    <img
                                        src={this.state.data.strDrinkThumb}
                                        alt={this.state.data.strDrink}
                                        style={{width: '25vw',height: '25vw'}}
                                    />	
                                    <p className="p-2">Glass : {this.state.data.strGlass}</p>
                                </td>
                                <td className="td-text">
                                    <div className="div-block">
                                        <h6>Instructions</h6>
                                        <p className="p-1 ">{this.state.data.strInstructions}</p>
                                    </div>

                                    <div className="div-block">
                                        <h6>Ingredients</h6>    
                                        <ul className="ul-block">
                                            {listIngredients}
                                        </ul>                            
                                    </div>   

                                    <div>
                                        <FacebookShareButton quote={this.state.title} url={this.state.url} appId={this.state.appIdFacebook}>
                                            <FacebookIcon size={this.state.shareSize} round={true} />
                                        </FacebookShareButton>
                                        <WhatsappShareButton url={this.state.url} title={this.state.title} separator=":: ">
                                            <WhatsappIcon size={this.state.shareSize} />
                                        </WhatsappShareButton>
                                    </div>    
                                    
                                </td>
                            </tr>   
                                      	                                                       
                    </div>                                             
                }     
                </div>
            }
            </div>  
       			
		);
	}
}

export default DrinkDescription