import { createContext, useState, useReducer } from "react";

export const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "setItemToCart": {
      const isItemExist = state.items.find(
        (item) => item.id === action.payload.id
      );
      let updatedItems;

      if (isItemExist) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const updatedQuantity = updatedItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const calctotalPrice = updatedItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      return {
        items: updatedItems,
        quantity: updatedQuantity,
        totalPrice: calctotalPrice,
      };
    }

    case "decreaseItemQuantity": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      const updatedQuantity = updatedItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const calctotalPrice = updatedItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      return {
        items: updatedItems,
        quantity: updatedQuantity,
        totalPrice: calctotalPrice,
      };
    }

    case "removeFromCart": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id ? { ...item, quantity: 0 } : item
        )
        .filter((item) => item.quantity > 0);

      const updatedQuantity = updatedItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const calctotalPrice = updatedItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      return {
        items: updatedItems,
        quantity: updatedQuantity,
        totalPrice: calctotalPrice,
      };
    }

    case "resetCart": {
      return {
        items: [],
        quantity: 0,
        totalPrice: 0,
      };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [CartItems, dispatch] = useReducer(reducer, {
    items: [],
    quantity: 0,
    totalPrice: 0,
  });

  function AddToCart(requestmeal) {
    dispatch({ type: "setItemToCart", payload: requestmeal });
  }
  function decreaseItemQuantity(requestmeal) {
    dispatch({ type: "decreaseItemQuantity", payload: requestmeal });
  }

  function removeFromCart(requestmeal) {
    dispatch({ type: "removeFromCart", payload: requestmeal });
  }

  function resetCart() {
    dispatch({ type: "resetCart" });
  }

  const [isRequest, setRequest] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [Confirmed, SetConfirm] = useState(false);

  return (
    <CartContext.Provider
      value={{
        CartItems,
        AddToCart,
        decreaseItemQuantity,
        removeFromCart,
        isRequest,
        setRequest,
        showCart,
        setShowCart,
        resetCart,
        Confirmed,
        SetConfirm,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
