import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { editProduct } from "../../redux/Action/ProductAction";
import { Link } from "react-router-dom";
import BaseAxios from "../../api/axiosClient";

interface IProductProps {
  product: any;
  productList: any[];
  setProductList: any;
}
const ProductItem: React.FC<IProductProps> = (props: IProductProps) => {
  const { product, productList, setProductList } = props;
  const dispatch = useDispatch();
  function handleDelete(id: number) {
    const updateData = productList?.filter((item) => item?.id !== id);
    setProductList([...updateData]);
    BaseAxios.delete(`api/v1/products/${id}`);
    BaseAxios.delete(`api/v1/images/product/${id}`);
  }
  function handleEdit(id: string) {
    if (product?.id == id) {
      dispatch(editProduct(product));
    }
  }
  console.log("product", product);

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-2 text-center">{product?.id}</td>
        <td className="p-2 text-center">{product?.name.toLowerCase()}</td>
        <td className="p-2 text-center">
          <img
            className="w-12 h-12 object-cover object-center"
            src={product?.image?.[0]?.imgSrc} //imgSrc[0]
            alt="pic"
          />
        </td>
        <td className="p-2 text-center">{product?.stock}</td>
        <td className="p-2 text-center">{product?.category.title}</td>
        <td className="p-2 text-center">
          {product?.price.toLocaleString()} VND
        </td>
        <td className="p-2 flex items-center justify-center">
          <span
            onClick={() => handleEdit(product?.id)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <Link to="/admin/manager-product/add">
              <svg
                className="w-6 h-6 fill-current text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </span>

          <span
            onClick={() => handleDelete(product?.id)}
            className="cursor-pointer hover-bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0v-8zm5 0a1 1 0 012 0v8a1 1 0 11-2 0v-8z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </td>
      </tr>
    </>
  );
};

export default ProductItem;
