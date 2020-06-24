import React from 'react';

let Card = (props) => {
	let mast = (id, len) => {
		if(id <= len/4) {
			return '&#9824;';
		} else if (id > len/4 && id <=len/2) {
			return '&clubs;';
		} else if (id > len/2 && id <= len*0.75) {
			return '&hearts;';
		} else {
			return '&diams;';
		}
	}
	return  <div 
				onClick={ () => props.activeList.length<2 && props.chooseFun(props.id)}
				className="card" 
				style={{background: props.activeList.includes(props.id) ? props.color : '#6C6D69'}}
				dangerouslySetInnerHTML={{__html:mast(props.id,props.len)}}>
			</div>
}
export default Card;