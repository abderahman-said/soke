import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveCustomerrders } from "../../../../store/ControlPanalSlice";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../../../../Layout/ProductCard/ProductCard";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import EmptyCart from "../../../../../images/emptyCart.svg";

import { useNavigate } from "react-router-dom";
const ActiveProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ActiveCustomerrdersArr } = useSelector(
    (state) => state.ControlPanalSlice
  );
  useEffect(() => {
    const UserId = window.localStorage.getItem("ClientId");
    if (!ActiveCustomerrdersArr) {
      dispatch(getActiveCustomerrders(UserId));
    }
  }, [ActiveCustomerrdersArr, dispatch]);

  const ALlClientOrders =
    ActiveCustomerrdersArr && ActiveCustomerrdersArr.data.length > 0 ? (
      ActiveCustomerrdersArr.data.map((ele, idx) => {
        return (
          <Col
            md={9}
            key={idx}
            onClick={() => navigate(`/cp/orders/${ele.orderId}`)}
          >
            <div className="OrderProduct">
              <div className="Product-right">
                <ProductCard
                  key={idx}
                  CatName={ele.catName}
                  ProductName={ele.productName}
                  image={ele.imageId}
                  id={ele.orderId}
                  MarketImage={ele.matgarLogo}
                  imgWid={118}
                  imgHei={110}
                />
              </div>
              <div className="Orderinfo">
                <div>
                  <p>رقم الاوردر: {ele.productId}</p>
                  <p>{ele.dat}</p>
                </div>
                {/* <p className="track">رقم التتبع: {ele.trackId}</p> */}
                <div>
                  <p>الكمية: {ele.units}</p>
                  <p>الحساب الاجمالي: {ele.total} ج</p>
                </div>
                <div>
                  <button name="login" type="button" className="submit-button">
                    التفاصيل
                  </button>
                  <p className="state">{ele.state}</p>
                </div>
              </div>
            </div>
          </Col>
        );
      })
    ) : (
      <div className="CartEmpty">
        <div className="card-container-empty">
          <LazyLoadImage src={EmptyCart} effect="blur" alt="empty" />
        </div>
        {/* <h2>لم تشتري منتجات بعد</h2> */}
        <h3>لا يوجد طلبات نشطة الان</h3>
        {/* <p>اضف منتجاتك و عروضك الخاصة في المتجر</p> */}
        <p>تصفح فئاتنا واكتشف أفضل عروضنا</p>
      </div>
    );
  return (
    <div>
      <h1 className="main-heading">الطلبات النشطة</h1>

      <Container>
        <Row>{ALlClientOrders}</Row>
      </Container>
    </div>
  );
};

export default ActiveProducts;
