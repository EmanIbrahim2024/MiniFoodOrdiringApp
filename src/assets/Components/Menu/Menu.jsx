import { useContext, useEffect , useState } from "react";
import data from '../../../../data/meals.json';



import "./menu.css";

import CartContent from "../Cart/CartContent";
import { CartContext } from "../../../store/CartContext";

function Menu() {


    const [meals,setData]= useState([]);
    const {CartItems,handleCartItems}=useContext(CartContext)
    
    useEffect(()=>{ 
      setData(data);
    },[])

    
    return (
      <div>
        
        <div className="Menu-Container-ul">
          <ul className="Menu-Container">
           { meals.map((meal)=>(
              <li key={meal.id}>
                <img src = {meal.image}
                alt={meal.name} width='100%' height='200rem'/>
                <h2>{meal.name}</h2>
                <p>price : {meal.price} EGP</p>
                <p>{meal.description}</p>
                <button onClick={()=>handleCartItems(meal)}>Add to Cart</button>
              </li>
            )
  
            )}
          </ul>
        </div>

        


  
        
      </div>
    );
  }
  
  export default Menu;
  