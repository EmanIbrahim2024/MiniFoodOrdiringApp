import { useContext, useState, useRef, useEffect } from "react";
import { CartContext } from "../../store/CartContext";
import "./form.css";
import useDataForm from "./useDataForm";

export default function Form() {
  const { clientData, handleData, reset } = useDataForm();

  const dialog = useRef();

  const { CartItems, isRequest, setRequest, resetCart,  SetConfirm } =
    useContext(CartContext);

  useEffect(() => {
    if (isRequest && dialog.current) {
      dialog.current.showModal();
    }
  }, [isRequest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    SetConfirm(true);
    console.log({ ...clientData, CartItems });
    setRequest(false);
    reset();

    resetCart();
  };

  const handleClose = () => {
    setRequest(false);
    dialog.current.close();
  };

  return (
    <>
      <dialog ref={dialog} className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="orderdetail">Chekout</h2>
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={clientData.name}
            onChange={handleData}
            required
          />
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={clientData.email}
            onChange={handleData}
            required
          />

          <label>Deliver Address</label>
          <textarea
            name="address"
            value={clientData.address}
            onChange={handleData}
            required
          />

          <label>Phone Number</label>
          <input
            name="phone"
            type="tel"
            value={clientData.phone}
            onChange={handleData}
            required
          />

          <h2 className="orderdetail">Your Order Details</h2>
          <div>
            <h4>Total Price : {CartItems.totalPrice} EGP + Delivery Fee</h4>
            <h2 className="orderdetail">Meals Ordered: </h2>
            <ul className="cart-detals">
              {CartItems.items.map((meal) => (
                <li key={meal.id}>
                  <h4>{meal.name}</h4>
                  <p>one peace price : {meal.price} EGP</p>

                  <p>Quantity requests: {meal.quantity} </p>
                </li>
              ))}
            </ul>
          </div>

          <button type="submit">Confirm Order</button>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </form>
      </dialog>
    </>
  );
}
