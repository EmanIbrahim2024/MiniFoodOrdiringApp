import CartContent from "./CartContent";


export default function CartModal(){
  return(
    <dialog open>
      <CartContent/>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
    );
  
}