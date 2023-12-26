import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import "../../../../index.css";
import { useDispatch } from "react-redux";
interface props {
  totalPage: any;
}
function Pagination(props: props) {
  const { totalPage } = props;
  console.log(totalPage, 22222222);

  const [pagination, setPagination] = useState<any[]>([]);
  const [activee, setActivee] = React.useState(1);
  const dispatch = useDispatch();
  const next = () => {
    if (activee == totalPage) {
      return;
    }
    const nextPage = activee + 1;
    setActivee(nextPage);
    dispatch({ type: "CHANGE_PAGE", payload: nextPage });
  };
  const handleClick = (index: number) => {
    setActivee(index);
    dispatch({ type: index });
  };
  const prev = () => {
    if (activee == 1) return;
    const prevPage = activee - 1;
    setActivee(prevPage);
    dispatch({ type: "CHANGE_PAGE", payload: prevPage });
  };
  useEffect(() => {
    const pagination: any[] = [];
    for (let i = 0; i < totalPage; i++) {
      pagination.push(i);
    }
    setPagination(pagination);
  }, [activee, totalPage]);
  return (
    <div className="pagination flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center text-sx gap-2 rounded-full"
        onClick={prev}
        disabled={activee === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {pagination?.map((item: any, index: number) => {
          return (
            <IconButton
              key={index}
              onClick={() => handleClick(Number(item) + 1)}
              style={{
                borderRadius: "50%",
                color: activee === Number(item) + 1 ? "white" : "black",
                backgroundColor: activee == Number(item) + 1 ? "#000" : "#fff",
              }}
            >
              {Number(item) + 1}
            </IconButton>
          );
        })}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={activee === 5}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
export default Pagination;
