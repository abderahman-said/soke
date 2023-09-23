import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import working from "../../../../../images/emptyCart.svg";
import { getOrderDetails } from "../../../../store/ControlPanalSlice";
const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { OrderDetailsArr } = useSelector((state) => state.ControlPanalSlice);
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  const OrderDetails = OrderDetailsArr && <div>{OrderDetailsArr.name}</div>;
  return (
    <>
      {" "}
      {/* {OrderDetails} */}
      {/*  */}
      <div className="CartEmpty">
        <div className="card-container-empty">
          <LazyLoadImage src={working} effect="blur" alt="empty" />
        </div>
        <h3>نقوم بالعمل علي هذه الصفحة الان</h3>
        <p>تصفح فئاتنا واكتشف أفضل عروضنا</p>
      </div>
    </>
  );
};

export default OrderDetails;
