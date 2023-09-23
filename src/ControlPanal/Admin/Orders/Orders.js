import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMatgarOrders } from "../../../../store/ControlPanalSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import working from "../../../../../images/emptyCart.svg";
import "./Orders.css";
import ProductCard from "../../../../Layout/ProductCard/ProductCard";
const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { MatgarOrdersArr } = useSelector((state) => state.ControlPanalSlice);
  useEffect(() => {
    const UserId = window.localStorage.getItem("ClientId");
    if (!MatgarOrdersArr) {
      const data = {
        id: UserId,
        page: 1,
      };
      dispatch(getMatgarOrders(data));
    }
  }, [dispatch, MatgarOrdersArr]);

  const OrderMatger =
    MatgarOrdersArr && MatgarOrdersArr.length > 0 ? (
      MatgarOrdersArr.map((ele, idx) => {
        // onClick={() => navigate(`/cp/orders/${ele.orderId}`)}
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
                  Rate={ele.rate === 0 ? 1 : ele.rate}
                  id={ele.orderId}
                  MarketImage={ele.matgarLogo}
                  imgWid={118}
                  imgHei={110}
                />
              </div>
              <div className="Orderinfo">
                <div>
                  <p>رقم الاوردر: {ele.orderId}</p>
                  <p>{ele.dat}</p>
                </div>
                <p className="track">رقم التتبع: {ele.trackId}</p>
                <div>
                  <p>الكمية: {ele.amount}</p>
                  <p>الحساب الاجمالي: {ele.total} ج</p>
                </div>
                <div>
                  <button name="login" type="button" className="submit-button">
                    التفاصيل
                  </button>
                  <p className="state">{ele.stat}</p>
                </div>
              </div>
            </div>
          </Col>
        );
      })
    ) : (
      <Col>
        <div className="CartEmpty">
          <div className="card-container-empty">
            <LazyLoadImage src={working} effect="blur" alt="empty" />
          </div>
          <h3>لا يوجد طلبات الان من العملاء</h3>
          <p>اضف منتجاتك و عروضك الخاصة لكي يتم جذب العملاء</p>
        </div>
      </Col>
    );

  return (
    <div className="Orders">
      <h1 className="main-heading">جميع الطلبات</h1>
      <Container>
        <Row>{OrderMatger}</Row>
      </Container>
    </div>
  );
};

export default Orders;
