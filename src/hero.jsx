import { useState } from 'react';

function Hero() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
        <div style={{ position: "relative" }}>
            <div className="p-3 text-center bg-black w-40 hover:bg-red-500 hover:cursor-pointer text-white" onClick={toggle}>hello</div>
            <div className="h-52 bg-zinc-400 flex justify-center items-center">I am Sanskar Lamichhane</div>
            {sidebarOpen ?(
            <div className="p-10 bg-black w-40 text-white" style={{ position: "absolute", zIndex: 1, top: "45px"}}>
                <ul className="leading-9">
                    <li>Home</li>
                    <li>Product</li>
                    <li>Cart</li>
                </ul>
            </div>):null}
           
            
        </div>
      
    
    <div className="h-52 bg-zinc-400 flex justify-center items-center">I am Sanskar Lamichhane</div>
    <div className="h-52 bg-zinc-400 flex justify-center items-center">I am Sanskar Lamichhane</div>
    <div className="h-52 bg-zinc-400 flex justify-center items-center">I am Sanskar Lamichhane</div>
    <div className="h-52 bg-zinc-400 flex justify-center items-center">I am Sanskar Lamichhane</div>
    <div className="h-52 bg-zinc-400 flex justify-center items-center">I am Sanskar Lamichhane</div>
    <div className="h-52 bg-zinc-400 flex justify-center items-center">I am Sanskar Lamichhane</div>
    <div className="h-52 bg-zinc-400 flex justify-center items-center">I am Sanskar Lamichhane</div>
    <div className="h-52 bg-zinc-400 flex justify-center items-center">I am Sanskar Lamichhane</div>
    </>)
}

export default Hero;
