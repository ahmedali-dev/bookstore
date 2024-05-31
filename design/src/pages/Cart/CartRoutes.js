import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import Checkout from "../checkout/Checkout";

const CartRoutes = () => {
  return (
    <>
      <Cart />
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default CartRoutes;
