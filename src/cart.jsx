import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { increment } from "./Redux/Slice/cartSlice";
import { decrement } from "./Redux/Slice/cartSlice";

function Cart(){
const cartItem=useSelector((store)=>{
    return store.cart.value;
})

const dispatch=useDispatch();

const plusHandle=(index)=>{
    dispatch(increment(index))
}

const minusHandle=(index)=>{
    dispatch(decrement(index))
}

    return(
        <>
        <div class="container flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full text-left text-sm font-light text-surface dark:text-black">
          <thead
            className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" className="px-6 py-4">ID</th>
              <th scope="col" className="px-6 py-4">Product</th>
              <th scope="col" className="px-6 py-4">Quantity</th>
              <th scope="col" className="px-6 py-4">Price</th>
              <th scope="col" className="px-6 py-4">total</th>
            </tr>
          </thead>


          <tbody>
            {
            cartItem.map((element,index)=>{
                return  <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">{element.id}</td>
                <td className="whitespace-nowrap px-6 py-4">{element.name}</td>
                <td className="whitespace-nowrap px-6 py-4"><span onClick={()=>plusHandle(index)} className="p-2 bg-secondary mr-3">+</span>{element.quantity}<span onClick={()=>minusHandle(index)} className="p-2 bg-secondary ml-3">-</span></td>
                <td className="whitespace-nowrap px-6 py-4">{element.price}</td>
                <td className="whitespace-nowrap px-6 py-4">{element.price * element.quantity}</td>
                
              </tr>
            })}
           
           
          </tbody>
        </table>
        <button type="button" className="mt-10 bg-blue-400 p-2 text-black rounded">Place Order</button>
      </div>
    </div>
  </div>
</div>
        </>
    )
}

export default Cart;