import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { useState, useEffect } from 'react'
import FeaturedProduct from "./FeaturedProduct";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Pagination from 'rc-pagination';
import { useSearchParams } from "react-router-dom";

function Product() {

    const[paginationData,setPaginationData]=useState({
        total:0,
        page:1,
        per_page: 25
    })

    const [latestProduct, setLatestProduct] = useState([]);
    const navigate = useNavigate()

    const [currentSearchParams,setSearchParams]=useSearchParams();


    const params = useLocation();
    console.log(params)

    const hello=useParams();
    console.log(hello)





    useEffect(() => {
        axios.get("https://ecommerce-sagartmg2.vercel.app/api/products" + params.search).
            then((res) => {
                console.log(res)
                setLatestProduct(res.data.products)
                setPaginationData(res.data.metadata)
            })
            .catch((error) => {
                console.log(err)
            })
    }, [params.search])

    // useEffect(()=>{
    //     axios.get("https://ecommerce-sagartmg2.vercel.app/api/products"+useParams.search).
    //     then((res)=>{
    //       console.log(res)
    //       setProducts(res.data.data[0].data)
    //     })
    //   },[])

    return (
        <>
            <section className="h-48 bg-primary-light flex items-center">
                <div className="container">
                    <p className="text-4xl font-bold">Product Title</p>
                    <p className="text-xl mt-3">Home / Products</p>
                </div>
            </section>

            <section className=" container mt-16">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <p className='text-primary-dark text-3xl font-bold'>Ecommerce Furniture Accesorries and Items</p>
                        <Pagination
                        total={paginationData.total}
                        pageSize={paginationData.per_page}
                        prevIcon=" < prev "
                        nextIcon=" next > "
                        current={paginationData.page}
                        onChange={(pageNumber)=>{
                            console.log(pageNumber)
                            currentSearchParams.set("page", pageNumber)
                            setSearchParams(currentSearchParams)
                        }}
                        showTotal={(total,range)=>
                            `${range[0]} - ${range[1]} of ${total} items`

                        }
     
                        />
                    </div>

                    <div className="flex gap-4">
                        <select name="" id="" onChange={(e) => {
                            e.preventDefault();
                            currentSearchParams.set("per_page", e.target.value)
                            setSearchParams(currentSearchParams)
                        }}>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>


                        <select name="" id="" onChange={(e) => {
                            e.preventDefault();
                            currentSearchParams.set("sort", e.target.value)
                            setSearchParams(currentSearchParams)
                           
                        }}>
                            <option value="datedesc">latest</option>
                            <option value="pricedesc">price desc</option>
                        </select>

                        
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    <div className="border border-gray-300">
                        filters...
                    </div>
                    <div className='border border-gray-300 sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4'>

                        {
                            Array.isArray(latestProduct)
                                ?

                                (
                                    latestProduct.length === 0 ?
                                        <>
                                            <Skeleton height={200} />
                                            <Skeleton height={200} />
                                            <Skeleton height={200} />
                                            <Skeleton height={200} />
                                            <Skeleton height={200} />
                                            <Skeleton height={200} />
                                        </>
                                        : latestProduct.map((element, index) => {
                                            return (

                                                <FeaturedProduct key={index} type="latest" image={element.image}
                                                    name={element.name} price={element.price} id={element._id} />
                                            )
                                        })) : (<p className="text-center text-gray-500 text-xl">No Products Available</p>)
                        }


                    </div>
                </div>
            </section>
        </>
    )
}

export default Product;
