// import React from "react";
// import { Rating } from "primereact/rating";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
// import "./StaticSlick.css";
// import { useNavigate } from "react-router-dom";
// import { BsHandbag } from "react-icons/bs";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import Slider from "react-slick";
// import ProductCard from "../ProductCard/ProductCard";
// const SampleNextArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div
//       // className={className}
//       // style={{ ...style, display: "block" }}
//       className="NextArrow Arrow"
//       onClick={onClick}
//     >
//       <MdKeyboardArrowRight />
//     </div>
//   );
// };

// const SamplePrevArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div className={"PrevArrow Arrow"} onClick={onClick}>
//       <MdKeyboardArrowLeft />
//     </div>
//   );
// };
// const StaticSlick = ({ ProductsFilter }) => {
//   const navigate = useNavigate();
//   const settings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: ProductsFilter.length < 4 ? 3 : 5,
//     slidesToScroll: 1,
//     speed: 1000,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     cssEase: "linear",
//     initialSlide: 0,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//   };
//   const Products = ProductsFilter.map((ele, idx) => {
//     const imageID = ele.images[0];
//     const pathName = ele.name.replace(/\s/g, "-");
//     return (
//       // <div
//       //   key={idx}
//       //   onClick={() => {
//       //     navigate(`/product/${ele.id}/${pathName}`);
//       //     window.scrollTo({
//       //       top: 0,
//       //       left: 100,
//       //       behavior: "instant",
//       //     });
//       //   }}
//       // >
//       //   <div className="card-container">
//       //     <div className="Card-img-container">
//       //       <LazyLoadImage
//       //         src={`https://souq-mahala.com/imag?id=${imageID}`}
//       //         alt={ele.name}
//       //         effect="blur"
//       //       />
//       //     </div>
//       //     <div className="card-info">
//       //       <span> {ele.catName}</span>
//       //       <Rating readOnly value={ele.rate} stars={5} cancel={false} />
//       //       <p> {ele.name}</p>
//       //       <p>{ele.priceAfter}</p>
//       //       <button className="add-to-cart-btn" name="add-to-cart">
//       //         <BsHandbag />
//       //         اضف الى السلة
//       //       </button>
//       //     </div>
//       //   </div>
//       // </div>
//       <></>
//     );
//   });
//   return (
//     <>
//       <Slider {...settings}>{Products}</Slider>
//     </>
//   );
// };

// export default StaticSlick;
