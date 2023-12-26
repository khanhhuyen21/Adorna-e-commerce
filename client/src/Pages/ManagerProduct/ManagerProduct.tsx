import { formattedDate } from "../ManagerReport/ManagerReport";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/Action/ProductAction";
import BaseAxios from "../../api/axiosClient";
import Pagination from "../../components/common/User/Footer/Pagination";
import { CSVLink } from "react-csv";

export default function ManagerProduct() {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [totalPage, setTotalPage] = useState();
  const page = useSelector((state: any) => state.pagination) || 1;

  console.log("Kiểm tra page", page);

  const handleGetData = () => {
    BaseAxios.get(`api/v1/products?page=${page}`)
      .then((data) => {
        setTotalPage(data.data.totalPage);
        setProductList(data.data.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleGetData();
  }, [page]);
  useEffect(() => {
    const searchResult = productList?.filter((item) =>
      item?.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (searchInput.length === 0) {
      handleGetData();
    } else {
      setProductList(searchResult);
    }
  }, [searchInput, page]);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  const handleOnClick = () => {
    dispatch(addProduct(productList[0]));
  };

  return (
    <>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        {" "}
        <div
          style={{
            padding: "13px 20px 13px 20px",
            backgroundColor: "#FFFFFF",
            borderRadius: "5px",
            fontWeight: "bolder",
            fontSize: "14px",
            borderLeft: "6px solid  #ffd43b",
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <p>Products List</p>
          <p>{formattedDate} </p>
        </div>
        <div className="pb-4 bg-white dark:bg-gray-900 search ">
          {/* <button className="text-bg-white-800 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            <CSVLink
              data={productList}
              filename={"users_list.csv"}
              className="btn-export-file"
            >
              Export file
            </CSVLink>
          </button> */}
          <label htmlFor="table-search" className="sr-only ">
            Search
          </label>
          <div
            style={{ display: "flex", gap: "20px" }}
            className="relative mt-1 ml-30px"
          >
            <div className="absolute inset-y-0  left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http:www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={searchInput}
              onChange={handleChange}
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search "
            />
            <button
              name="Add"
              onClick={handleOnClick}
              type="button"
              className="text-bg-white-800 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              <Link to="/admin/manager-product/add">Add</Link>
            </button>
          </div>
        </div>
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList?.map((product) => (
              <ProductItem
                key={product?.id}
                product={product}
                productList={productList}
                setProductList={setProductList}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "5%" }}>
        {" "}
        <Pagination totalPage={totalPage} />
      </div>
    </>
  );
}
