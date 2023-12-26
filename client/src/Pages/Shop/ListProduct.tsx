import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "../../User.module.css";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BaseAxios from "../../api/axiosClient";
import { MdFavorite } from "react-icons/md";
interface IProductProps {
  productListt: any;
}
const ListProduct = (props: any) => {
  const userLoginJSON = localStorage.getItem("username");
  const userLogin: any = userLoginJSON ? JSON.parse(userLoginJSON) : null;
  const productList = props.productListt;
  const productss = props.productAll;
  const tab = useSelector((state: any) => state.tab);
  const searchResult = useSelector((state: any) => state.search);
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    if (tab == "Jewelry") {
      const jewelry = productList.filter(
        (item: any) => item?.category.category == "Jewelry"
      );
      setList(jewelry);
    }
    if (tab == "Diffusers") {
      const diffusers = productList.filter(
        (item: any) => item?.category.category == "Reed Diffusers"
      );
      setList(diffusers);
    }
    if (tab == "Best Seller") {
      const bestseller = productList.filter(
        (item: any) => item?.category.category == "Best Seller"
      );
      setList(bestseller);
    }
    if (tab == "Gift Sets") {
      const gifts = productList.filter(
        (item: any) => item?.category.category == "Gift Sets"
      );
      setList(gifts);
    }
    if (searchResult !== "") {
      const searchData = productList.filter((item: any) => {
        return item?.name?.toLowerCase().includes(searchResult?.toLowerCase());
      });
      setList(searchData);
    }
  }, [tab, searchResult]);

  return (
    <>
      <Search />
      <div className={styles.productList}>
        {searchResult == "" && tab == "Shop All"
          ? productss?.map((product: any) => (
              <div key={product?.id} className={styles.candleItem}>
                {/* {product?.bestsellers > 20 && (
                <span className={styles.tagCandleItem}>BESTSELLER</span>
              )} */}
                <div className={styles.addToCartGroup}>
                  {/* <span
                    onClick={() => handleAddFavorite(product?.id)}
                    className={styles.favoriteIcon}
                  >
                    <MdFavorite />
                  </span> */}
                  <img
                    className={styles.img1}
                    src={product?.image?.[0]?.imgSrc}
                  />
                  <img
                    className={styles.img2}
                    src={product?.image?.[1]?.imgSrc}
                  />
                  <NavLink to={`/product/${product?.id}`}>
                    <button className={styles.btnAddToCart}>LEARN MORE</button>
                  </NavLink>
                </div>
                <div className={styles.titleCandle}>
                  <p>SCENT FAMILY: {product?.category?.title}</p>
                  <p>{product?.name}</p>
                  <p>{product?.price.toLocaleString()} VND</p>
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
                      20 reviews
                    </span>
                  </p>
                </div>
              </div>
            ))
          : list?.map((product: any) => (
              <div key={product?.id} className={styles.candleItem}>
                {/* {product?.bestsellers > 20 && (
                <span className={styles.tagCandleItem}>BESTSELLER</span>
              )} */}
                <div className={styles.addToCartGroup}>
                  {/* <span
                    onClick={() => handleAddFavorite(product?.id)}
                    className={styles.favoriteIcon}
                  >
                    <MdFavorite />
                  </span> */}
                  <img
                    className={styles.img1}
                    src={product?.image?.[0]?.imgSrc}
                  />
                  <img
                    className={styles.img2}
                    src={product?.image?.[1]?.imgSrc}
                  />
                  <NavLink to={`/product/${product?.id}`}>
                    <button className={styles.btnAddToCart}>LEARN MORE</button>
                  </NavLink>
                </div>
                <div className={styles.titleCandle}>
                  <p>SCENT FAMILY: {product?.category?.category}</p>
                  <p>{product?.name}</p>
                  <p>{product?.price} $</p>
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
                      20 reviews
                    </span>
                  </p>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default ListProduct;
