import * as actionTypes from '../actionTypes';

export const addToCart = (itemId, image, name, price, qty, ukuran, color) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemId,
      img: image,
      name: name,
      prc: price,
      qty: qty,
      ukuran: ukuran,
      color: color,
      pick: true,
    },
  };
};

export const addToCheckout = (data) => {
  return {
    type: actionTypes.ADD_TO_CHECKOUT,
    payload: data.kirim,
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};

export const clearCheckout = () => {
  return {
    type: actionTypes.CLEAR_CHECKOUT,
  };
};

export const deleteCart = (itemId) => {
  return {
    type: actionTypes.DELETE_FROM_CART,
    payload: {
      id: itemId,
    },
  };
};

export const pickCart = (id) => {
  return {
    type: actionTypes.PICK_CART,
    payload: {
      id,
    },
  };
};

export const increaseQuantity = (itemId) => {
  return {
    type: actionTypes.QUANTITY_INCREASED,
    payload: {
      id: itemId,
    },
  };
};

export const decreaseQuantity = (itemId) => {
  return {
    type: actionTypes.QUANTITY_DECREASED,
    payload: {
      id: itemId,
    },
  };
};
