import { createContext } from "react";
import CartContent from "../assets/Components/Cart/CartContent";
import { useState } from "react";

export const CartContext= createContext();

export function CartProvider({children}){

 

 const [CartItems,setItemToCart]=useState({
      items:[],
      quantity:0,
      totalPrice:0
      
    });

    const [isRequest,setRequest]=useState(false);
    const [showCart,setShowCart]=useState(false);
    const [Confirmed,SetConfirm]=useState(false);


 function handleCartItems(requestmeal) {
        setItemToCart((prevCart) => {
          const prevItems = [...prevCart.items];
          const isItemExist = prevItems.find(item => item.id === requestmeal.id);
      
          let updatedItems;
      
          if (isItemExist) {
           
            updatedItems = prevItems.map(item =>
              item.id === requestmeal.id?
                 { ...item, quantity: item.quantity + 1 }
                : item
            );
         } else {
            updatedItems = [...prevItems, { ...requestmeal, quantity: 1 }];
          }
      
          const updatedQuantity = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
          const calctotalPrice=updatedItems.reduce((acc,item)=>acc+item.quantity*item.price,0)
      
          return {
            items: updatedItems,
            quantity: updatedQuantity,
            totalPrice:calctotalPrice
          };
        });
      }

      function removeFromCart(requestmeal) {
        setItemToCart((prevCart) => {
          const prevItems = [...prevCart.items];
    
         
          const updatedItems = prevItems
            .map(item =>
              item.id === requestmeal.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0); 
    
          const updatedQuantity = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
          const calctotalPrice=updatedItems.reduce((acc,item)=>acc+item.quantity*item.price,0)

    
          return {
            items: updatedItems,
            quantity: updatedQuantity,
            totalPrice:calctotalPrice
          };
        });
      }

      const resetCart = () => {
        setItemToCart({
          items:[],
          quantity:0,
          totalPrice:0
          
        });
      };
    

      

      return(

        <CartContext.Provider value={{CartItems,handleCartItems,removeFromCart,isRequest,setRequest,showCart,setShowCart,resetCart,Confirmed,SetConfirm}}>

         {children}

        </CartContext.Provider>

      )
}
      
