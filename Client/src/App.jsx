import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkTheAuthentication } from "./store/auth-slice/index";
import { UserRegistration } from "./pages/Authentication/userRegistration";
import { UserLogin } from "./pages/Authentication/userLogin";
import { AdminLayout } from "./components/Admin-Component/layout";
import { AdminDashboard } from "./pages/Admin/Admin-Dashboard";
import { AdminProducts } from "./pages/Admin/Products";
import { AdminOrders } from "./pages/Admin/Orders";
import { AdminFeatures } from "./pages/Admin/Feature";
import { ShoppingLayout } from "./components/Shopping-Component/Shopping-Layout";
import { ShoppingHomePage } from "./pages/Shopping/Home";
import { ShoppingListingPage } from "./pages/Shopping/Listing";
import { CheckoutPage } from "./pages/Shopping/Checkout";
import { CustomerAccountPage } from "./pages/Shopping/Account";
import { PageNotFound } from "./pages/Not-found/No-page-found";
import { Unauth } from "./pages/Unauthorize-Page/Unauth";
import { CheckTheAuthentication } from "./components/Common/Check-auth";
import { AuthenticationLayout } from "./components/authentication/layout";
import { PaypalReturn } from "./pages/Shopping/Paypal-return";
import { PaymentSuccessPage } from "./pages/Shopping/Payment-Success";
import { SearchAboutTheProducts } from "./pages/Shopping/Search";

function App() {
  // get the user, isAuthenticated  and isLoading from the authSlice
   const { user, isUserAuthenticated, isPageLoading  } = useSelector(
    (state) => state.authenticationSlice
  );
  const dispatch = useDispatch();

  // use the useEffect to dispatch the checkAuth 
  // when you want to get the token is sessionStorage then pass the token from the session storage in your check auth api
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('token'))
    dispatch(checkTheAuthentication(token));
  }, [dispatch]);

  

  // if it still loading do this
  if (isPageLoading) return <div>...Loading</div>;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<CheckTheAuthentication></CheckTheAuthentication>}>
        </Route>
        <Route
          path="/auth"
          element={
            <CheckTheAuthentication
              user={user}
              isUserAuthenticated={isUserAuthenticated}
            >
              <AuthenticationLayout />
            </CheckTheAuthentication>
          }
        >
          <Route path="login" element={<UserLogin />}></Route>
          <Route path="register" element={<UserRegistration />}></Route>
        </Route>

        <Route
          path="/admin"
          element={
            <CheckTheAuthentication
              user={user}
              isUserAuthenticated={isUserAuthenticated}
            >
              <AdminLayout />
            </CheckTheAuthentication>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
          <Route path="features" element={<AdminFeatures />}></Route>
        </Route>

        
        <Route
          path="/shopping"
          element=
          {
             <CheckTheAuthentication user={user} isUserAuthenticated={isUserAuthenticated}>
              <ShoppingLayout />
            </CheckTheAuthentication>
          }
        >
          <Route path="home" element={<ShoppingHomePage />}></Route>
          <Route path="listing" element={<ShoppingListingPage />}></Route>
          <Route path="checkout" element={<CheckoutPage />}></Route>
          <Route path="account" element={<CustomerAccountPage />}></Route>
          <Route path="paypal-return" element={<PaypalReturn/>}></Route>
          <Route path="payment-success" element={<PaymentSuccessPage/>}></Route>
          <Route path="search" element={<SearchAboutTheProducts/>}></Route>
        </Route>
        {/* routes for unauth-page and route for the not found page */}
        <Route path="*" element={<PageNotFound />}></Route>
        <Route
          path="/unauth-page"
          element={
            <CheckTheAuthentication
              user={user}
              isUserAuthenticated={isUserAuthenticated}
            >
              <Unauth />
            </CheckTheAuthentication>
          }
        ></Route>
        
      </Routes>
    </div>
  );
}

export default App;