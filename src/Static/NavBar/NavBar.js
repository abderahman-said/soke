"use client"
import React, { useEffect, useState } from "react";
import {
  AiFillHome,
  AiOutlineShop,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RiArrowRightSLine, RiMenu4Line } from "react-icons/ri";
import { GrUserSettings } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
import { IoLogIn, IoPersonOutline } from "react-icons/io5";
import { Col, Row } from "react-bootstrap";
import { Sidebar } from "primereact/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, getSearchResult, searchChar } from "../../store/ShopSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../../public/images/logo512.png";
import { MdLocalOffer, MdProductionQuantityLimits } from "react-icons/md";
import { Logout } from "../../store/ControlPanalSlice";
import { FiLogOut } from "react-icons/fi";
import styles from "../../app/page.module.css";
import Link from "next/link";
import Image from "next/image";

const options = [
  {
    // name: "Enable both scrolling & backdrop",
    scroll: true,
    backdrop: true,
  },
];

function OffCanvasExample({ ...props }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "700" : "normal",
      color: isActive ? "#253b70" : "#000",
      fontSize: isActive ? "22px" : "20px",
    };
  };

  return (
    <div>
      <button
        onClick={toggleShow}
          className={styles.mobileButton}
        name="navbar"
        type="button"
      >
        <RiMenu4Line className="mobileIcon" />
      </button>
      <Offcanvas
        show={show}
         className={styles.dallel_canves}
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>القائمة</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={styles.Links_nav_container}>
            <Link
              onClick={() => {
                handleClose();
                window.scrollTo({
                  top: 0,
                  left: 100,
                  behavior: "instant",
                });
                window.scrollTo({
                  top: 0,
                  left: 100,
                  behavior: "instant",
                });
              }}
              className={`${styles.Navitem} ${styles.nav_link}`}
              style={navLinkStyles({ isActive: true })}
              href="/"
            >
              <AiFillHome />
              الرئيسية
            </Link>
            <Link
              onCLinklick={() => {
                handleClose();
                window.scrollTo({
                  top: 0,
                  left: 100,
                  behavior: "instant",
                });
              }}
              className={`${styles.Navitem} ${styles.nav_link}`}

              style={navLinkStyles({ isActive: true })}
              href="/offers"
            >
              <MdLocalOffer />
              العروض
            </Link>
            <Link
              onClick={() => {
                handleClose();
                window.scrollTo({
                  top: 0,
                  left: 100,
                  behavior: "instant",
                });
              }}
              className={`${styles.Navitem} ${styles.nav_link}`}
              style={navLinkStyles({ isActive: true })}
              href="/shop"
            >
              <MdProductionQuantityLimits />
              المتجر
            </Link>
            <Link
              onClick={() => {
                handleClose();
                window.scrollTo({
                  top: 0,
                  left: 100,
                  behavior: "instant",
                });
              }}
              className={`${styles.Navitem} ${styles.nav_link}`}
              style={navLinkStyles({ isActive: true })}
              href="/matgars"
            >
              <AiOutlineShop />
              المتاجر
            </Link>
            {window.localStorage.getItem("souqLogin") === "true" ? (
              <>
                <Link
                 className={`${styles.Navitem} ${styles.nav_link}`}
                  style={navLinkStyles({ isActive: true })}
                  href="/cp"
                  onClick={() => {
                    handleClose();
                    window.scrollTo({
                      top: 0,
                      left: 100,
                      behavior: "instant",
                    });
                  }}
                >
                  <GrUserSettings />
                  لوحه التحكم
                </Link>
                <Link
                  style={navLinkStyles({ isActive: true })}
                  href={"/"}
                  onClick={() => {
                    dispatch(Logout());
                    dispatch(ClearCart());
                  }}
                >
                  <FiLogOut />
                  تسجيل الخروج
                </Link>
              </>
            ) : (
              <Link
                style={navLinkStyles({ isActive: true })}
                to={"/login"}
                onClick={() => {
                  handleClose();
                  window.scrollTo({
                    top: 0,
                    left: 100,
                    behavior: "instant",
                  });
                }}
              >
                <IoLogIn />
                تسجيل الدخول
              </Link>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
const NavBar = () => {
  const dispatch = useDispatch();
  const { SearchresultArr, GetFromCartAarr, searchCharInput } = useSelector(
    (state) => state.ShopSlice
  );
  const [visibleTop, setVisibleTop] = useState(false);
  const [search, setSearch] = useState(searchCharInput);
  const [showNav2, setShowNav2] = useState(false);
  const [isNavBarCompTowVisible, setNavBarCompTowVisible] = useState(false);

  const { Categories } = useSelector((state) => state.CategoriesSlice);
  const CatgeoriesSelect =
    Categories &&
    Categories.cats.map((ele, idx) => {
      const pathName = ele.name.replace(/\s/g, "-");
      return (
        <li key={idx}  className={styles.Cat_Filter}>
          <Link href={`/shop/${ele.id}/${pathName}`}>
            {ele.name}
            <div className={styles.img_container}>
              <LazyLoadImage
                src={`https://souq.deltawy.com/imag?id=${ele.icon}`}
                // src={logo}
                alt={ele.name}
                effect="blur"
                width={40}
                height={40}
              />
            </div>
          </Link>
        </li>
      );
    });
    // const handleScroll = () => {
    //   if (window.scrollY >= 100 && window.innerWidth >= 500) {
    //     setNavBarCompTowVisible(true);
    //   } else {
    //     setNavBarCompTowVisible(false);
    //   }
    // };
    // const handleScroll = () => {
    //   if (window.scrollY >= 100 && window.innerWidth >= 500) {
    //     document.querySelector(".NavBarCompTow").style.opacity = 1;
    //     document.querySelector(".NavBarCompTow").style.display = "block";
    //   } else {
    //     document.querySelector(".NavBarCompTow").style.opacity = 0;
    //     document.querySelector(".NavBarCompTow").style.display = "none";
    //   }
    // };
    document.addEventListener("DOMContentLoaded", function () {
  const handleScroll = () => {
    if (window.scrollY >= 100 && window.innerWidth >= 500) {
      document.querySelector(".NavBarCompTow").style.opacity = 1;
      document.querySelector(".NavBarCompTow").style.display = "block";
      // console.log("start");
    } else {
      document.querySelector(".NavBarCompTow").style.opacity = 0;
      document.querySelector(".NavBarCompTow").style.display = "none";
      // console.log("end");
    }
  };

  // Attach scroll event listener
  window.addEventListener("scroll", handleScroll);
});
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const Searchhandeller = (e) => {
    if (search.length >= 1) {
      const ID = parseInt(window.localStorage.getItem("ClientId"));
      const data = {
        catId: 0,
        userId: ID,
        page: 0,
        query: search,
      };
      dispatch(getSearchResult(data));
    } else {
      const ID = parseInt(window.localStorage.getItem("ClientId"));
      const data = {
        catId: 0,
        userId: ID,
        page: 0,
        query: "",
      };
      dispatch(getSearchResult(data));
    }
  };
  const SearchResult =
    SearchresultArr &&
    search?.length > 0 &&
    SearchresultArr.slice(0, 5).map((ele, idx) => {
      return (
        <div
          key={idx}
          className={styles.search_Product}
          onClick={() => {
            dispatch(searchChar(ele.name));
            setSearch(ele.name);
            setVisibleTop(false);
          }}
        >
          <Link href={"/shop"}>
          <h5>{ele.name}</h5>
          <div className={styles.image_card}>
            <LazyLoadImage
              effect="blur"
              src={`https://souq.deltawy.com/imag?id=${ele.images[0]}`}
              alt={ele.name}
            />
          </div>
          </Link>
        </div>
      );
    });

    const navLinkStyles = ({ isActive }) => ({
      fontWeight: isActive ? "bold" : "500",
      color: isActive ? "#274160" : "#000",
      fontSize: isActive ? "22px" : "21px",
    });

    const MeueTowSyle = {
      opacity: showNav2 ? 1 : 0,
    };
    
    const NavHiddenStyle = {
      height: search?.length > 0 ? "25rem" : "10rem",
    };

  return (
    <>
      <Sidebar
        visible={visibleTop}
        position="top"
        onHide={() => setVisibleTop(false)}
        style={NavHiddenStyle}
         className={styles.showfrist}
      >
        <form>
          <div className={`${styles.search_section}  d-flex` }>
            <button
              type="submit"
              htmlFor="search"
              onClick={(e) => {
                e.preventDefault();
                dispatch(searchChar(search));
                setVisibleTop(false);
                window.scrollTo({
                  top: 0,
                  left: 100,
                  behavior: "instant",
                });
              }}
              className={styles.b_LOCK}
            >
             <Link href={"/shop"}> <BsSearch /></Link>
            </button>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="ابحث عن المنتجات"
              value={search}
              onChange={(e) => {
                // dispatch(searchChar(search));
                setSearch(e.target.value);
                Searchhandeller(e.target.value);
              }}
            />
          </div>
        </form>

        <div>{SearchResult}</div>
      </Sidebar>
      <div className={styles.NavBar} onClick={() => setShowNav2(true)}>
        <div  className={`${styles.NavBarComp} ${styles.disFlex}`}>
          <div className=" d-sm-block d-lg-none" >
            {options.map((props, idx) => (
              <OffCanvasExample key={idx} placement={"end"} {...props} />
            ))}
          </div>
          <div  className={styles.Souq}>
            {/* <Link href="/" > */}
              <Image
                src={logo}
                alt="logo"
                width={180}
                height={75}
                effect="blur"
              />
            {/* </Link> */}
          </div>
          <div  className={`${styles.NavList} ${styles.disFlex}`}>
            <nav className="navbar navbar-expand-lg navbar-light " >
              <div className="container-fluid" >
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item" >
                      <Link
                        className="nav-link Navitem "
                        href="/"
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            left: 100,
                            behavior: "instant",
                          });
                        }}
                        style={navLinkStyles({ isActive: true })}
                      >
                        الرئيسية
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link Navitem "
                        href="/shop"
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            left: 100,
                            behavior: "instant",
                          });
                        }}
                        style={navLinkStyles({ isActive: true })}
                      >
                        المتجر
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link Navitem"
                        href="/offers"
                        style={navLinkStyles({ isActive: true })}
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            left: 100,
                            behavior: "instant",
                          });
                        }}
                      >
                        العروض
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link Navitem"
                        href="/matgars"
                        style={navLinkStyles({ isActive: true })}
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            left: 100,
                            behavior: "instant",
                          });
                        }}
                      >
                        المتاجر
                      </Link>
                    </li>
                    {window.localStorage.getItem("souqLogin") === "true" && (
                      <li className="nav-item">
                        <Link
                          className="nav-link Navitem"
                          href="/cp"
                          style={navLinkStyles({ isActive: true })}
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              left: 100,
                              behavior: "instant",
                            });
                          }}
                        >
                          لوحة التحكم
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div  className={styles.disFlex} >
            <div  className={`${styles.cartIcon} ${styles.disFlex}`}>
              <p> <Link href={"/cart"} >سلة التسوق</Link></p>
              <div  className={styles.shop_icon_div}>
              <Link href={"/cart"} >
                <AiOutlineShoppingCart />
                <span>{GetFromCartAarr ? GetFromCartAarr.count : 0}</span>
                </Link></div>
            </div>
            <div className={`${styles.menu_left_section} ${styles.main_nav}`}>
            
              <div
                className={styles.setting}
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    left: 100,
                    behavior: "instant",
                  });
                }}
              >
                <Link href={"/login"}>
                <IoPersonOutline  className={styles.cp_icon} />
                <ul  className={styles.ul_animation}>
                  <li>
                    <IoPersonOutline />
                    <p
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          left: 100,
                          behavior: "instant",
                        });
                      }}
                    >
                      حسابي
                    </p>
                  </li>
                  <li>
                    <IoPersonOutline />
                    <p> اشتراك</p>
                  </li>
                </ul>
                </Link>
              </div>
            
            </div>
          </div>
        </div>
        <div className={styles.NavBarCompTow} style={{ opacity: isNavBarCompTowVisible ? 1 : 0 }}>
          <div className="container" >
            <div>
              <Row   className={styles.secMenu}>
                <Col md={3} lg={3}>
                  <div  className={styles.drop_section_menu}>
                    <div  className={styles.drop_header}>
                      <RiArrowRightSLine />
                      <h3>التصنيفات</h3>
                    </div>
                    <ul  className={styles.ul_animation}>{CatgeoriesSelect}</ul>
                  </div>
                </Col>
                <Col md={7} lg={7}>
                  <div  className={styles.MiddelNav}>
                    <Link
                      className="nav-link Navitem "
                      style={navLinkStyles({ isActive: true })}
                      href="/"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          left: 100,
                          behavior: "instant",
                        });
                      }}
                    >
                      الرئيسية
                    </Link>
                    <Link
                      className="nav-link Navitem "
                      style={navLinkStyles({ isActive: true })}
                      href="/shop"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          left: 100,
                          behavior: "instant",
                        });
                      }}
                    >
                      المتجر
                    </Link>
                    <Link
                      className="nav-link Navitem"
                      style={navLinkStyles({ isActive: true })}
                      href="/offers"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          left: 100,
                          behavior: "instant",
                        });
                      }}
                    >
                      العروض
                    </Link>
                    <Link
                      className="nav-link Navitem"
                      style={navLinkStyles({ isActive: true })}
                      href="/matgars"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          left: 100,
                          behavior: "instant",
                        });
                      }}
                    >
                      المتاجر
                    </Link>
                    {window.localStorage.getItem("souqLogin") === "true" && (
                      <Link
                        className="nav-link Navitem"
                        style={navLinkStyles({ isActive: true })}
                        href="/cp"
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            left: 100,
                            behavior: "instant",
                          });
                        }}
                      >
                        لوحه التحكم
                      </Link>
                    )}
                  </div>
                </Col>
                <Col md={2} lg={2}>
                  <div  className={styles.menu_left_section}>
                    <div
                      className={styles.shoping2}
                      onClick={() => setVisibleTop(true)}
                    >
                      <BsSearch />
                    </div>
                    <div
                      className={styles.shoping2}
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          left: 100,
                          behavior: "instant",
                        });
                      }}
                    >
                      <Link href={"/cart"} >
                      <AiOutlineShoppingCart />
                      <span>{GetFromCartAarr ? GetFromCartAarr.count : 0}</span>
                      </Link>
                    </div>
                    <div className={styles.setting} >
                      <IoPersonOutline />
                      <ul className={styles.ul_animation}>
                        <li>
                          <IoPersonOutline />
                          <p
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                left: 100,
                                behavior: "instant",
                              });
                            }}
                          >
                          <Link href={"/login"} >  حسابي{" "}
                          </Link> </p>
                        </li>
                        <li>
                          <IoPersonOutline />
                          <p> اشتراك</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
