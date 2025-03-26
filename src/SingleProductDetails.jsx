
import { useParams } from "react-router-dom";

function SingleProduct(){

    const params=useParams();
    console.log(params)
return (
    <>
    <div>Single Product Details</div>
    <div>{JSON.stringify(params)}</div>
    </>
)
}

export default SingleProduct;