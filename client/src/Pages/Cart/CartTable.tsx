import { useEffect, useState } from "react";
import styles from "../../User.module.css";
import { decreaseCart, decreaseCartCount } from "../../redux/Action/CartAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BaseAxios from "../../api/axiosClient";

const CartTable = () => {
  const [productList, setProductList] = useState<any>();
  const navigate = useNavigate();
  const cartCount = useSelector((state: any) => state.cart.count);
  const dispatch = useDispatch();
  const [address, setAddress] = useState<any>();
  const userLoginJSON = localStorage.getItem("username");
  const userLogin: any | null = userLoginJSON
    ? JSON.parse(userLoginJSON)
    : null;

  useEffect(() => {
    BaseAxios.get(`api/v1/carts/cartByUser/${userLogin?.id}`).then((res) =>
      setProductList(res.data)
    );
  }, []);

  useEffect(() => {
    BaseAxios.get(`api/v1/users/${userLogin?.id}/address`).then((res) => {
      setAddress(res.data?.address?.[0]);
    });
  }, [productList]);
  console.log(productList, "mmm");

  // Total quantity
  const totalQuantity = productList?.reduce(
    (total: number, item: { quantity: number }) => {
      return total + item.quantity;
    },
    0
  );
  const handleChangQuantity = async (id: number, quantity: any) => {
    await BaseAxios.put(`api/v1/carts/${id}`, { quantity: quantity });
    // tạo một bản sao của productList để rerender lại
    const updatedProductList = productList?.map((item: any) =>
      item?.id === id ? { ...item, quantity: quantity } : item
    );
    setProductList(updatedProductList);
  };

  // Total
  let totalResult: number = 0;
  totalResult = productList?.reduce((total: number, product: any) => {
    return Number(total + Number(product?.quantity) * Number(product?.price));
  }, 0);

  // Paymet
  const handleCheckOut = async () => {
    if (userLogin.roleId == 2) {
      alert("You do not have the authority to place an order.");
      return;
    }

    if (productList?.length == 0) {
      alert("Please add product to cart.");
      navigate("/shop");
      return;
    }
    if (!address) {
      navigate("/auth/account");
      return;
    }
    await BaseAxios.post(`api/v1/orders/${userLogin?.id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigate("/");
    dispatch(decreaseCartCount());
  };

  if (productList?.length == 0) {
    dispatch(decreaseCart());
  }

  // Xoá sản phẩm trong cart
  async function handleDelete(id: any) {
    const newCart = productList?.filter((item: any) => item?.id !== id);
    await BaseAxios.delete(`api/v1/carts/${id}`);
    setProductList(newCart);
  }

  return (
    <div className={styles.cartTable}>
      <table className={styles.cartTableContainer}>
        <thead>
          <tr className={styles.cartTableThead}>
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {productList?.map((item: any, index: number) => {
            return (
              <tr key={item?.id} className={styles.cartTableTbody}>
                <td className={styles.cartTableTbodyItem1}>
                  <span>
                    <img
                      className={styles.imgProductTable}
                      src={item?.thumbnailUrl}
                      alt=""
                    />
                  </span>
                  <p>
                    <Link to={`/product/${item?.id}`}>
                      <span>{item?.name}</span>
                    </Link>
                    <span>{item?.price.toLocaleString()} VND</span>
                  </p>
                </td>
                <td className={styles.cartTableTbodyItem2}>
                  <input
                    onChange={(event) =>
                      handleChangQuantity(item?.id, event.target.value)
                    }
                    type="number"
                    min="1"
                    value={item?.quantity}
                  />
                  <p onClick={() => handleDelete(item?.id)}>REMOVE</p>
                </td>
                <td className={styles.cartTableTbodyItem3}>
                  <span
                    style={
                      totalQuantity >= 3
                        ? { textDecoration: "line-through" }
                        : {}
                    }
                  >
                    {Number(item?.quantity * item?.price).toLocaleString()} VND
                  </span>
                  <span style={{ color: "red", marginLeft: "10px" }}>
                    {totalQuantity >= 3
                      ? `${(
                          Number(item?.quantity) *
                          Number(item?.price) *
                          0.85
                        ).toLocaleString()} VND`
                      : ""}
                  </span>
                  {/* <span>
                    {Number(item?.quantity * item?.price).toLocaleString()} VND
                  </span> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.discount}>
        <div className={styles.discountItem1}>
          <p className={styles.addressShipping}>Name:</p>
          <p>{address?.name}</p>
          <p className={styles.addressShipping}>Address:</p>
          <p>
            {address?.address}, {address?.ward}, {address?.district},{" "}
            {address?.province}{" "}
          </p>
          <p className={styles.addressShipping}>Phone:</p>
          <p>{address?.phone}</p>
          <Link to={"/auth/account"}>
            <button className={styles.buttonEditAdress}>EDIT</button>
          </Link>
        </div>
        <div className={styles.discountItem2}>
          <p>
            <span>PAYMENT METHOD: Cash on delivery</span>
          </p>

          <p>
            <span style={{ marginRight: "38px" }}>SHIPPING FEE:</span> 25.000
          </p>
          <p>
            <span style={{ marginRight: "90px" }}>TOTAL:</span>
            {Number(totalQuantity) >= 3
              ? (Number(totalResult * 0.85) + 25000).toLocaleString()
              : (Number(totalResult) + 25000)?.toLocaleString()}{" "}
            VND
          </p>

          <button
            style={{
              marginBottom: 20,
            }}
            onClick={handleCheckOut}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartTable;
