import React, {Component}  from 'react'
import './FavoriteCart.css'
import StarFull from '../image/star_full.png'
import Loading from './Loading';

class FavoriteCart extends Component  {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: true
        }    
    }

    componentDidMount() {
        this.getStorage()       
    }

    getStorage() {
        var drinks =[],
            keys = Object.keys(localStorage),
            i = keys.length;
    
        while ( i-- ) {   
            drinks.push(JSON.parse(localStorage.getItem(keys[i])));                  
        }

        this.setState({
            data: drinks,
            loading: false
        })
      
    }

    render() {        

        const onClick = (drink) => {
            this.setState({            
                loading: true
            })  
            localStorage.removeItem(drink.idDrink);
            this.getStorage()
        }

        return (
            <div className="favorite-cart"> 
                {this.state.loading ? <Loading/>: 
                <div>
                    <p className="name-favorite" > Favorite Drinks </p>
                    {(this.state.data && this.state.data.length !== 0) ?
                        <ul >
                            {this.state.data.map((drink) => {
                            return (
                                <li key={drink.idDrink}>                                                         
                                    <div className="div-flex">
                                        <img className="drink-image" alt="" style={{width: '8vw',height: '8vw'}}  src={drink.strDrinkThumb} />
                                        
                                        <div className="div-block">
                                                <img
                                                    onClick={() => onClick(drink)}
                                                    alt=""                                                   
                                                    src={StarFull}
                                                    style={{width: '3vw',height: '3vw'}} />
                                                <p className="drink-name">{drink.strDrink}</p>                                                              
                                        </div>       
                                    </div>                          
                                </li>
                            );
                            })}
                        </ul>   
                        
                    : <h2>Empty List</h2> }    

                </div>
            }    
            </div>
        );       
    }
    
}

export default FavoriteCart;

