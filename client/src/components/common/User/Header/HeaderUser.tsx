import { AiOutlineUser } from "react-icons/ai";
import styles from "../../../../User.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { BiSearch, BiShoppingBag, BiUser } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { useSelector } from "react-redux";

const HeaderUser = () => {
  const cartCount = useSelector((state: any) => state.cart.count);
  const navigate = useNavigate();
  const userLoginJSON = localStorage.getItem("username");
  const userLogin: any = userLoginJSON ? JSON.parse(userLoginJSON) : null;
  function handleLogout(): void {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-20 shadow-lg lg:shadow-none bg-white">
        <div className="m-4 md:mx-12 md:my-6 grid grid-cols-4 lg:grid-cols-3">
          <div className="hidden lg:block col-span-1 flex text-gray-600 mt-1">
            <Link to="/shop">
              <span className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer">
                SHOP
              </span>
            </Link>
            <Link to="/about">
              <span className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer">
                BLOG
              </span>
            </Link>
            <Link to="/contact">
              <span className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer">
                CONTACT
              </span>
            </Link>
          </div>
          <div className="col-span-2 lg:hidden flex justify-items-stretch	 items-center">
            <svg
              className="col-span-1 lg:hidden w-8 h-8 cursor-pointer text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span
              onClick={(e) => navigate("/")}
              style={{ letterSpacing: "0.10rem" }}
              className="flex items-left text-center font-bold uppercase text-gray-800 text-2xl cursor-pointer px-2 text-center"
            >
              Adorna
            </span>
          </div>
          <div
            onClick={(e) => navigate("/")}
            style={{ letterSpacing: "0.70rem" }}
            className="hidden lg:block flex items-left col-span-1 text-center text-gray-800 font-bold tracking-widest uppercase text-2xl cursor-pointer"
          >
            Adorna
          </div>
          <div className="flex items-right col-span-4 lg:col-span-1 flex justify-end">
            {!userLogin ? (
              <>
                <Link to="/auth">
                  <svg
                    className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              </>
            ) : (
              <>
                <div style={{ marginTop: "10px" }}>
                  <span>{userLogin?.fullName}</span>
                </div>
                {userLogin?.roleId === 2 ? (
                  <div
                    className="hover:bg-gray-200 px-2 py-2 rounded-lg relative cursor-pointer"
                    title="Info"
                  >
                    <span>
                      <Link to="/admin">
                        <svg
                          className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </Link>
                    </span>
                  </div>
                ) : (
                  <div
                    className="hover:bg-gray-200 px-2 py-2 rounded-lg relative cursor-pointer"
                    title="Info"
                  >
                    <span>
                      <Link to="/auth/account">
                        <svg
                          className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </Link>
                    </span>
                  </div>
                )}

                <div
                  className="hover:bg-gray-200 px-2 py-2 rounded-lg relative cursor-pointer"
                  title="Cart"
                >
                  <span style={{ paddingTop: "3px" }}>
                    <Link to="/cart">
                      <svg
                        className="w-8 h-8 text-gray-600 hover:text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      {cartCount > 0 && (
                        <span className="absolute top-0 ml-6 mt-1 bg-yellow-700 rounded px-1 text-white text-xs hover:text-gray-200 font-semibold">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </span>
                </div>
                <div
                  className="userDropdownBtn hover:bg-gray-200 px-2 py-2 rounded-lg relative"
                  title="Logout"
                >
                  <span onClick={handleLogout}>
                    <svg
                      className="w-8 h-8 text-gray-600 hover:text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderUser;
