"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import BranchesHome from "./BranchesHome/BranchesHome";
import HomeHeader from "./HomeHeader/HomeHeader";
import MatgersHome from "./MatgersHome/MatgersHome";
import SlickSections from "./SlickSections/SlickSections";
import { Col, Container, Row } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import SearchHesder from "./../../Static/SearchHesder/SearchHesder";
import styles from "../../app/page.module.css"
import CategoriesSlice, { Subcategories, getBranchesProducts, getHomeHeaders, getMainCat, getMostViewed } from "@/store/CategoriesSlice";
import { getMarkets } from "@/store/MarketsSlice";
import { getOffers } from "@/store/OfferSlice";
import { getSearchResult, searchChar } from "@/store/ShopSlice";

const Home = () => {
  const  {Categories}  = useSelector((state) => state.CategoriesSlice);
  console.log("d" , Categories);
  // const { LoginSouq } = useSelector((state) => state.authSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeHeaders());
    dispatch(getSearchResult());
    dispatch(searchChar());
    dispatch(Subcategories());
    dispatch(getBranchesProducts());
    dispatch(getHomeHeaders());
    dispatch(getMarkets(0));
    dispatch(getOffers(0));
    dispatch(getMainCat(0));
    dispatch(getMostViewed());
  }, [dispatch]);
  return (
    <div>


      {/* <Helmet>
        <title>سوق المحلة</title>
        <meta
          name="description"
          content=" سوق المحلة   شباشب حريمي محفظة حريمي موبايلات أساور مكياج بدي و تونيك حريمي"
        />

        <meta itemprop="name" content="سوق المحلة" />
        <meta
          itemprop="description"
          content=" سوق المحلة   شباشب حريمي محفظة حريمي موبايلات أساور مكياج بدي و تونيك حريمي"
        />
        <meta
          itemprop="image"
          content="https://apps.souq-mahala.com/javax.faces.resource/logo.png.html?ln=imgs"
        />

        <meta property="og:url" content="https://souq-mahala.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="سوق المحلة" />
        <meta
          property="og:description"
          content=" سوق المحلة   شباشب حريمي محفظة حريمي موبايلات أساور مكياج بدي و تونيك حريمي"
        />
        <meta
          property="og:image"
          content="https://apps.souq-mahala.com/javax.faces.resource/logo.png.html?ln=imgs"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="سوق المحلة" />
        <meta
          name="twitter:description"
          content=" سوق المحلة   شباشب حريمي محفظة حريمي موبايلات أساور مكياج بدي و تونيك حريمي"
        />
        <meta
          name="twitter:image"
          content="https://apps.souq-mahala.com/javax.faces.resource/logo.png.html?ln=imgs"
        />
      </Helmet> */}
      <Container fluid>
        <Row>
          <Col xs={12} md={3}  className={styles.diff_col_screen2}>
            <div  className={styles.CatHeader}>
              <FiMenu />
              <h2>التصنيفات</h2>
              <IoMdArrowDropdown />
            </div>
          </Col>
          <SearchHesder res={8} />
        </Row>
      </Container>

      <HomeHeader Categories={Categories} />

      {/* <BranchesHome Categories={Categories} /> */}
      <MatgersHome />
      <SlickSections Categories={Categories} />
    </div>
  );
};

export default Home;
