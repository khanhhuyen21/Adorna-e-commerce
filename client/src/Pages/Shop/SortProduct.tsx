import { AiFillCaretDown } from "react-icons/ai";
import styles from "../../User.module.css";
const SortProduct = () => {
  const closeFilterBar = () => {
    fetchData("all");

    // setRange(0);
  };
  return (
    <div
      style={{
        color: "rgb(107, 107, 107)",
        display: "flex",
        gap: "6px",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <span
        style={{
          borderLeft: "1px solid #ccc",
          marginLeft: "auto",
          fontSize: "smaller",
          letterSpacing: "2px",
          paddingTop: "15px",
          paddingBottom: "15px",
          paddingLeft: "15px",
        }}
      >
        SORT
      </span>{" "}
      <span
        style={{
          paddingTop: "15px",
          paddingBottom: "15px",
          height: "100%",
          marginRight: "30px",
          fontSize: "11px",
          marginTop: "2px",
        }}
      >
        <AiFillCaretDown />
      </span>
    </div>
    // <div className={`"hidden" my-4`}>
    //   <hr />
    //   <div className="w-full flex flex-col">
    //     <div className="font-medium py-2">Filter by price</div>
    //     <div className="flex justify-between items-center">
    //       <div className="flex flex-col space-y-2  w-2/3 lg-w-2/4">
    //         <label htmlFor="points" className="text-sm">
    //           Price (between 0 and 10$):{" "}
    //           <span className="font-semibold text-yellow-700">666.00$</span>{" "}
    //         </label>
    //         <input
    //           // value={range}
    //           className="slider"
    //           type="range"
    //           id="points"
    //           min="0"
    //           max="1000"
    //           step="10"
    //           // onChange={(e) => rangeHandle(e)}
    //         />
    //       </div>
    //       <div onClick={() => closeFilterBar()} className="cursor-pointer">
    //         <svg
    //           className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M6 18L18 6M6 6l12 12"
    //           />
    //         </svg>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SortProduct;
function fetchData(arg0: string) {
  throw new Error("Function not implemented.");
}

function dispatch(arg0: { type: string; payload: boolean }) {
  throw new Error("Function not implemented.");
}
