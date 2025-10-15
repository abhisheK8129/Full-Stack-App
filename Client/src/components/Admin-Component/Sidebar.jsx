import {
  ChartNoAxesCombined,
  LayoutDashboard,
  NotebookPen,
  ShoppingBasket,
} from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

// configurations for admin sidebar
const adminSideBar = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icons: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icons: <NotebookPen />,
  },
];

// function for menu items
function MenuItems({setOpen}) {
  const navigate = useNavigate();

  return (
    <nav className="flex-col mt-15 flex gap-2">
      {adminSideBar.map((mItems) => (
        <div
          key={mItems.id}
          onClick={() =>{
            navigate(mItems.path)
            setOpen ? setOpen(false) : null
          }
          }
          className="flex items-center hover:font-extrabold gap-2 cursor-pointer rounded-md px-3 py-5 "
        >
          {mItems.icons}
          <span>{mItems.label}</span>
        </div>
      ))}
    </nav>
  );
}

export const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        
        <SheetContent side="left" className="w-80">
          <div className="flex flex-col mx-2 h-full">
            <SheetHeader className="mt-6">
              <SheetTitle className="flex gap-2">
                <ChartNoAxesCombined size={28} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-70 bg-adminSideBar text-white border-r-2 border-black flex-col  font-register p-5  lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center rounded-xl px-3  cursor-pointer gap-2"
        >
          <ChartNoAxesCombined size={23} />
          <h1 className=" text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};
