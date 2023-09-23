"use client"
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import ProductCard from "../../../Layout/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import MarketImage from "../../../../public/images/MarketSlick.png";
import styles from "../../../app/page.module.css"
import Link from "next/link";
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
       className={`${styles.Arrow} ${styles.NextArrow}`}
      onClick={onClick}
    >
      <MdKeyboardArrowRight />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={`${styles.Arrow} ${styles.PrevArrow}`} onClick={onClick}>
      <MdKeyboardArrowLeft />
    </div>
  );
};
const MatgersHome = () => {
  const  MarketsArr  = useSelector((state) => state.MarketsSlice);

  const MarketsData =
    MarketsArr.length > 0 &&
    MarketsArr.map((ele, idx) => {
      const pathName = ele.name.replace(/\s/g, "-");
      return (
        <div key={idx}>
          <ProductCard
            key={idx}
            CatName={ele.catName}
            ProductName={ele.name}
            image={ele.matgarImage}
            Rate={ele.rate}
            id={ele.id}
            pathName={pathName}
            MarketImage={ele.matgarImage}
            Goto={"matgar"}
            className={styles.Slick_Product}
          />
        </div>
      );
    });

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    swipeToSlide: true,
    initialSlide: 0,
    rtl: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div  className={styles.SlMatgerHomeick_Product}>
      <Container fluid>
        <Row className="align-items-center ">
          <Col md={3}>
            <div
             className={styles.MainCatBackgound}
              // style={{
              //   backgroundImage: `url(${MarketImage})`,
              // }}
            >
              <h2  className={styles.Main_title}>اهم المتاجر</h2>
              <h4  className={styles.Main_title}>2023/2022</h4>
            </div>
          </Col>
          <Col md={8}>
            <Slider {...settings}>{MarketsData}</Slider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MatgersHome;
