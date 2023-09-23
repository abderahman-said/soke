"use client"
import FooterBar from "@/Static/FooterBar/FooterBar";
import Home from "@/Static/Home/Home";
import NavBar from "@/Static/NavBar/NavBar";
import Service from "@/Static/Service/Service";
import LastofOffersProducts from "@/Static/اخر المنتجات/LastofOffersProducts";
export default function App() {

  return (
   <>
    <NavBar />
   <Home />
   <Service />
   <LastofOffersProducts />
   <FooterBar />

   </>
  )
}
