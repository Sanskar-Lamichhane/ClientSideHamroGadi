import { AiOutlineShoppingCart } from "react-icons/ai";
import chair1 from "./assets/images/chair1.png";
import INF from "./assets/images/imageNotFound.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "./Redux/Slice/cartSlice";

export default function FeaturedProduct({ type, image, name, price, id }) {
  const users = useSelector((store) => store.user.value);
  // const cartItem=useSelector((store)=>store.cart.value)

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const clickHandle = (event) => {
    event.preventDefault();
    if (users) {
      dispatch(addToCart({ name: name, price: price, id: id, quantity: 1 }));
    } else {
      navigate("/login");
    }
  };

  return (
    <Link to={`/product/${id}`}>
      <div className="relative rounded bg-white border text-center shadow-mf group hover:bg-primary hover:border-primary">
        <img
          src={INF}
          alt={name || "Product image"}
          className={`w-full bg-white object-cover h-60 ${type === "latest" ? "h-60" : ""}`}
        />
        <div
          className={`py-2 px-4 ${type === "latest" ? "flex items-center justify-between" : ""}`}
        >
          <p className="my-2 text-lg text-secondary font-semibold group-hover:text-white">
            {name}
          </p>
          <p className="text-primary group-hover:text-white">{price}</p>
        </div>
        <span className="hidden absolute left-4 top-4 bg-primary-light p-4 border group-hover:inline-block rounded-full">
          <AiOutlineShoppingCart className=" " onClick={clickHandle} />
        </span>
      </div>
    </Link>
  );
}
