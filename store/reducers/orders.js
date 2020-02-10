import { ADD_ORDER } from "../actions/orders";
import Order from "../../models/order";

const initialState = {
  orders: []
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };

    default:
      return state;
  }
  return state;
};

export default orderReducer;