import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { useParams, NavLink } from "react-router-dom";
import { getBranchesProducts } from "../../store/CategoriesSlice";
import { Slider } from "primereact/slider";
import ProductCard from "../../Layout/ProductCard/ProductCard";
import { Helmet } from "react-helmet";
import { Accordion, AccordionTab } from "primereact/accordion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import { ImageUrlGlobal } from "../../../App";
import { FiMenu } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import EmptyCart from "../../../images/emptyCart.svg";
import BranchesHome from "../Home/BranchesHome/BranchesHome";
import SearchHesder from "./../../Static/SearchHesder/SearchHesder";

const BranchesProducts = () => {
  const [page, setPagenumber] = useState(1);
  const [page2, setPagenumber2] = useState(1);
  const dispatch = useDispatch();
  const [expensive, setExpensive] = useState(false);
  const [Range, setRange] = useState([0, 25000]);
  const [sortType, setSortType] = useState("الاقل");
  const {
    getBranchesProductsArr,
    BranchesCatList,
    Categories,
    BranchesLoading,
  } = useSelector((state) => state.CategoriesSlice);
  const { id, name } = useParams();

  useEffect(() => {
    if (page === 1) {
      const data = {
        catId: parseFloat(id),
        userId: parseFloat(window.localStorage.getItem("ClientId")),
        page: 0,
        query: "",
      };
      dispatch(getBranchesProducts(data));
    }
  }, [dispatch, id, page]);

  const FetchData = () => {
    setPagenumber2((state) => state + 1);
    const data = {
      catId: parseFloat(id),
      userId: parseFloat(window.localStorage.getItem("ClientId")),
      page: page2,
      query: "",
    };
    dispatch(getBranchesProducts(data));
  };

  const Count =
    getBranchesProductsArr.length > 0 &&
    [...getBranchesProductsArr].filter(
      (item, e) =>
        parseFloat(item.priceAfter).toFixed(0) >= Range[0] &&
        parseFloat(item.priceAfter).toFixed(0) <= Range[1]
    );

  const ShopData =
    getBranchesProductsArr.length > 0 &&
    [...getBranchesProductsArr]
      .filter(
        (item, e) =>
          parseFloat(item.priceAfter).toFixed(0) >= Range[0] &&
          parseFloat(item.priceAfter).toFixed(0) <= Range[1]
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
          <Col className="Product-col" xs={6} md={3} key={idx}>
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
        );
      });

  const CatgeoriesSelect =
    BranchesCatList.length > 0 &&
    BranchesCatList.map((ele, idx) => {
      const pathName = ele.name.replace(/\s/g, "-");
      return (
        <div key={idx} className="Cat-Filter">
          <Link
            href={`/shop/${ele.id}/${pathName}`}
            onClick={() => {
              setPagenumber(1);
              window.scrollTo({
                top: 0,
                left: 100,
                behavior: "instant",
              });
            }}
          >
            {ele.name}
            <div className="img-container">
              <LazyLoadImage
                src={`https://souq.deltawy.com/imag?id=${ele.icon}`}
                alt={ele.name}
                effect="blur"
              />
            </div>
          </Link>
          {/* <button
            onClick={() => {
              dispatch(getNestedBranch(ele.id));
            }}
          >
            {ele.name}
          </button> */}
        </div>
      );
    });

  const TestNav = (
    <Accordion multiple>
      {/* {BranchesCatList.length > 0 && (
        <AccordionTab header="التصنيفات">
          <div className="main-container-Filter shop-cat">
            {CatgeoriesSelect}
          </div>
        </AccordionTab>
      )} */}
      <AccordionTab header="السعر">
        <div className="accContainer">
          <div className="slider-demo ">
            <div className="slider-header-container">
              <span>{Range[1]} ج</span>
              <span>{Range[0]} ج</span>
            </div>
            <Slider
              max={25000}
              min={0}
              value={Range}
              onChange={(e) => setRange(e.value)}
              range
            />
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  );

  // const ShopSchema =
  //   getBranchesProductsArr.length > 0 &&
  //   getBranchesProductsArr.slice(0, 20).map((ele) => {
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
  //   console.log(ShopSchema)

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta itemprop="name" content={name} />
        <meta name="keywords" content={name} />
        {/* <meta
          name="description"
          content=" سوق المحلة   جاكيت و بليزر حريمي موبايلات متنوع المنتجات المكافحة للشيخوخة الكتـرونيات سويت شيرت رجالى   "
        /> */}
        {/* <meta name="author" content="  سوق المحلة" /> */}
        <meta property="og:title" content={name} />
        {/* {getBranchesProductsArr.lenght > 0 && (
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "ItemList",
            url: `http://multivarki.ru/brand_502/`,
            numberOfItems: "20",
          })}
          {/* itemListElement: [ShopSchema], */}
        </script>
      </Helmet>
      {getBranchesProductsArr.length > 0 ? (
        <Row>
          <Col md={3}>
            <div className="sticky-cat-filt">
              {" "}
              <div className="CatHeader">
                <FiMenu />
                <h2>التصنيفات الفرعية</h2>
                <IoMdArrowDropdown />
              </div>
              {BranchesCatList.length > 0 && (
                <div className="main-container-Filter shop-cat">
                  {CatgeoriesSelect}
                </div>
              )}
              {TestNav}
            </div>
          </Col>
          <Col md={9}>
            <SearchHesder res={12} />
            <div className="SortBy">
              <div className="Number-of-products">
                <h5>عدد المنتجات : </h5>
                <span>
                  {getBranchesProductsArr.length > 0 ? Count.length : "0"}
                </span>
              </div>
              <div className="Number-of-products SortDiv">
                <h5>ترتيب حسب : </h5>
                <span className="typeSelected">
                  {sortType}
                  <div className="SortByDrop">
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
            <Container fluid>
              <BranchesHome Categories={Categories} />

              <InfiniteScroll
                dataLength={
                  getBranchesProductsArr.length > 0
                    ? getBranchesProductsArr.length
                    : 10
                }
                next={FetchData}
                hasMore={true}
                // loader={<h4>Loading...</h4>}
              >
                <Row>{ShopData}</Row>
              </InfiniteScroll>
            </Container>
          </Col>
        </Row>
      ) : (
        <div className="CartEmpty">
          <div className="card-container-empty">
            <LazyLoadImage src={EmptyCart} effect="blur" alt="empty" />
          </div>
          <h3> لا يوجد منتجات الان !</h3>
          <p>تصفح فئاتنا واكتشف أفضل عروضنا</p>
        </div>
      )}
    </>
  );
};

export default BranchesProducts;
