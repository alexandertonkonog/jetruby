import React from 'react';

let Result = (props) => {
	return  <section className="result">
				<p className="result__text">Ваш результат</p>
				<h1 className="result__num">{props.storage}</h1>
			</section>
}
export default Result;