import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ScrollSpy from "../../Pages/ProductDetail/Img";
import styles from "../../User.module.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import MoreInfor from "./MoreInfor";
import React from "react";
import { useDispatch } from "react-redux";
import { increaseCart } from "../../redux/Action/CartAction";
import BaseAxios from "../../api/axiosClient";
const ProductDetail = () => {
  const [value, setvalue] = useState<any>(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/products/${id}`)
      .then((res) => {
        setProducts(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const userLoginJSON = localStorage.getItem("username");
  const userLogin: any | null = userLoginJSON
    ? JSON.parse(userLoginJSON)
    : null;
  const srcImg: any = products?.image?.map((img: any) => img.imgSrc);
  function handleAddToCart() {
    if (value > Number(products?.stock)) {
      alert("The quantity you purchased has reached the product limit");
      return;
    }
    if (products?.stock === 0) {
      alert("The product is out of stock");
      return;
    }
    if (!userLogin) {
      alert("You need to log in to add products");
      navigate("/auth");
    }
    if (userLogin?.status == 3) {
      alert("Your account has been locked.");
      return;
    }
    if (userLogin?.roleId === 2) {
      alert("Admin can't add product.");
      return;
    }

    BaseAxios.post(`api/v1/carts/${userLogin?.id}`, {
      productId: id,
      quantity: value,
    });
    dispatch(increaseCart());
  }
  return (
    <>
      <div className={styles.productDetailContainer}>
        <div className={styles.productDetailImg} style={{ display: "flex" }}>
          <div className={styles.stickyImg}>
            <ScrollSpy targetIds={srcImg} />
          </div>
          <div>
            <div className={styles.sectionImg} id={srcImg?.[0]}>
              <img src={srcImg?.[0]} alt="" />
            </div>
            <div className={styles.sectionImg} id={srcImg?.[1]}>
              <img src={srcImg?.[1]} alt="" />
            </div>
          </div>
        </div>
        <div className="productContent">
          <div className={styles.productItemTitle}>
            <p id="productName">{products?.name}</p>
            <p id="productPrice">{products?.price?.toLocaleString()} VND</p>
            <p style={{ display: "flex", gap: "9px" }}>
              <span style={{ display: "flex" }}>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </span>
              <span
                style={{
                  textDecoration: "underline",
                  fontSize: "11px",
                  color: "rgb(148, 147, 147)",
                  cursor: "pointer",
                }}
              >
                20 review
              </span>
            </p>
            <input
              min="1"
              type="number"
              value={value}
              onChange={(e) => setvalue(e.target.value)}
            />{" "}
            <p>Buy 3+ Minimalist Jewelry, Get 15% off plus Free Shipping*</p>
            <br />
            <button onClick={() => handleAddToCart()}>ADD TO CART</button>
          </div>
          <div className={styles.productItemContent}>
            <p className={styles.tinyyy}>
              {React.createElement("div", {
                dangerouslySetInnerHTML: {
                  __html: `<div className={styles.tinyyyy}}> ${products?.description}</div>`,
                },
              })}
            </p>
          </div>
          <div>
            <MoreInfor />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
