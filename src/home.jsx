import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import FeaturedProduct from "./FeaturedProduct";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';
import { useState, useEffect } from 'react'




function CarouselItems(props) {
    return (
        <div className={`${props.banner} h-[83vh] bg-cover bg-right text-left flex justify-start bg-no-repeat`}>
            <div className='container'>
                <div className='w-2/4 mt-36'>
                    <p className='text-secondary mb-7 text-2xl'>Best Furniture For Your Castle ...</p>
                    <p className='text-5xl mb-7 font-bold leading-tight'>New Furniture Collection Trends in 2020</p>
                    <button className='bg-blue-500 text-white font-semibold py-4 px-8 text-lg rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out'>
                        Shop Now
                    </button>


                </div>
            </div>
        </div>
    )

}

function Home() {

    const [trendingProduct, setTrendingProduct] = useState([]);
    const[latestProduct,setLatestProduct]=useState([]);

    useEffect(() => {
        axios.get("https://ecommerce-sagartmg2.vercel.app/api/products/trending")
            .then((response) => {
                setTrendingProduct(response.data.data)
                console.log(response.data.data)
            })
    }, [])

    useEffect(()=>{
        axios.get("https://ecommerce-sagartmg2.vercel.app/api/products")
        .then((response) => {
            setLatestProduct(response.data.products)
            console.log(response.data.products)
        })
    },[])



    return (
        <>
     
            <Carousel showThumbs={false} swipeable={true} >
                <CarouselItems banner="bg-banner-2" />
                <CarouselItems banner="bg-banner-2" />
                <CarouselItems banner="bg-banner-2" />



            </Carousel>

            <div className='container my-12 grid grid-cols-4 gap-4'>

            {
                trendingProduct.length===0
                &&
                <>
                <Skeleton height={200} />
                <Skeleton height={200} />
                <Skeleton height={200} />
                <Skeleton height={200} />
                </>
            }
                {
                    trendingProduct.map((element,index)=>{
                       return( <FeaturedProduct key={index} image={element.image}
                        name={element.name} price={element.price} id={element._id}/>)
                    })
                }

                {/* <FeaturedProduct/>
          <FeaturedProduct/>
          <FeaturedProduct/>
          <FeaturedProduct/> */}

            </div>

            <p className='text-5xl text-center fotn-bold text-primary-dark mb-12 mt-6'>Latest Products</p>
            <section className='container grid grid-cols-3 gap-4'>

                {
                    latestProduct.length===0 &&
                    <>
                    <Skeleton height={200}/>
                    <Skeleton height={200}/>
                    <Skeleton height={200}/>
                    <Skeleton height={200}/>
                    <Skeleton height={200}/>
                    <Skeleton height={200}/>
                    </>
                }
                {
                    latestProduct.map((element,index)=>{
                        return(
                            index>6|| index===1 ? null:
                            <FeaturedProduct key={index} type="latest" image={element.image}
                            name={element.name} price={element.price} id={element._id}/>
                            

                        )
                    })
                }
                {/* <FeaturedProduct type="latest"  />
                <FeaturedProduct type="latest" />
                <FeaturedProduct type="latest" /> */}
            </section>
        </>
    )

}

export default Home;