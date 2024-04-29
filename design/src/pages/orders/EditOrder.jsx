import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
const BookItem = ({ books }) => {
  return (
    <>
      {books.map((order) => {
        console.log(order);
        return (
          <div className="book">
            <div className="book-cover">
              <img
                src={`${process.env.REACT_APP_API_URL}images/${order?.cover}`}
                alt="book cover"
              />
            </div>
            <div className="book-details">
              <h2 className="book-title">{order?.title}</h2>
              <h3 className="book-price">{order?.price}</h3>
              <p className="book-count">{order?.count}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

const Address = ({ address }) => {
  return (
    <div className="address">
      <h1>Address</h1>
      <p>
        {Object.entries(address).map(([key, value]) => {
          return (
            <>
              <div className="address-item">
                <p>
                  {key} : {value}
                </p>
              </div>
            </>
          );
        })}
      </p>
    </div>
  );
};

const initialValues = {
  status: "",
  shipping: 0,
};

const validationSchema = Yup.object({
  status: Yup.string()
    .required("Status is required")
    .test("status", "Invalid status", (value) => {
      if (value) {
        const status = ["pending", "processing", "delivered", "cancelled"];
        if (status.includes(value)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }),
});
const EditOrder = () => {
  const { id } = useParams();
  const axios = useAxiosPrivate();
  const getSellerOrderInfo = useQuery("getSellerOrderInfo", async () => {
    return await axios.get("/checkout/seller/" + id);
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  React.useCallback(() => {
    if (id) {
      getSellerOrderInfo.refetch();
    }
  }, [id]);

  if (getSellerOrderInfo.isError) {
    return <div>Error</div>;
  }
  if (getSellerOrderInfo.isLoading) {
    return <div>Loading...</div>;
  }

  let OrdersInfo = [];
  if (getSellerOrderInfo.data) {
    OrdersInfo = getSellerOrderInfo.data.data[0];
  }
  console.log(OrdersInfo);
  return (
    <div className="edit-order">
      <div className="close">
        <FontAwesomeIcon icon={faClose} />
      </div>
      <div className="books">
        <h1>Books</h1>
        <BookItem books={OrdersInfo?.orders} />
      </div>
      <Address address={OrdersInfo?.address} />
      <div className="update">
        <h1>Update Order</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-grop">
            <label htmlFor="status">Status</label>
            <select name="status" {...formik.getFieldProps("status")} id="">
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {formik.touched.status && formik.errors.status ? (
              <div className="error">{formik.errors.status}</div>
            ) : null}
          </div>

          <Input formik={formik} placeholder="Shipping" type="decimal" name="shipping" />
          <Button type="submit">Update</Button>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
