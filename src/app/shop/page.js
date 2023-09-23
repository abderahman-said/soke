"use client"
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { getSearchResult } from "../../store/ShopSlice";
import { Slider } from "primereact/slider";
import { Accordion, AccordionTab } from "primereact/accordion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FiMenu } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
// import { Helmet } from "react-helmet";
import styles from "../page.module.css"
import ProductCard from "@/Layout/ProductCard/ProductCard";
import BranchesHome from "@/Static/Home/BranchesHome/BranchesHome";
import SearchHesder from "@/Static/SearchHesder/SearchHesder";
import NavBar from "@/Static/NavBar/NavBar";
import Service from "@/Static/Service/Service";
import FooterBar from "@/Static/FooterBar/FooterBar";
import LastofOffersProducts from "@/Static/اخر المنتجات/LastofOffersProducts";
import Link from "next/link";
const ShopProducts = () => {
  const dispatch = useDispatch();
  const [page, setPagenumber] = useState(1);
  const { searchCharInput, SearchresultArr } = useSelector(
    (state) => state.ShopSlice
  );
  const { Categories } = useSelector((state) => state.CategoriesSlice);
  const [expensive, setExpensive] = useState(false);
  const [Range, setRange] = useState([0, 10000]);
  const [sortType, setSortType] = useState("الاقل");
  const FetchData = () => {
    setPagenumber((state) => state + 1);
    const data = {
      catId: 0,
      userId: parseFloat(window.localStorage.getItem("ClientId")),
      page,
      query: searchCharInput,
    };
    dispatch(getSearchResult(data));
  };
  const Counter =
    SearchresultArr.length > 0 &&
    [...SearchresultArr].filter(
      (item, e) =>
        parseFloat(item.priceAfter).toFixed(0) >= Range[0] &&
        parseFloat(item.priceAfter).toFixed(0) <= Range[1]
      // &&
      // item.name.toLowerCase().includes(search.toLowerCase())
    );

  // const ShopSchema =
  //   SearchresultArr.length > 0 &&
  //   SearchresultArr.slice(0, 20).map((ele) => {
  //     return (
  //       <>
  //         {JSON.stringify({
  //           "@type": "Product",
  //           image: `http://souq.deltawy.com//imag?id=${ele.images[0]}`,
  //           url: ele.url,
  //           name: ele.name,
  //           offers: {
  //             "@type": "Offer",
  //             price: ele.price,
  //           },
  //         })}
  //       </>
  //     );
  //   });

  const ShopData =
    SearchresultArr.length > 0 &&
    [...SearchresultArr]
      .filter(
        (item, e) =>
          parseFloat(item.priceAfter).toFixed(0) >= Range[0] &&
          parseFloat(item.priceAfter).toFixed(0) <= Range[1]
        // &&
        // item.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        expensive
          ? parseFloat(b.priceAfter).toFixed(0) -
            parseFloat(a.priceAfter).toFixed(0)
          : parseFloat(a.priceAfter).toFixed(0) -
            parseFloat(b.priceAfter).toFixed(0)
      )
      .map((ele, idx) => {
        const pathName = ele.name.replace(/\s/g, "-");
        const imageID = ele.images[0];
        return (
          <div className={styles.ShopPage} >

          <Col className={styles.Product_col}  md={3} xs={6} key={idx}>
            <ProductCard
              key={idx}
              CatName={ele.catName}
              ProductName={ele.name}
              priceBefore={ele.priceBefore}
              priceAfter={ele.priceAfter}
              image={imageID}
              Rate={ele.rate}
              id={ele.id}
              pathName={pathName}
              MarketImage={ele.matgarLogo}
              Goto={"product"}
            />
          </Col>
          </div>
        );
      });
  const CatgeoriesSelect =
    Categories &&
    Categories.cats.map((ele, idx) => {
      const pathName = ele.name.replace(/\s/g, "-");
      return (
        <div key={idx} className={styles.Cat_Filter} >
          <Link
            href={`/shop/${ele.id}/${pathName}`}
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 100,
                behavior: "instant",
              });
            }}
          >
            {ele.name}
            <div className={styles.img_container}>
              <LazyLoadImage
                src={`https://souq.deltawy.com/imag?id=${ele.icon}`}
                alt={ele.name}
                effect="blur"
              />
            </div>
          </Link>
        </div>
      );
    });

  const TestNav = (
    // activeIndex={[0, 1]}
    // activeIndex={[0]}
    <div className={styles.ShopPage} >
    <Accordion multiple>
      {/* <AccordionTab header="" className="header-test">
        {
          <div className="main-container-Filter shop-cat">
            {CatgeoriesSelect}
          </div>
        }
      </AccordionTab> */}
      <AccordionTab header="السعر">
        <div className={styles.accContainer}>
          <div className={styles.slider_demo}>
            <div  className={styles.slider_header_container}>
              <span>{Range[1]} ج</span>
              <span>{Range[0]} ج</span>
            </div>
            <Slider
              max={10000}
              min={0}
              value={Range}
              onChange={(e) => setRange(e.value)}
              range
            />
          </div>
        </div>
      </AccordionTab>
    </Accordion>
    </div>
  );

  return (
    <> 
    <NavBar />
    <div className={styles.ShopPage} >
      {/* <Helmet> */}
        {/* <title>{productname}</title>
        <meta itemprop="name" content={`${productname}`} />

        <meta
          name="description"
          content={`${ProductInfo && ProductInfo.description.slice(0, 170)}`}
        />
        <meta
          itemprop="description"
          content={`${ProductInfo && ProductInfo.description.slice(0, 170)}`}
        />
        <link
          rel="canonical"
          href={`https://souq-mahala.com/product/${id}/${productname}`}
        />
        <meta
          itemprop="image"
          content={`${ProductInfo && ProductInfo.images[0]}`}
        />
        <meta property="og:url" content={`${ProductInfo && ProductInfo.url}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${productname}`} />
        <meta
          property="og:description"
          content={`${ProductInfo && ProductInfo.description}`}
        />
        <meta
          property="og:image"
          content={`http://souq.deltawy.com//imag?id=${
            ProductInfo && ProductInfo.images[0]
          }`}
        />

        <meta
          property="og:url"
          rel="canonical"
          content={`${ProductInfo && ProductInfo.url}`}
        />

        <meta name="twitter:title" content={`${productname}`} />
        <meta
          name="twitter:description"
          content={`${ProductInfo && ProductInfo.description.slice(0, 170)}`}
        /> */}

        {/* {SearchresultArr.lenght > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "ItemList",
              url: `http://multivarki.ru/brand_502/`,
              numberOfItems: "20",
              itemListElement: [{ ShopSchema }],
            })}
          </script>
        )} */}
      {/* </Helmet> */}
      <Row>
        <Col md={3}>
          <div className={styles.sticky_cat_filt} >
            <div className={styles.CatHeader}>
              <FiMenu />
              <h2>التصنيفات الاساسية</h2>
              <IoMdArrowDropdown />
            </div>
            <div className={`${styles.main_container_Filter} ${styles.shop_cat}`} >
              {CatgeoriesSelect}
            </div>
            {TestNav}
          </div>
        </Col>
        <Col md={9}>
          <SearchHesder res={12} />
          <div className={styles.SortBy}>
            <div className={styles.Number_of_products}>
              <h5>عدد المنتجات : </h5>
              <span>{SearchresultArr.length > 0 ? Counter.length : "0"}</span>
            </div>
            <div className={`${styles.SortDiv} ${styles.Number_of_products}`} >
              <h5>ترتيب حسب : </h5>
              <span className={styles.typeSelected}>
                {sortType}
                <div className={styles.SortByDrop}>
                  <p
                    onClick={() => {
                      setSortType("الاعلى");
                      setExpensive(true);
                    }}
                  >
                    الاعلى
                  </p>
                  <p
                    onClick={() => {
                      setSortType("الاقل");
                      setExpensive(false);
                    }}
                  >
                    الاقل
                  </p>
                </div>
              </span>
            </div>
          </div>
          {/* <Container> */}
          <BranchesHome Categories={Categories} />
          <InfiniteScroll
            dataLength={SearchresultArr.length}
            next={FetchData}
            hasMore={true}
            // loader={<h4>Loading...</h4>}
          >
            <Row>{ShopData}</Row>
          </InfiniteScroll>
          {/* </Container> */}
        </Col>
      </Row>
    </div>

    <Service />
   <LastofOffersProducts />

    <FooterBar />

    </>

  );
};

export default ShopProducts;
