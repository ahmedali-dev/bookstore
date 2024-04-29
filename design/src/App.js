import { Suspense, lazy, useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { UnauthenticatedRoute, AuthenticatedRoute } from "./utils/AuthHandler";
import UserLayout from "./components/layout/UserLayout";
import SalerLayout from "./components/layout/SellerLayout";
import Loading from "./components/loading/Loading";
const Register = lazy(() => import("./pages/register/Register"));
const SignIn = lazy(() => import("./pages/signin/Signin"));
const Home = lazy(() => import("./pages/home/Home"));
const Books = lazy(() => import("./pages/books/Books"));
const NewBook = lazy(() => import("./pages/books/NewBook"));
const EditBook = lazy(() => import("./pages/books/EditBook"));
const ViewBook = lazy(() => import("./pages/books/ViewBook"));
const Cart = lazy(() => import("./pages/Cart/CartRoutes"));
const Userinfo = lazy(() => import("./pages/UserInfo/UserInfo"));
const OrderForSeller = lazy(() => import("./pages/orders/OrderForSeller"));
function App() {
  // send request use axios

  useEffect(() => {
    document.title = "Bookly";
  }, []);
  return (
    <>
      <Suspense
        fallback={
          <div>
            <Loading width={"100px"} height={"100px"} />
          </div>
        }
      >
        <Routes>
          {/* ----------------------------------- */}
          {/* private route */}
          {/* ----------------------------------- */}
          <Route element={<AuthenticatedRoute />}>
            {/* ----------------------------------- */}
            {/* userlayout route */}
            {/* ----------------------------------- */}
            <Route
              element={
                <div className="container-grid">
                  <Outlet />
                </div>
              }
            >
              <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<div>search</div>} />
                <Route path="/books/v/:id" element={<ViewBook />} />

                <Route path="/cart/*" element={<Cart />} />
                {/* <Route path="/cart/checkout" element={<Checkout />} /> */}
                <Route path="/account/*" element={<Userinfo />} />

                {/* ----------------------------------- */}
                {/* salerlayout route */}
                {/* ----------------------------------- */}
                <Route element={<SalerLayout />}>
                  <Route path="/seller" element={<div>dashboard</div>} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/books/new" element={<NewBook />} />
                  <Route path="/books/edit/:id" element={<EditBook edit={true} />} />
                  <Route path="/orders/*" element={<OrderForSeller />} />
                </Route>
              </Route>
            </Route>
          </Route>

          {/* ----------------------------------- */}
          {/* public route */}
          {/* ----------------------------------- */}
          <Route element={<UnauthenticatedRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
