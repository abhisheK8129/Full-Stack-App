import {
  CircleUserRound,
  House,
  LogOut,
  Menu,
  ShoppingCart,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  brandInUpperCase,
  shoppigHeaderMenuItems,
  shoppingCategoryMenu,
} from "../../config/Config";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutTheUser, resetTokenAndCredentials } from "@/store/auth-slice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { CartWrapper } from "./Cart-Wrapper.jsx";
import { fetchTheCartItems } from "@/store/Shopping/Cart-Slice";
import { DropdownMenuRadioItem } from "@radix-ui/react-dropdown-menu";
import { useTheme } from "next-themes";

// menu items
function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigationOfTheCategory(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "allProducts" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="grid grid-cols-1  lg:flex  sm:mt-8 mt-6  mx-3 flex-1 lg:mt-0   mb-3 lg:mb-0 lg:items-center gap-5 lg:flex-row">
      {shoppigHeaderMenuItems.map((menuItm) => (
        <Label
          onClick={() => handleNavigationOfTheCategory(menuItm)}
          key={menuItm.id}
          className="text-sm font-bold  lg:border-none sm:m-1 lg:m-1 sm:rounded-2xl  cursor-pointer"
        >
          {menuItm.label}
        </Label>
      ))}
    </nav>
  );
}

function RightSideContent() {
  const { user } = useSelector((state) => state.authenticationSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { cartItems } = useSelector((state) => state.cartSlice);

  useEffect(() => {
    dispatch(fetchTheCartItems(user?.id));
  }, [dispatch]);


  // to handle the logout
  function toHandleLogout() {
    // when you want to logout the cookies which get saved in your cookies
    // dispatch(logoutTheUser()).then((data) => {

    //   if (data.payload.success) {
    //     toast("logout successfully", {
    //       style: {
    //         backgroundColor: "red",
    //         color: "white",
    //       },
    //     });
    //   }
    // });


    // when you want to logout the cookies which get saved in your session storage
    dispatch(resetTokenAndCredentials())
    sessionStorage.clear();
    navigate("/auth/login");




  }


  return (
    <div className="flex lg:items-center   flex-1    lg:flex-row flex-col lg:gap-2    text-white">
      <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
        <Button
          variant="outline"
          className="relative bg-gray-400 hover:bg-gray-400 lg:bg-white lg:hover:bg-white   text-black lg:w-[60px]  lg:rounded-4xl h-8 "
          onClick={() => setOpenCart(true)}
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute top-[-3px] lg:right-[14px] text-[13px]  font-bold   lg:block">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only ">User Cart</span>
        </Button>
        <CartWrapper
          setOpenCart={setOpenCart}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* to render the username first alphabet */}
          <Avatar className="sm:hidden hidden size-8 my-2 lg:block bg-white">
            <AvatarFallback className="cursor-pointer font-bold bg-transparent text-black">
              {user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="w-50">
          {/* to render the username */}
          <DropdownMenuLabel>Logged in as: {user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shopping/account")}>
            <CircleUserRound />
            Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
        <AlertDialogTrigger asChild>
          <Button className="cursor-pointer font-bold  mt-5 lg:mt-0 w sm:bg-black  text-white lg:bg-white lg:hover:bg-white w-full lg:w-[32px] h-[32px] ">
            <LogOut className="sm:text-white lg:text-black" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={() => toHandleLogout()}>
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// get the products according to brands
export const BrandSection = () => {
  const navigate = useNavigate();
  function handleBrandNavigation(getCurrItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrItem.id !== "home"
        ? {
            brand: [getCurrItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(getCurrItem.path);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="m-2 rounded-4xl border-none font-bold bg-white text-black hover:text-white hover:bg-blue-600 h-8">
          Brands
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {shoppingCategoryMenu.map((categoryItems) => (
            <DropdownMenuItem
              className="font-medium"
              onClick={() => handleBrandNavigation(categoryItems)}
            >
              {categoryItems.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// main
export const ShoppingHeader = () => {
  const { isUserAuthenticated } = useSelector(
    (state) => state.authenticationSlice
  );
  return (
    <header className=" bg-shoppingHeaderClr flex-1    text-white top-0  z-40 w-full sticky">
      <div className="flex flex-1 h-16 justify-between  items-center md:px-6">
        {/* A link which goes to the shopping/home */}
        <Link
          className="flex items-center justify-center gap-1"
          to="/shopping/home"
        >
          <span className="font-bold ml-4">Ecommerce App</span>
          <House />
        </Link>

        {/* sheet component for the smaller devices */}

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden mx-4 bg-white border-none cursor-pointer"
            >
              <Menu className="text-black" />
              <span className="sr-only">Toggle Header menu</span>
            </Button>
          </SheetTrigger>
          {/* menu items and right side of the header */}
          <SheetContent side="left" className="w-full max-w-xs px-3 py-5 gap-2">
            <MenuItems />
            <RightSideContent />
          </SheetContent>
        </Sheet>

        {/* Menu Items for the large devices */}
        <div className="lg:block hidden">
          <MenuItems />
        </div>

        {/* Right side of the header for the large devices */}
        {isUserAuthenticated ? (
          <div className="hidden lg:flex ">
            <BrandSection />
            <RightSideContent />
          </div>
        ) : null}
      </div>
    </header>
  );
};
