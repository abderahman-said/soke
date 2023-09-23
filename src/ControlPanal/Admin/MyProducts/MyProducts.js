import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import EmptyCart from "../../../../../images/emptyCart.svg";
import Modal from "react-bootstrap/Modal";
import {
  AddProduct,
  getjsonStrings,
  getMatgarProducts,
  GetMatgerCats,
} from "../../../../store/ControlPanalSlice";
import { TiDelete } from "react-icons/ti";
import { RiAddCircleLine } from "react-icons/ri";

// TiDeleteOutline
import { Dropdown } from "primereact/dropdown";
import ProductCard from "./../../../../Layout/ProductCard/ProductCard";
import { Toast } from "primereact/toast";
import "./MyProducts.css";
import { Subcategories } from "../../../../store/CategoriesSlice";
const MyProducts = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [cat, SelectCat] = useState(null);
  const [catid, SelectCatid] = useState(null);
  const [Matgercat, SelectMatgerCat] = useState(null);
  const [Matgercatid, MatgerSelectCatid] = useState(null);
  // const [MatgerTe, MatgerSelectCatid] = useState(null);
  const [images, setimages] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { MatgarProductsArr, MatgerCatsArr } = useSelector(
    (state) => state.ControlPanalSlice
  );
  const { SubcategoriesArr } = useSelector((state) => state.CategoriesSlice);

  useEffect(() => {
    const UserId = window.localStorage.getItem("ClientId");
    if (!MatgarProductsArr) {
      dispatch(getMatgarProducts(UserId));
      dispatch(GetMatgerCats(UserId));
    }
  }, [dispatch, MatgarProductsArr]);

  const Products =
    MatgarProductsArr && MatgarProductsArr.length > 0 ? (
      MatgarProductsArr.map((ele, idx) => {
        const pathName = ele.name.replace(/\s/g, "-");
        const imageID = ele.images[0];
        return (
          <Col className="Product-col" md={3} xs={6} key={idx}>
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
      })
    ) : (
      <div className="CartEmpty">
        <div className="card-container-empty">
          <LazyLoadImage src={EmptyCart} effect="blur" alt="empty" />
        </div>
        <h3> لم يتم اضافة منتجات</h3>
        <p>اضف منتجاتك و عروضك الخاصة في المتجر</p>
      </div>
    );

  const Selectcats = MatgerCatsArr && MatgerCatsArr.cats;
  const SelectMatgerCatsFilter = SubcategoriesArr && SubcategoriesArr.cats;
  //   ? Categories.cats.find((ele) => ele.id === catid)
  //   : null;

  const onCatChange = (e) => {
    SelectCat(e.value);
    SelectCatid(e.value.id);
    dispatch(Subcategories(e.value.id));
  };

  const onMatgerCatChange = (e) => {
    SelectMatgerCat(e.value);
    MatgerSelectCatid(e.value.id);
  };

  const SendDate = (e) => {
    const UserId = window.localStorage.getItem("ClientId");
    e.preventDefault();
    if (
      name.length === 0 ||
      price.length === 0 ||
      description.length === 0 ||
      !cat ||
      images.length <= 0
    ) {
      showError();
    } else {
      const data = {
        userId: UserId,
        categoryId: Matgercatid,
        productName: name,
        price,
        description,
        images,
      };
      dispatch(AddProduct(data))
        .unwrap()
        .then(() => {
          dispatch(getjsonStrings(UserId));
        });
      // console.log(data);
      showSuccess();
    }
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "برجاء ادخال جميع البيانات المطلوبة",
      life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "تم تحديث البيانات بنجاح",
      life: 3000,
    });
  };

  // const TestImages =
  //   images.length > 0 &&
  //   images.map((ele, idx) => {
  //     return (
  //       <img
  //         key={idx}
  //         src={`data:image/jpeg;base64,${ele}`}
  //         alt="tes"
  //         width={200}
  //         height={200}
  //       />
  //     );
  //   });
  const UploadImge = (file) => {
    // console.log(file[0]);
    const test = [...file];
    // console.log(test);
    test.map((ele) => {
      const reader = new FileReader();
      reader.readAsDataURL(ele);
      return (reader.onload = () => {
        // Make a fileInfo Object
        const baseURL = reader.result;
        const position = baseURL.search("base64,");
        const res = baseURL.slice(position + 7);
        setimages((current) => [...current, res]);
      });
    });
  };

  const DeletImage = (e) => {
    const result = images.filter((ele) => ele !== e);
    setimages(result);
  };

  const ProductsImage = images.map((ele, idx) => {
    return (
      <div className="Card-image" key={idx}>
        <LazyLoadImage
          src={`data:image/jpeg;base64,${ele}`}
          // src={`data:image/jpeg;base64,${Logo}`}
          // src={img}
          alt="matgerLogo"
          effect="blur"
          width={70}
          height={70}
        />
        <TiDelete onClick={() => DeletImage(ele)} />
      </div>
    );
  });

  return (
    <div className="MyProducts">
      <Toast ref={toast} />
      <h1 className="main-heading">منتجاتي</h1>
      {!show && (
        <button
          name="اضافة منتج"
          type="button"
          className="submit-button"
          onClick={() => {
            handleShow();
          }}
        >
          اضغط لاضافة منتج جديد
          <RiAddCircleLine />
        </button>
      )}
      <Container>
        <Row>{Products}</Row>
      </Container>
      {/* {TestImages} */}
      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>اضافة منتج</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="pro-input-div">
              <label htmlFor="selectcat">اختار التصنيف</label>
              <Dropdown
                value={cat}
                options={Selectcats}
                onChange={onCatChange}
                optionLabel="name"
                placeholder="اختار التصنيف"
                id="selectcat"
              />
            </div>
            {SelectMatgerCatsFilter && (
              <div className="pro-input-div">
                <label htmlFor="selectcat">اختار التصنيف الفرعي</label>
                <Dropdown
                  value={Matgercat}
                  options={SelectMatgerCatsFilter}
                  onChange={onMatgerCatChange}
                  optionLabel="name"
                  placeholder="اختار التصنيف الفرعي"
                  id="selectcat2"
                />
              </div>
            )}

            <div className="pro-input-div">
              <label htmlFor="name">اسم المنتج</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="pro-input-div">
              <label htmlFor="price">سعر المنتج</label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="pro-input-div">
              <label htmlFor="storeImage">صورة المنتج</label>
              <div className="select-product-Image">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="storeImage"
                  name="storeImage"
                  accept="image/*"
                  multiple={true}
                  // onChange={handleImage}
                  onChange={(e) => {
                    // getBase64(e.target.files[0]);
                    // UploadImge(e.target.files[0]);
                    UploadImge(e.target.files);
                    // handleImage(e);
                  }}
                />
                <label htmlFor="storeImage" className="chosseProImages">
                  اختر
                </label>
              </div>
            </div>
            <div className="MatgerImage ProductIamge">{ProductsImage}</div>
            <div className="pro-input-div">
              <label htmlFor="description">وصف المنتج</label>
              <Form.Control
                as="textarea"
                id="description"
                placeholder="وصف المنتج"
                style={{ height: "200px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              name="حفظ"
              type="submit"
              className="submit-button"
              onClick={(e) => {
                SendDate(e);
                handleClose();
              }}
            >
              رفع المنتج
            </button>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* {show && (
    
      )} */}
    </div>
  );
};

export default MyProducts;
