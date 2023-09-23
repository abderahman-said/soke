import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import ControlNav from "./ControlNav/ControlNav";
import  styles from "../app/page.module.css";
import SearchHesder from "./../../Static/SearchHesder/SearchHesder";
import { useDispatch, useSelector } from "react-redux";
import { getjsonStrings, getUserInfo } from "./../../store/ControlPanalSlice";
import Alert from "react-bootstrap/Alert";

const ControlPanal = () => {
  const dispatch = useDispatch();

  const { userInfo, JsonStringsArr } = useSelector(
    (state) => state.ControlPanalSlice
  );
  useEffect(() => {
    const UserId = window.localStorage.getItem("ClientId");
    if (!userInfo) {
      dispatch(getUserInfo(UserId))
        .unwrap()
        .then((res) => {
          window.localStorage.setItem("souqUserName", res.name);
          window.localStorage.setItem("souqUserEmail", res.email);
          window.localStorage.setItem("souqUserPhone", res.phone);
          window.localStorage.setItem("souqUseraddress", res.address);
          window.localStorage.setItem("souqUserLogo", res.logo);
          // setName(res.name);
          // setMail(res.email);
          // setPhone(res.phone);
          // setAddress(res.address);
          // setLoadingImage(res.logo);
        });
    }

    if (!JsonStringsArr) {
      dispatch(getjsonStrings(UserId));
    }
  }, [dispatch, userInfo, JsonStringsArr]);

  const Pending =
    JsonStringsArr &&
    JsonStringsArr.map((ele, idx) => {
      return (
        <Alert key={idx} variant={"danger"}>
          {ele.name}
        </Alert>
      );
    });

  // function ScrollToTop() {
  //   const { pathname } = useLocation();
  //   useEffect(() => {
  //     window.scrollTo({
  //       top: 0,
  //       left: 100,
  //       behavior: "instant",
  //     });
  //   }, [pathname]);
  //   return null;
  // }
  return (
    <div className={styles.ControlPanal} >
      <Container fluid>
        <Row>
          <Col md={3}>
            <div className={styles.main_contron_panal}>
              <ControlNav />
            </div>
          </Col>
          <Col md={9}>
            <SearchHesder res={12} />
            {Pending}
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ControlPanal;
