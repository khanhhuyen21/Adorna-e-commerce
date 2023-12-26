import styles from "../../User.module.css";
import SortProduct from "./SortProduct";
import { useEffect, useState } from "react";
import ListProduct from "./ListProduct";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Paginationn from "../../components/common/User/Footer/Pagination";

const Shop = () => {
  const tab = ["Shop All", "Rings", "Bracelet", "Necklace", "Gift Sets"];
  const [productss, setProductss] = useState<any>([]);
  const [type, setType] = useState<string>("Shop All");
  const [productList, setProductList] = useState<any>([]);
  const [totalPage, setTotalPage] = useState();
  const page = useSelector((state: any) => state.pagination);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/products`).then((response) => {
      setProductList(response.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/products?page=${page}`)
      .then((response) => {
        setTotalPage(response.data.totalPage);
        setProductss(response.data.result);
      });
  }, [page]);
  const getProductByCategory = (id: any) => {
    axios
      .get(`http://localhost:4000/api/v1/products/category/${id}`)
      .then((response) => {
        setProductss(response.data); // Cập nhật danh sách sản phẩm theo danh mục
      })
      .catch((error) => {
        console.error("Error fetching products by category:", error);
      });
  };
  useEffect(() => {
    if (type === "Shop All") {
      getProductByCategory(0);
    }
    if (type === "Rings") {
      getProductByCategory(1);
    }
    if (type === "Bracelet") {
      getProductByCategory(2);
    }
    if (type === "Necklace") {
      getProductByCategory(3);
    }

    if (type === "Gift Sets") {
      dispatch({ type: "CHANGE", payload: "Gift Sets" });
    }
  }, [type]);
  return (
    <div className={styles.conatinerShop}>
      <div>
        <img
          src="https://cdn.vnda.com.br/adornashop/2023/08/24/23_8_6_645_BANNERSITEADORNA1.png?v=1695396494"
          alt=""
        />
      </div>
      <SortProduct />
      <div className={styles.mainShop}>
        <div style={{ width: "25%" }} className={styles.sidebarShop}>
          <ul>
            {tab?.map((item) => (
              <li
                style={
                  type === item
                    ? { fontWeight: "bold", color: "#000", fontSize: "17px" }
                    : {}
                }
                onClick={() => setType(item)}
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.productAndSearch}>
          <ListProduct productListt={productList} productAll={productss} />
          <div className={styles.paginationShop}>
            {" "}
            {type === "Shop All" && <Paginationn totalPage={totalPage} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
