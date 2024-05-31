import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Selects from "../../../components/select/Select";
import Button from "../../../components/Buttons/Button";
import Input from "../../../components/Inputs/Input";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setError } from "../../../Error/ErrorSlice";
import { getOrders } from "./adminOrderSlice";
import { toast } from "react-toastify";
import Loading from "../../../components/loading/Loading";
const BookItem = ({ books }) => {
  return (
    <>
      {books.map((book) => {
        return (
          <div className="book">
            <div className="book-cover">
              <img src={`${process.env.REACT_APP_API_URL}images/${book?.cover}`} alt="book cover" />
            </div>
            <div className="book-details">
              <h2 className="book-title">{book?.title?.slice(0, 40)}...</h2>
              <h3 className="book-price">Price: {book?.price}</h3>
              <p className="book-count">Count: {book?.count}</p>
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
  const Navigate = useNavigate();
  const { id } = useParams();
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();

  const getOrderInfo = useMutation("getOrderInfo", async () => {
    return await axios.get(`/admin/orders/order/${id}`);
  });

  const updateOrderMutation = useMutation("updateOrder", async (values) => {
    return await axios.patch("/admin/orders/order/" + id, values);
  });

  const formik = useFormik({
    initialValues: {
      status: "",
      shipping: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      updateOrderMutation.mutate(values);
    },
  });

  React.useEffect(() => {
    getOrderInfo.mutate();
  }, [id]);

  useEffect(() => {
    if (updateOrderMutation.isError) {
      dispatch(setError(updateOrderMutation.error.response));
    }
  }, [updateOrderMutation.isError]);

  useEffect(() => {
    if (updateOrderMutation.isSuccess) {
      getOrderInfo.mutate();
      dispatch(getOrders({ fetch: axios }));
      toast.success("updated");
    }
  }, [updateOrderMutation.isSuccess]);

  let OrdersInfo = [];
  if (getOrderInfo.data) {
    OrdersInfo = getOrderInfo.data.data;
  }
  console.log(formik.errors);

  return (
    <div className="edit-order">
      <div className="close" onClick={() => Navigate("/admin/orders")}>
        <FontAwesomeIcon icon={faClose} />
      </div>
      {updateOrderMutation.isLoading || getOrderInfo.isLoading ? (
        <Loading width={"3rem"} height={"3rem"} />
      ) : (
        <>
          <div className="books">
            <h1>Books</h1>
            <BookItem books={OrdersInfo?.ordersItems ?? []} />
          </div>
          <Address address={OrdersInfo.address ?? []} />
          <div className="update">
            <h1>Update Order</h1>

            <form onSubmit={formik.handleSubmit}>
              <Selects.Select name="status" formik={formik} label={"Status"}>
                <Selects.Option
                  value="Pending"
                  selected={OrdersInfo.orderInfo?.status === "Pending"}
                >
                  Pending
                </Selects.Option>
                <Selects.Option
                  value="Processing"
                  selected={OrdersInfo.orderInfo?.status === "Processing"}
                >
                  Processing
                </Selects.Option>
                <Selects.Option
                  value="Delivered"
                  selected={OrdersInfo.orderInfo?.status === "Delivered"}
                >
                  Delivered
                </Selects.Option>
                <Selects.Option
                  value="Cancelled"
                  selected={OrdersInfo.orderInfo?.status === "Cancelled"}
                >
                  Cancelled
                </Selects.Option>
              </Selects.Select>

              <Input
                formik={formik}
                placeholder="Shipping"
                type="decimal"
                name="shipping"
                defaultValue={OrdersInfo.orderInfo?.shipping}
              />
              <Button
                loading={updateOrderMutation.isLoading}
                disabled={updateOrderMutation.isLoading}
                type="submit"
              >
                Update
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EditOrder;
