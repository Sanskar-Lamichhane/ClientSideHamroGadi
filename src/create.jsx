
import { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { Bounce } from "react-toastify"


function Create() {

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    categories: [""],
    image:"",
  })
  
console.log(product)

  function addCategory() {
    let temp = [...product.categories]
    temp.push("")
    setProduct({ ...product, categories: temp })
  }

  const deleteCat = (index) => {
    const temp = [...product.categories]
    temp.splice(index, 1)
    setProduct({ ...product, categories: temp })
  }

  const localStorage1=localStorage.getItem("access_token")

const formdata=new FormData();
formdata.append("name",product.name)
formdata.append("price",product.price)
formdata.append("description",product.description)
product.categories.forEach((element)=>{
  formdata.append("categories[]",element)
})
  formdata.append("image",product.image)



  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("https://ecommerce-sagartmg2.vercel.app/api/products", formdata , {
      headers: {
        Authorization: `Bearer ${localStorage1}`
      }
    })
    .then(response=>{
      console.log(response)
      toast.success('Product sucessfully Created', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    })
    .then(error=>{

    })
  }
  return (
    <>
      <div className="container mt-16">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div class="mb-4">
            <label className="block hello" for="username">
              Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              onChange={(e) => {
                setProduct({ ...product, name: e.target.value })
              }} />
          </div>


          <div class="mb-4">
            <label className="block hello" for="price">
              Price
            </label>
            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number" placeholder=""
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value })
              }} />

          </div>
          <div class="mb-4">
            <label className="inline-block text-gray-700 text-sm font-bold mb-2" for="category">
              Category
            </label><button className="ml-4 bg-blue-500 text-white p-1 rounded"
              onClick={addCategory}
              type="button">Add categories</button>
            {
              product.categories.map((element, index) => {
                return (
                  <>
                    <div className="flex align-middle mb-3 ">
                      <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        type="text" placeholder=""
                        onChange={(e)=>{
                          const temp=[... product.categories]
                          temp[index]=e.target.value
                          setProduct({... product, categories:temp})
                        }}
                      />
                      <button type="button" className="bg-red-500 text-white rounded px-3 h-10"
                        onClick={() => deleteCat(index)}>Delete</button>
                    </div>
                  </>
                )

              })

            }
          </div>

          <div class="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="description">
              Description
            </label>
            <textarea
            onchange={(event)=>{
              setProduct({... product, description:event.target.value})
            }}
             row={4} className=" shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="" />

          </div>


          <div class="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="image">
              Images
            </label>
            <input className=" shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="image"
              type="file"
              placeholder=""
              onChange={(e)=>{
                setProduct({...product,image:e.target.files[0]})
              }}
               />

          </div>




          <div class="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
            >
              Submit
            </button>

          </div>
        </form>

      </div></>
  )
}

export default Create;