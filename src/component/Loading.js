import React, {Component} from 'react'
import "./Loading.css"


class Loading extends Component {

    render() {		
		return (
            <div className="div-loading">
                 <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>                
            </div>
		);
	}

}

export default Loading
