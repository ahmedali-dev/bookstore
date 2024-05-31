import { Suspense, lazy, useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { UnauthenticatedRoute, AuthenticatedRoute, IsAdmin } from "./utils/AuthHandler";
import UserLayout from "./components/layout/UserLayout";
import SalerLayout from "./components/layout/SellerLayout";
import Loading from "./components/loading/Loading";
import AdminLayout from "./components/layout/AdminLayout";

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
const Search = lazy(() => import("./pages/search/Search"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

// -----------------------------------------------------------------------
// admin pages
// -----------------------------------------------------------------------
const Users = lazy(() => import("./pages/page.admin/users/Users"));
const AdminBooks = lazy(() => import("./pages/page.admin/books/AdminBooks"));
const AdminOrders = lazy(() => import("./pages/page.admin/orders/AdminOrders"));
const AdminDashboard = lazy(() => import("./pages/page.admin/admin.dashboard/AdminDashboard"));
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
            <Loading width={"3rem"} height={"3rem"} />
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
                <Route path="/search/:search" element={<Search />} />
                <Route path="/cart/*" element={<Cart />} />
                {/* <Route path="/cart/checkout" element={<Checkout />} /> */}
                <Route path="/account/*" element={<Userinfo />} />

                {/* ----------------------------------- */}
                {/* salerlayout route */}
                {/* ----------------------------------- */}
                <Route element={<SalerLayout />}>
                  {/* <Route path="/seller" element={<div>dashboard</div>} /> */}
                  <Route path="/books" element={<Books />} />
                  <Route path="/books/new" element={<NewBook />} />
                  <Route path="/books/edit/:id" element={<EditBook edit={true} />} />
                  <Route path="/orders/*" element={<OrderForSeller />} />
                  <Route path="/seller" element={<Dashboard />} />
                </Route>
              </Route>

              <Route path="*" element={<div>Page not found</div>} />
            </Route>
          </Route>
          <Route
            element={
              <div className="container-grid">
                <Outlet />
              </div>
            }
          >
            <Route element={<IsAdmin />}>
              {/* layout */}
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users/*" element={<Users />} />
                <Route path="/admin/books/*" element={<AdminBooks />} />
                <Route path="/admin/orders/*" element={<AdminOrders />} />

                <Route path="*" element={<div>Page not found</div>} />
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
