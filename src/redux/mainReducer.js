const NEW_ACTION = "NEW_ACTION";
let initialState = {
	list: [
		
	]
}
export let mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEW_ACTION: {
			return state;
		}
		default: {
			return state;
		}
		
	}
}