"use client"
import React from "react";
import { Col, Container,  Row } from "react-bootstrap";

import { CgChevronDoubleLeft } from "react-icons/cg";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import "./footer.css";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
// HiOutlineMail
const Footer = () => {
  return (
    <div className="Footer">
      {/* <div
        className="subscribe"
        style={{ backgroundImage: `url(${imgFooter})` }}
      >
        <div className="content">
          <div className="content-p">
            <p>
              <span>اشترك الان</span> لمزيد من العروض والخصومات والقائمة
              البريدية{" "}
            </p>
          </div>
          <div className="content-subscribe">
            <div className="search-section">
              <label htmlFor="search">
                {" "}
                <HiOutlineMail />
              </label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="ادخل عنوان البريد الالكتروني ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button name="subscribe">اشترك الان</button>
          </div>
        </div>
      </div> */}
      <footer>
        <Container>
          <Row className="text-center footer-row">
            <Col md={2} className="column-footer">
              <ul className="SouqImage_container">
                <li>
                  <div
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.Deltawy.DeltawyNet",
                        "_blank"
                      );
                    }}
                  >
                    <LazyLoadImage
                      effect="blur"
                      src="https://souq.deltawy.com/javax.faces.resource/logo.png.html?ln=imgs"
                      alt="Clipart Google Play Logo PNG Photos @transparentpng.com"
                    />
                  </div>
                </li>
                <li>
                  <div className="Souq_Links">
                    <FaFacebookF />
                    <BsTwitter />
                    <AiFillInstagram />
                  </div>
                </li>
              </ul>
            </Col>
            {/* <Col md={3} className="column-footer">
              <h3>للشراء من السوق </h3>
              <hr />
              <p>
                دليل المحلة الإلكتروني - هو دليل ومحرك بحث شامل للشركات وهو دليل
                صناعي وتجاري وخدمي يشمل كافة القطاعات والأشخاص المهنيين ، من
                مميزات الدليل: طريقة العرض والبحث حداثة ودقة بياناته في جميع
                المجالات يتميز بأنه مطور بتقنيات برمجية حديثة الدليل بالكامل
                مجاناً لمن يريد البحث عن أي شئ يتميز بقوة نتائجه في محركات البحث
                يتميز الدليل بالسرعة في أرشفة البيانات في محركات البحث العالمية
                الدليل إشهار ممتاز للشركات التجارية والقطاعات الخدمية والأشخاص
                أصحاب الأعمال
              </p>
            </Col> */}
            <Col md={2} className="column-footer">
              <h3> للشراء من السوق</h3>
              <hr />
              <ul>
                <li>
                  {" "}
                  <Link href={"/"}>كبف تشترى من السوق</Link>{" "}
                  <CgChevronDoubleLeft className="footer-arrow-icon" />
                </li>
                <li>
                  {" "}
                  <Link  href={"/"}>الشحن</Link>{" "}
                  <CgChevronDoubleLeft className="footer-arrow-icon" />
                </li>
                <li>
                  {" "}
                  <Link  href={"/login"}> عملية الاسترجاع </Link>
                  <CgChevronDoubleLeft className="footer-arrow-icon" />
                </li>
              </ul>
            </Col>

            <Col md={2} className="column-footer">
              <h3> أصحاب المتاجر</h3>
              <hr />
              <ul>
                <li>
                  {" "}
                  <Link  href={"/"}>كيفية التسجيل</Link>{" "}
                  <CgChevronDoubleLeft className="footer-arrow-icon" />
                </li>
                <li>
                  {" "}
                  <Link  href={"/"}>ادخال بيانات المتجر</Link>{" "}
                  <CgChevronDoubleLeft className="footer-arrow-icon" />
                </li>
                <li>
                  {" "}
                  <Link  href={"/login"}> انشاء العروض </Link>
                  <CgChevronDoubleLeft className="footer-arrow-icon" />
                </li>
              </ul>
            </Col>

            {/* <Col md={2} className="column-footer">
              <h3> خدمتنا </h3>
              <hr />
              <ul>
                <li>
                  {" "}
                  <Link  href={"/"}>توصيل للمنزل</Link>{" "}
                  <CgChevronDoubleLeft className="footer-arrow-icon" />
                </li>
                <li>
                  {" "}
                  <Link  href={"/"}>دعم فنى</Link>{" "}
                  <CgChevronDoubleLeft className="footer-arrow-icon" />
                </li>
                <li>
                  {" "}
                  <Link  href={"/login"}> ضمان الجودة</Link>
                  <CgChevronDoubleLeft className="footer-arrow-icon" />
                </li>
              </ul>
            </Col> */}

            <Col md={2} className="column-footer">
              <h3> خدمتنا </h3>
              <hr />
              <ul>
                <li>
                  {" "}
                  <Link  href={"/"}>التلفون : 01067439828 </Link>{" "}
                  <CgChevronDoubleLeft className="footer-arrow-icon" />
                </li>
                <li>
                  {" "}
                  <Link  href={"/"}>
                    الايميل : admin@souq-mahala.com{" "}
                  </Link>{" "}
                  <CgChevronDoubleLeft className="footer-arrow-icon" />
                </li>
              </ul>
            </Col>
            <Col md={3} className="column-footer">
              <h3>حمل التطبيق</h3>
              <hr />
              <ul className="googleplay-container">
                <li>
                  <div
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.detawy.souq_ma7alla",
                        "_blank"
                      );
                    }}
                  >
                    <LazyLoadImage
                      width={100}
                      height={100}
                      effect="blur"
                      src="https://www.transparentpng.com/thumb/google-play-logo/clipart-google-play-logo-png-photos-14.png"
                      alt="Clipart Google Play Logo PNG Photos @transparentpng.com"
                    />
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
          <LazyLoadComponent>
            <div className="rights-container">
              <h2 className="text-center">جميع الحقوق محفوظة لدي</h2>
              <div
                className="rights-logo"
                onClick={() => {
                  window.open("https://deltawy.com/", "_blank");
                }}
              >
                {" "}
                <LazyLoadImage
                  width={200}
                  height={50}
                  effect="blur"
                  src="https://deltawy.com/images/logo.svg"
                  alt="تصميم و برمجة شركة دلتاوي للبرمجيات وتصميم المواقع و تطبيقات الموبايل"
                />
              </div>
            </div>
          </LazyLoadComponent>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
