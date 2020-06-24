import React from 'react';

let Input = (props) => {
	let changeFun = event => {
		props.setAmount(event.target.value)
	}
	let clickBtn = () => {
		if(props.amount>100) {
			props.setError({have: true, text: 'Введите число меньше 100'});
			props.setAmount('');
		} else {
			props.setError({have: false, text: null});
			props.generateCards(props.amount);
			props.setAmount('');
		}
	}
	return <section className="input-block">
				<p className="input__title">Введите четное число карточек (до 100)</p>
				<div className="input__zone">
					<input onChange={event => changeFun(event)} className="input" value={props.amount} />
					<button disabled={(props.amount.length===0 || props.amount<=0) && true} onClick={clickBtn} className="input__btn">Вывести на экран</button>
		    	</div>
		    	{ props.right && <p className="input__right info">Правильно</p>}
		    	{ props.error.have && <p className="input__error info">{props.error.text}</p>}
		    	{ props.win && <p className="input__win info">Вы выиграли!</p>}
		    </section>
}
export default Input;