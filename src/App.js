import './App.css';
import Gallery from './component/Gallery';
import './App.css'
import SearchBar from './component/SearchBar';
import Loading from './component/Loading';
import DrinkDescription from './component/DrinkDescription'
import NotFound from './component/NotFound';
import FavoriteCart from './component/FavoriteCart'
import {  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";

import React, { Component } from 'react';

class App extends Component {

  constructor(props){
      super(props);
      this.state={
          data: [],
          loading: false
      }
  }

  getAllImages=(data)=> {
    this.setState({data: data})
  }

  setLoader=(loading)=> {
    this.setState({loading: loading})
  }

  render() {
    return (  
        <Router>      
          <div>        
            <Switch>
              <Route exact path="/">
              <div>                              
                <SearchBar getAllImages={this.getAllImages.bind(this)} setLoader={this.setLoader.bind(this)}/> 
                {this.state.loading ? <Loading/> : <Gallery data={this.state.data} /> }       
              </div>
              </Route>
              <Route path="/drink/:id" render={(props) =>  <DrinkDescription id={props.match.params.id} /> }/>
              <Route path="/favorites"  > <FavoriteCart />  </Route>
              <Route path='*' > <NotFound /> </Route>      
            </Switch>                      
          </div>
        </Router>      
    );
  }
}

export default App;

