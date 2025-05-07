import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../store/CartContext";

export default function ConfirmedPost() {
  const CheckList = useRef();
  const [timeSent, setTimeSent] = useState("");
  const { Confirmed, SetConfirm } = useContext(CartContext);

  useEffect(() => {
    if (Confirmed && CheckList.current) {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTimeSent(formattedTime);

      CheckList.current.showModal();
    }
  }, [Confirmed]);

  function handleClose() {
    CheckList.current.close();
    SetConfirm(false);
  }

  return (
    <>
      <dialog ref={CheckList} className="form-container" style={dialogStyles}>
        <div style={{ textAlign: "center" }}>
          <div style={checkmarkStyles}>✔️</div>
          <h2> Done , Your order is Confirmed</h2>
          <p style={{ fontSize: "16px", color: "#555" }}>
            Order Time: {timeSent}
          </p>
        </div>
        <button onClick={handleClose}>Close</button>
      </dialog>
    </>
  );
}

const dialogStyles = {
  border: "none",
  borderRadius: "12px",
  padding: "30px",
  width: "300px",
  boxShadow: "0 5px 15px rgba(244, 71, 2, 0.3)",
};

const checkmarkStyles = {
  fontSize: "60px",
  marginBottom: "10px",
};
