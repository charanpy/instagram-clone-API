import alertActionTypes from './alert.type';

const initialState = [];

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case alertActionTypes.SET_ALERT:
      return [...state, action.payload];
    case alertActionTypes.REMOVE_ALERT:
      console.log(action.payload, 111);
      return state.length
        ? state.filter((alert) => alert.id !== action.payload)
        : [];
    default:
      return state;
  }
};

export default alertReducer;
