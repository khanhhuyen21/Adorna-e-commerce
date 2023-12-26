import { useDispatch } from "react-redux";
import { formattedDate } from "../ManagerReport/ManagerReport";
import TinyMCEEditor from "./TinyMCEEditor";
import { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseAxios from "../../api/axiosClient";

export function AddProduct() {
  const [images, setImages] = useState<any>([]);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [descriptions, setDescriptions] = useState("");
  const dispatch = useDispatch();
  const productEdit = useSelector((state: any) => state?.products?.editProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<any>(0);
  const [quantity, setQuantity] = useState<any>(0);
  const [errorQuantity, setErrorQuantity] = useState("");
  const [errorPrice, setErrorPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorName, setErrorName] = useState("");
  const [image1, setImage1] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const type = useSelector((state: any) => state?.products?.type);
  console.log("type", type);
  // console.log("productEdit", productEdit);

  useEffect(() => {
    if (productEdit) {
      setName(productEdit?.name || "");
      setQuantity(productEdit?.stock || 0);
      setPrice(productEdit?.price || 0);
      setSelected(productEdit?.category.id || 0);
      setDescriptions(productEdit?.description || "");
    }
    if (type === "Add") {
      setName("");
      setQuantity(0);
      setDescriptions("");
      setPrice(0);
      setSelected(0);
    }
  }, []);
  function handleDescriptionChange(content: SetStateAction<string>) {
    setDescriptions(content);
  }
  const handleAddImg = (event: any) => {
    let listImages: any = [];
    for (let i = 0; i < event.target.files.length; i++) {
      listImages.push(event.target.files[i]);
    }
    setImages(listImages);
  };
  useEffect(() => {
    if (name.length > 50) {
      setErrorName("Value is too large");
    }
    if (price < 1000000000 || price > 0) {
      setErrorPrice("");
    }
    if (price > 10000000000 || price < 0) {
      setErrorPrice("Value is too large or too small");
    }
    if (quantity < 10000000000 || quantity > 0) {
      setErrorQuantity("");
    }
    if (quantity > 10000000000 || quantity < 0) {
      setErrorQuantity("Value is too large or too small");
    }
  }, [name, price, quantity]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (productEdit && type == "Edit") {
      const updateProductt = {
        name: name,
        quantity: quantity,
        price: price,
        categoryId: selected,
        description: descriptions,
        stock: quantity,
      };
      console.log("updateProductt", updateProductt);
      try {
        const updateProduct = await BaseAxios.put(
          `api/v1/products/update/${productEdit?.id}`,
          updateProductt
        );
        console.log("updated product", updateProduct);
        if (updateProduct.status === 200) {
          setName("");
          setQuantity(0);
          setDescriptions("");
          setPrice(0);
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else if (
      selected &&
      descriptions &&
      name &&
      price &&
      descriptions !== ""
    ) {
      const newProduct = {
        name: name,
        price: price,
        description: descriptions,
        categoryId: selected,
        stock: quantity,
      };
      const createProduct = await BaseAxios.post(`api/v1/products`, newProduct);
      console.log("createProduct 11111111111111", createProduct);
      if (createProduct?.data?.status == 200) {
        const formData = new FormData();
        setSuccessMessage("Product added successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        // Lặp qua mảng hình ảnh và thêm từng hình ảnh vào FormData
        images?.forEach((img: any) => {
          formData.append(`file`, img); // Tên trường sẽ là `images[0]`, `images[1]`,...
        });
        formData.append("productId", createProduct?.data?.product?.id);

        await BaseAxios.post("api/v1/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setName("");
      setQuantity(0);
      setDescriptions("");
      setPrice(0);
    } else {
      alert("Please enter form");
    }
  }
  const handleEdit = async (id: number) => {
    let formData = new FormData();
    if (image1) {
      formData.append(`file`, image1);
      await BaseAxios.put(`/api/v1/images/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      formData.append(`file`, image2);
      await BaseAxios.put(`/api/v1/images/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    alert("updated successfully");
  };

  return (
    <div className="container">
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
        <p>Add Product</p>
        <p>{formattedDate} </p>
      </div>
      <section
        style={{
          width: "95%",
          backgroundColor: "#FFFFFF",
          borderRadius: "5px",
          padding: "20px 6px 20px 6px",
        }}
      >
        <p
          style={{
            margin: "0 15px 15px 15px",
            fontWeight: "bolder",
            borderBottom: "3px solid #ffd43b",
            paddingBottom: "14px",
          }}
        >
          Create New Product
        </p>

        <form
          encType="multipart/form-data"
          style={{ padding: "0 15px 15px 15px" }}
        >
          <div className="input-item">
            <label htmlFor="name">Product Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              name="name"
              type="text"
              required
            />
            <p style={{ color: "red" }}>{errorName}</p>
          </div>
          <div className="input-item">
            <label htmlFor="quantity">Quantity </label>
            <input
              onChange={(e) => setQuantity(Number(e.target.value))}
              value={quantity}
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              required
            />
            <p style={{ color: "red" }}>{errorQuantity}</p>
          </div>
          <div className="input-item">
            <label htmlFor="price">Price</label>
            <input
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
              id="price"
              name="price"
              type="number"
              min="1"
              required
            />
            <p style={{ color: "red" }}>{errorPrice}</p>
          </div>
          <div className="input-item">
            <label htmlFor="type">Category</label>
            <select
              value={selected}
              onChange={(e) => setSelected(Number(e.target.value))}
              name="images"
              id="type"
              required
            >
              <option value="">-- Types --</option>
              <option value="1">Rings</option>
              <option value="2">Bracelet</option>
              <option value="3">Necklace</option>
            </select>
          </div>
          <div style={{ display: type == "Edit" ? "block" : "none" }}>
            <div className="input-edit-item ">
              <label>Image 1:</label>
              <img
                className="img-edit-product"
                src={productEdit?.image?.[0]?.imgSrc}
                alt=""
              />
              <input
                accept=".jpg, .jpeg, .png, .webp"
                type="file"
                onChange={(e: any) => setImage1(e.target.files?.[0])}
              />
              {image1 != null ? (
                <button onClick={() => handleEdit(productEdit?.image?.[0]?.id)}>
                  Update
                </button>
              ) : (
                ""
              )}
            </div>
            <div
              style={{ display: type == "Edit" ? "block" : "none" }}
              className="input-edit-item "
            >
              <label>Image 2:</label>
              <img
                className="img-edit-product"
                src={productEdit?.image?.[1]?.imgSrc}
                alt=""
              />
              <input
                accept=".jpg, .jpeg, .png, .webp"
                type="file"
                onChange={(e: any) => setImage2(e.target.files?.[0])}
              />
              {image2 != null ? (
                <button onClick={() => handleEdit(productEdit?.image?.[1]?.id)}>
                  Update
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            style={{ display: type == "Edit" ? "none" : "block" }}
            className="input-item"
          >
            <label>Product Images:</label>
            <input
              style={{
                height: "100%",
                display: type == "Edit" ? "none" : "block",
              }}
              type="file"
              multiple
              onChange={handleAddImg}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }} className="input-item">
            <label htmlFor="">Description</label>
            <TinyMCEEditor
              value={descriptions}
              onChange={handleDescriptionChange}
            />
          </div>
          <input
            style={{
              width: "80px",
              height: "35px",
              border: "none",
              color: "#fff",
              backgroundColor: "#333",
              display: "block",
              margin: "0 auto",
              letterSpacing: "1px",
              borderRadius: "5px",
            }}
            type="submit"
            value="Submit"
            name={productEdit ? "Edit" : "Create"}
            onClick={handleSubmit}
          />
        </form>
        {successMessage && (
          <div style={{ color: "green", textAlign: "center" }}>
            {successMessage}
          </div>
        )}
      </section>
    </div>
  );
}
