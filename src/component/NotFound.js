import React, {Component} from 'react'
import "./NotFound.css"


class NotFound extends Component {

    render() {		
		return (
            <div>
                <div className="NotFound">
                    <h1>404</h1>                
                </div>
                <div className="NotFound">
                    <h4>Not Found</h4>
                </div>
            </div>            
		);
	}

}

export default NotFound
