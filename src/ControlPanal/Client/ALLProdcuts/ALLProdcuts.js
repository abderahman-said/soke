import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrdersJson } from "../../../../store/ControlPanalSlice";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../../../../Layout/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import EmptyCart from "../../../../../images/emptyCart.svg";
import "./AllProduct.css";
const ALLProdcuts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { CustomerOrdersJsonArr } = useSelector(
    (state) => state.ControlPanalSlice
  );
  useEffect(() => {
    const UserId = window.localStorage.getItem("ClientId");
    if (!CustomerOrdersJsonArr) {
      dispatch(getCustomerOrdersJson(UserId));
    }
  }, [CustomerOrdersJsonArr, dispatch]);

  const ALlClientOrders =
    CustomerOrdersJsonArr && CustomerOrdersJsonArr.length > 0 ? (
      CustomerOrdersJsonArr.map((ele, idx) => {
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
        <h2>لم تشتري منتجات بعد</h2>
        <p>تصفح فئاتنا واكتشف أفضل عروضنا</p>
      </div>
    );
  return (
    <div>
      <h1 className="main-heading">جميع الطلبات</h1>
      <Container>
        <Row>{ALlClientOrders}</Row>
      </Container>
    </div>
  );
};

export default ALLProdcuts;
