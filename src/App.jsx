import CartContent from "./assets/Components/Cart/CartContent";
import {FaShoppingCart} from "react-icons/fa";

import Form from "./assets/Components/Form/Form";
import Menu from "./assets/Components/Menu/Menu";
import { CartContext } from "./store/CartContext";
import { useContext } from "react";
import ConfirmedPost from "./assets/Components/Confirmed/ConFirmed";



function App() {

    const {isRequest,setShowCart,showCart,CartItems,Confirmed,SetConfirm} = useContext(CartContext);
   
    function ShowCartfn(){
      setShowCart(true)
    }

  return (
    <div>
      <section className="Top-background">
      <header>
        <div className="header-Container">
        <img alt="Uber Eats Home" src="https://www.ubereats.com/_static/97c43f8974e6c876.svg" width="146" height="24" />
        <div>
          <button onClick={ShowCartfn} className={CartItems.quantity>0?"Cartlight":"Cartdark"}>
            <FaShoppingCart/> Cart {CartItems.quantity} </button>
          
        </div>
        </div>
      </header>
      <main>
                
        <h1>Hello in Restruent</h1>
        <img src="https://www.ubereats.com/_static/97c43f8974e6c876.svg" width="146" height="24"/>
        
        
      </main>
      
      </section>
      <div >
        
        

      <h3 className="menu">
        THE MENU 

      </h3>

          <Menu />

      </div>
      
      
    {showCart && <CartContent/>}
    {isRequest && <Form/>}
    {Confirmed && <ConfirmedPost/>}
    
  
   
    

    

     
     
   


    </div>
  );
}

export default App;
