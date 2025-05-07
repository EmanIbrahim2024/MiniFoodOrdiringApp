import "./CartContent.css";
import { useContext, useEffect, useRef } from "react";
import { CartContext } from "../../store/CartContext";
import { FaTimes } from "react-icons/fa";

function CartContent() {
  const {
    CartItems,
    AddToCart,
    decreaseItemQuantity,
    removeFromCart,
    setRequest,
    showCart,
    setShowCart,
    isRequest,
  } = useContext(CartContext);
  const dialogCart = useRef();

  function handleRequestForm() {
    if (CartItems.quantity) setRequest(true);
  }

  useEffect(() => {
    if (showCart && dialogCart.current) {
      dialogCart.current.showModal();
    }
    if (isRequest) {
      setShowCart(false);
      dialogCart.current.close();
    }
  }, [showCart, isRequest]);

  const handleClose = () => {
    setShowCart(false);
    dialogCart.current.close();
  };

  return (
    <>
      <dialog ref={dialogCart} className="Cart-items">
        <div className="handleCloseButton">
          <button onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        <div className="headingText">
          <h1>Total Items in Cart : {CartItems.quantity}</h1>
          <h1>Total price : {CartItems.totalPrice} EGP </h1>
          {CartItems.quantity ? (
            <button onClick={handleRequestForm} className="light">
              Order Request
            </button>
          ) : (
            ""
          )}
        </div>
        {CartItems.quantity ? (
          <ul className="cart-detals">
            {CartItems.items.map((meal) => (
              <li key={meal.id} className="Cart-Sort">
                <div>
                  <h2>{meal.name}</h2>
                  <p>price per one : {meal.price} EGP</p>

                  <p>Quantity requests: {meal.quantity} </p>
                  <p>
                    total price : {meal.quantity} * {meal.price} ={" "}
                    {meal.quantity * meal.price}
                  </p>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(meal)}
                  >
                    {" "}
                    Remove{" "}
                  </button>
                  <button
                    className="quantity-btn"
                    onClick={() => decreaseItemQuantity(meal)}
                  >
                    -
                  </button>
                  <button
                    className="quantity-btn"
                    onClick={() => AddToCart(meal)}
                  >
                    +
                  </button>
                </div>
                <div>
                  <img
                    src={meal.image}
                    alt={meal.name}
                    width="200rem"
                    height="150"
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-items">
            <p>Your Cart is Empty</p>
          </div>
        )}
      </dialog>
    </>
  );
}

export default CartContent;
