import React, {Component} from 'react'
import Photo from './Photo'
import './Gallery.css'
import Empty from '../image/empty.png'

class Gallery extends Component {

  render() {		
		return (
			<div className="Gallery">		
				{ (!this.props.data || this.props.data.length===0) 
				? <img src={Empty} alt="" style={{width: '18vw',height: '18vw'}} />
					: this.props.data.map((data) => {
						return <Photo  data={data} key={data.idDrink} />
  				})}								
			</div>
		);
	}
}

export default Gallery