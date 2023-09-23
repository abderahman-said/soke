"use client"
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosArrowUp } from "react-icons/io";
import Slider from "react-slick";
import { Rating } from "primereact/rating";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";
import BranchesHome from "../BranchesHome/BranchesHome";
import Carousel from "react-bootstrap/Carousel";
import styles from "../../../app/page.module.css"
import Link from "next/link";
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={`${styles.Arrow} ${styles.upArrow}`} onClick={onClick}>
      <IoIosArrowUp />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={`${styles.Arrow} ${styles.downArrow}`} onClick={onClick}>
      <MdKeyboardArrowDown />
    </div>
  );
};
const HomeHeader = ({ Categories }) => {
  const { lastOfferArr } = useSelector((state) => state.OfferSlice);
  const { HomeHeadersArr } = useSelector((state) => state.CategoriesSlice);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    // ***************
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    initialSlide: 0,
    // ****************
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const CatgeoriesSelect =
    Categories &&
    Categories.cats?.map((ele, idx) => {
      const pathName = ele.name.replace(/\s/g, "-");
      return (
        <div key={idx}  className={styles.Cat_Filter}>
          <Link
            href={`/shop?=${ele.id}/${pathName}`}
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 100,
                behavior: "instant",
              });
            }}
          >
            {ele.name}
            <div  className={styles.img_container}>
              <LazyLoadImage
                src={`https://souq.deltawy.com/imag?id=${ele.icon}`}
                alt={ele.name}
                effect="blur"
                width={40}
                height={40}
              />
            </div>
          </Link>
        </div>
      );
    });

  const OfferSlick =
    lastOfferArr &&
    lastOfferArr?.map((ele, idx) => {
      const pathName = ele.name.replace(/\s/g, "-");
      const imageID = ele.images[0];
      return (
        <div
          key={idx}
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 100,
              behavior: "instant",
            });
          }}
        >
          <Link href={`/product/${ele.id}/${pathName}`}>
          <div  className={styles.card_container}>
            <LazyLoadImage
              src={`https://souq.deltawy.com/imag?id=${imageID}`}
              alt={ele.name}
              effect="blur"
              width={200}
              height={150}
            />
            <div className={styles.info} >
              <div className={styles.name_info}>
                <p>{ele.name}</p>
                <Rating readOnly value={ele.rate} stars={5} cancel={false} />
              </div>
              <div className={styles.price_info}>
                <del>{ele.priceBefore}</del>
                <span>{ele.priceAfter}</span>
              </div>
            </div>
          </div>
          </Link>
        </div>
      );
    });

  const HeaderCarousel =
    HomeHeadersArr.length > 0 &&
    HomeHeadersArr?.map((ele, idx) => {
      return (
        <Carousel.Item
          key={idx}
          data-url={ele.img}
        >
          <LazyLoadImage
            effect="blur"
            className={`${styles.backShadow}  d-block w-100 `}
            src={`https://souq.deltawy.com/imag?id=${ele.img}`}
            alt="First slide"
            // width={800}
            // height={520}
          />
          <Carousel.Caption>
            <h3>{ele.title}</h3>
            <p>{ele.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });
  return (
    <div className={styles.HomeHeader}>
      <Container fluid>
        <Row  className={styles.Home_row}>
          {/* d-sm-block d-lg-none */}
          <Col md={3}  className={`${styles.diff_col_screen}  d-none d-lg-flex `}>
            <div  className={styles.main_container_Filter}>
              {CatgeoriesSelect}
              <Link className={styles.More} href={"/shop"}>
                المزيد
              </Link>
            </div>
          </Col>
          <Col md={7}>
          
            <Carousel fade>
              {HeaderCarousel}
            </Carousel>
          </Col>
          <Col md={2} className="d-none d-lg-flex " >
            <div  className={styles.offer_slick_header}>
              <h3>اخر العروض</h3>
              <Slider {...settings}>{OfferSlick}</Slider>
            </div>
          </Col>
          <Col md={12}>
            <BranchesHome Categories={Categories} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeHeader;
