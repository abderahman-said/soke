"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Layout/ProductCard/ProductCard";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../app/page.module.css";
import { getSearchResult } from "../../store/ShopSlice";

const LastofOffersProducts = () => {
  const dispatch = useDispatch();
  const { lastOfferArr } = useSelector((state) => state.OfferSlice);
  const { LastProductArr, SearchresultArr } = useSelector(
    (state) => state.ShopSlice
  );
  const { MostViewedArr } = useSelector((state) => state.CategoriesSlice);
  useEffect(() => {
    if (SearchresultArr.length === 0) {
      const ID = parseInt(window.localStorage.getItem("ClientId"));
      const data = {
        catId: 0,
        userId: ID,
        page: 0,
        query: "",
      };
      dispatch(getSearchResult(data));
    }
  }, [dispatch, SearchresultArr.length]);
  const ShopData =
    LastProductArr.length > 0 &&
    [...LastProductArr].slice(0, 4).map((ele, idx) => {
      const pathName = ele.name.replace(/\s/g, "-");
      const imageID = ele.images[0];
      return (
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
          clsName={"Last-div"}
          Goto={"product"}
          imgWid={100}
          imgHei={100}
        />
      );
    });

  const OfferSlick =
    lastOfferArr &&
    lastOfferArr.slice(0, 4).map((ele, idx) => {
      const pathName = ele.name.replace(/\s/g, "-");
      const imageID = ele.images[0];
      return (
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
          clsName={"Last-div"}
          Goto={"product"}
          imgWid={100}
          imgHei={100}
        />
      );
    });
  const Mostview =
    MostViewedArr &&
    MostViewedArr.offers.slice(0, 4).map((ele, idx) => {
      const pathName = ele.name.replace(/\s/g, "-");
      const imageID = ele.images[0];
      return (
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
          clsName={"Last-div"}
          Goto={"product"}
          imgWid={100}
          imgHei={100}
        />
      );
    });
  return (
    <div  className={styles.LastofOffersProducts}>
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <h2  className={styles.LastHeading}>اخر المنتجات</h2>
            {ShopData}
          </Col>
          <Col xs={12} md={4}>
            <h2  className={styles.LastHeading}>الاكثر مشاهدة</h2>
            {Mostview}
          </Col>
          <Col xs={12} md={4}>
            <h2  className={styles.LastHeading}>اخر العروض</h2>
            {OfferSlick}
          </Col> 
        </Row>
      </Container>
    </div>
  );
};

export default LastofOffersProducts;
