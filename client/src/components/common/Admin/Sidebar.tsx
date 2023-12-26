import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value);
  };
  const navigate = useNavigate();
  function handleLogout(): void {
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <div
        style={{ boxShadow: "1px 1px 8px 0.2px #aaaaaa" }}
        id="sidebar"
        className="hidden md:block sticky top-0 left-0 h-screen md:w-3/12 lg:w-2/12 sidebarShadow bg-white text-gray-600"
      >
        <div
          onClick={(e) => navigate("/admin")}
          className={`${
            location.pathname === "/admin"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
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
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span className="hover:text-gray-800">Dashboard</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => navigate("/admin/manager-user")}
          className={`${
            location.pathname === "/admin/manager-user"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
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
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span className="hover:text-gray-800">Customer</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => navigate("/admin/manager-product")}
          className={`${
            location.pathname === "/admin/manager-product"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
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
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </span>
          <span className="hover:text-gray-800">Product</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => navigate("/admin/manager-order")}
          className={`${
            location.pathname === "/admin/manager-order"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </span>
          <span className="hover:text-gray-800">Order</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => handleLogout()}
          className={`${
            location.pathname === ""
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`}
        >
          <span>
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
          <span className="hover:text-gray-800">Log Out</span>
        </div>
      </div>
    </>
    // <Card className=" w-full max-w-[20rem]  dasboard p-4 shadow-xl shadow-blue-gray-900/5 ">
    //   <div className="w-1/6 mb-2 p-4 logo">
    //     <img
    //       className="logo-img"
    //       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc2Mi_cfTs8TCeXrAYAjtMArz3nMtsAeOruQ&usqp=CAU"
    //       alt=""
    //     />
    //   </div>
    //   <p style={{ margin: "0 0 20px 40px" }}>Adorna Team</p>
    //   <List>
    //     <NavLink to="/admin" style={{ borderRadius: "5px" }}>
    //       <ListItem
    //         className=" border-b-0 p-3 custom-hover"
    //         selected={open === 1}
    //       >
    //         <ListItemPrefix>
    //           <PresentationChartBarIcon className="h-5 w-5" />
    //         </ListItemPrefix>
    //         <Typography color="blue-gray" className=" mr-auto font-normal">
    //           Dashboard
    //         </Typography>
    //       </ListItem>
    //     </NavLink>
    //     <Accordion
    //       open={open === 2}
    //       icon={
    //         <ChevronDownIcon
    //           strokeWidth={2.5}
    //           className={`mx-auto h-4 w-4 transition-transform ${
    //             open === 2 ? "rotate-180" : ""
    //           }`}
    //         />
    //       }
    //     >
    //       <ListItem className="p-0 custom-hover" selected={open === 2}>
    //         <AccordionHeader
    //           onClick={() => handleOpen(2)}
    //           className="border-b-0 p-3"
    //         >
    //           <ListItemPrefix>
    //             <ShoppingBagIcon className="h-5 w-5" />
    //           </ListItemPrefix>
    //           <Typography color="blue-gray" className="mr-auto font-normal">
    //             ECommerce
    //           </Typography>
    //         </AccordionHeader>
    //       </ListItem>
    //       <AccordionBody className="py-1">
    //         <List className="p-0" style={{ color: "#fff", fontSize: "15px" }}>
    //           <ListItem className=" custom-hover">
    //             <ListItemPrefix>
    //               <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //             </ListItemPrefix>
    //             <Link to="/admin/managerorder">Orders</Link>
    //           </ListItem>{" "}
    //           <NavLink
    //             to="/admin/managerproduct"
    //             style={{ borderRadius: "5px" }}
    //           >
    //             <ListItem className=" custom-hover">
    //               <ListItemPrefix>
    //                 <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //               </ListItemPrefix>
    //               Products
    //             </ListItem>
    //           </NavLink>
    //           <NavLink to="/admin/manageruser" style={{ borderRadius: "5px" }}>
    //             <ListItem className=" custom-hover">
    //               <ListItemPrefix>
    //                 <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //               </ListItemPrefix>
    //               Customers
    //             </ListItem>
    //           </NavLink>
    //         </List>
    //       </AccordionBody>
    //     </Accordion>
    //     <hr className="my-2 border-blue-gray-50" />
    //     <ListItem className=" custom-hover">
    //       <ListItemPrefix>
    //         <InboxIcon className="h-5 w-5" />
    //       </ListItemPrefix>
    //       <Link to="">Gift Box</Link>
    //       <ListItemSuffix>
    //         <Chip
    //           value={0}
    //           size="sm"
    //           variant="ghost"
    //           color="blue-gray"
    //           className="rounded-full"
    //         />
    //       </ListItemSuffix>
    //     </ListItem>
    //     <ListItem className=" custom-hover">
    //       <ListItemPrefix>
    //         <UserCircleIcon className="h-5 w-5" />
    //       </ListItemPrefix>
    //       Discounts
    //     </ListItem>
    //     <ListItem className=" custom-hover">
    //       <ListItemPrefix>
    //         <Cog6ToothIcon className="h-5 w-5" />
    //       </ListItemPrefix>
    //       Feedbacks
    //     </ListItem>
    //     <ListItem className=" custom-hover " onClick={handleLogout}>
    //       <ListItemPrefix>
    //         <PowerIcon className="h-5 w-5" />
    //       </ListItemPrefix>
    //       Log Out
    //     </ListItem>
    //   </List>
    // </Card>
  );
}
export default Sidebar;
