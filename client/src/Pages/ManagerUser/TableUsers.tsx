import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseAxios from "../../api/axiosClient";
import Pagination from "../../components/common/User/Footer/Pagination";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
// import { CSVLink } from 'react-csv';

const TableUsers = () => {
  const [userList, setUserList] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [isUpdated, setIsUpdated] = useState<any>(false);
  const [searchInput, setSearchInput] = useState<any>("");
  const [totalPage, setTotalPage] = useState();
  const page = useSelector((state: any) => state.pagination) || 1;
  const handleGetDataa = async () => {
    await BaseAxios.get(`/api/v1/users?page=${page}`)
      .then((response) => {
        setUserList(response.data.result),
          setTotalPage(response.data.totalPage);
      })
      .catch((error) => {
        console.log(error);
      });
    await BaseAxios.get(`/api/v1/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetDataa();
  }, [isUpdated, page]);
  useEffect(() => {
    const searchResult = userList?.filter((item: any) =>
      item?.fullName?.toLowerCase().includes(searchInput?.toLowerCase())
    );
    if (searchInput.length === 0) {
      handleGetDataa();
    } else {
      setUserList(searchResult);
    }
  }, [searchInput, page]);

  const handleChangeStatus = async (id: any) => {
    await BaseAxios.put(`/api/v1/users/${id}`)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    setIsUpdated(!isUpdated);
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  const getRank = (rank: any) => {
    switch (rank) {
      case 1:
        return "Member";
      default:
        return "Admin";
    }
  };
  const getStatus = (status: number) => {
    switch (status) {
      case 1:
        return "Active";
      case 2:
        return "Active";
      case 3:
        return "Inactive";
    }
  };

  return (
    <>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        {" "}
        <div className="pb-4 bg-white dark:bg-gray-900 search ">
          {/* <button className="text-bg-white-800 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            <CSVLink
              data={users}
              filename={"users_list.csv"}
              className="btn-export-file"
            >
              Export file
            </CSVLink>
          </button> */}

          <label htmlFor="table-search" className="sr-only ">
            Search
          </label>
          <div className="relative mt-1 ml-30px">
            <div className="absolute inset-y-0  left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
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
          </div>
        </div>
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Member</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {userList?.length > 0 &&
              userList?.map((item: any, index: number) => (
                <tr
                  key={String(item?.id)}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4 text-center">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                  >
                    {item?.fullName}
                  </th>
                  <td className="px-4 py-4 text-center">{item?.email}</td>
                  <td className="px-4 py-4 text-center">
                    {getRank(item?.rank)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span> {getStatus(item?.status)}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      className="px-4 py-4 text-center"
                      style={{
                        backgroundColor: "#333",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px",
                        color: "#fff",
                        display: item?.roleId === 2 ? "none" : "block",
                      }}
                      onClick={() => handleChangeStatus(item?.id)}
                    >
                      Change
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "5%" }}>
        <Pagination totalPage={totalPage} />
      </div>
    </>
  );
};

export default TableUsers;
