import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import Selects from "../../components/select/Select";
import { setError } from "../../Error/ErrorSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
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
    .test({
      name: "status",
      message: "Invalid status",
      test: (value) => {
        if (value) {
          const status = ["Pending", "Processing", "Delivered", "Cancelled"];
          if (status.includes(value)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
    }),
  shipping: Yup.number().required("Shipping is required"),
});
const EditOrder = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();
  const axios = useAxiosPrivate();
  const getSellerOrderInfo = useQuery("getSellerOrderInfo", async () => {
    return await axios.get("/checkout/seller/" + id);
  });

  const updateOrderMutation = useMutation("updateOrder", async (values) => {
    return await axios.patch("/checkout/seller/" + id, values);
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      updateOrderMutation.mutate(values);
    },
  });

  useEffect(() => {
    if (getSellerOrderInfo.data) {
      console.log(getSellerOrderInfo.data.data[0]);
    }
  }, [getSellerOrderInfo]);

  React.useCallback(() => {
    if (id) {
      getSellerOrderInfo.refetch();
    }
  }, [id]);

  useEffect(() => {
    if (updateOrderMutation.isSuccess) {
      formik.resetForm();
      toast.success("Order updated successfully");
      getSellerOrderInfo.refetch();
      Navigate("/orders");
    }

    if (updateOrderMutation.isError) {
      dispatch(setError(updateOrderMutation?.error?.response));
    }
  }, [updateOrderMutation, formik, Navigate, dispatch]);

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
      <div className="close" onClick={() => Navigate("/orders")}>
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
          <Selects.Select name="status" formik={formik} label={"Status"}>
            <Selects.Option value="Pending">Pending</Selects.Option>
            <Selects.Option value="Processing">Processing</Selects.Option>
            <Selects.Option value="Delivered">Delivered</Selects.Option>
            <Selects.Option value="Cancelled">Cancelled</Selects.Option>
          </Selects.Select>

          <Input formik={formik} placeholder="Shipping" type="decimal" name="shipping" />
          <Button
            loading={updateOrderMutation.isLoading}
            disabled={updateOrderMutation.isLoading}
            type="submit"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
