import React, {useState, useEffect} from 'react';
import Card from './components/Card';
import Input from './components/Input';
import Result from './components/Result';
let App = () => {

	let [list, setList] = useState([]);
	let [amount, setAmount] = useState('');
	let [activeList, setActiveList] = useState([]);
	let [error, setError] = useState({have: false, text: null});
	let [win, setWin] = useState(false);
	let [right, setRight] = useState(false);
	let [storage, setStorage] = useState(0);
	let [info, setInfo] = useState(true);

	useEffect(() => {
		checkStorage();
		generateCards();
	}, [])

	useEffect(()=> {
		controlLists();
	}, [activeList.length])

	let checkStorage = () => {
		let count = Number(window.localStorage.getItem('win'));
		if(!count) {
			window.localStorage.setItem('win', 0)
		} else {
			setStorage(count);
		}
	}
	let increaseStorage = () => {
		window.localStorage.setItem('win', storage+1);
		setStorage(storage+1);
	}
	let controlLists = () => {
		if(activeList.length>1) {
			let firstCard = list.find(c => c.id === activeList[0]);
			let secondCard = list.find(c => c.id === activeList[1]);
			if (firstCard.color === secondCard.color) {
				setRight(true);
				let arr = list.filter(c => c.id!==activeList[0]);
				arr = arr.filter(c => c.id!==activeList[1]);
				increaseStorage();
				setTimeout(() => {
					setList(arr);
					setActiveList([]);
					setRight(false);
					if(arr.length === 0) {
						setWin(true);
						setTimeout( () => {
							generateCards();
							setWin(false);
						}, 2000)
					}
				}, 1000)
			}
			else {
				setTimeout(() => {
					setActiveList([]);
				}, 1000)
			}
		}
	}
	let chooseFun = (id) => {
		setInfo(false);
		setWin(false);
		if(!activeList.includes(id)) {
			setActiveList([...activeList, id]);
		} else {
			setActiveList(activeList.filter(c => c !== id));
		}
	}
	let generateCards = (amount = 16) => {
		amount = Number(amount);
		if(!Number.isNaN(amount)) {
			if (amount < 4) {
				amount = 4;
			}
			if (amount % 2 !== 0) {
				amount = amount+1;
			}
			let arr = [];
			for(let i = 0; i < amount/2; i++) {
				arr.push({
					id: i+1,
					color: '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase()
				})
			}
			let secList = arr.map(obj => {
				return {id: obj.id+(amount/2), color: obj.color}
			});
			let lastList = [...arr, ...secList];
			setList(lastList.sort(() => Math.random() - 0.5));
			setActiveList([]);
		} else {
			setError({have: true, text: 'Введите число'})
		}
	}
 	return <main className="wide-block">
 			   {info && <p className="input__info info">После нажатия двух карточек есть задержка в 1 секунду, во время которой нельзя нажимать на другие карточки. После нее карточки погаснут.</p>}
		       {info && <p className="input__info info">Будьте внимательны, генерация часто выдает похожие цвета</p>}
		       <Input
		       	   win={win}
		       	   right={right} 
			       amount={amount} 
			       setAmount={setAmount} 
			       generateCards={generateCards}
			       error={error}
			       setError={setError} />
			   
		       <section className="card-list">
		       		{list ? 
		       			list.map((card, ind) => <Card
		       				key={card.id} 
		       				activeList={activeList}
		       				chooseFun={chooseFun}
		       				id={card.id}
		       				color={card.color}
		       				len={list.length} />) :
		       			<p> </p>
		       		}
		       </section>
		       <Result 
		       	storage={storage} />
		   </main>       
};


export default App;
