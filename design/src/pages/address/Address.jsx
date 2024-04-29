import React from "react";
import Button from "./../../components/Buttons/Button";
import Input from "./../../components/Inputs/Input";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectAddress, getAddress, selectAddressState, addAddress } from "./addressSlice";
import { setError } from "../../Error/ErrorSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useGetGovernment from "../../hooks/useGetGovernment";

const v = Yup.object({
  username: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(15, "Must be 15 characters or less")
    .required("Required username"),
  government: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(32, "Must be 32 characters or less")
    .required("Required government"),
  city: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(32, "Must be 32 characters or less")
    .required("Required city"),
  address: Yup.string()
    .min(20, "Must be at least 3 characters")
    .max(300, "Must be 300 characters or less")
    .required("Required address"),
  mobile: Yup.string()
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .matches(/^[1-9][0-9]{9}$/, "Must be only digits")
    .test("startsWithZero", "Mobile number cannot start with 0", (value) => {
      if (value && value.charAt(0) === "0") {
        return false;
      }
      return true;
    })
    .required("mobile phone is Required"),
});
const hasDataChanged = (initialData, currentData) => {
  // Compare initial data with current data
  for (const key in initialData) {
    if (initialData[key] !== currentData[key]) {
      return true; // Data has changed
    }
  }
  return false; // Data has not changed
};
const Address = () => {
  const addressData = useSelector(selectAddress)[0];
  const { isError, isLoading, error } = useSelector(selectAddressState);
  const getGovernement = useGetGovernment();
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      government: "",
      city: "",
      address: "",
      mobile: "",
    },
    validationSchema: v,
    onSubmit: (values) => {
      console.log(formik.dirty);
      // const hasChanged = hasDataChanged(addressData, values);
      if (false) {
        toast.warn("No changes made");
        return;
      }
      dispatch(addAddress({ fetch: axios, address: values }));
    },
  });

  React.useEffect(() => {
    getGovernement.mutate();
  }, []);

  React.useEffect(() => {
    dispatch(getAddress({ fetch: axios }));
  }, []);

  React.useEffect(() => {
    if (addressData) {
      // if (addressData?.msg?.length > 0) {
      //   toast.warn(addressData.msg);
      //   return;
      // }
      formik.setValues(addressData);
    }
  }, [addressData]);

  React.useState(() => {
    if (isError) {
      dispatch(setError(error));
    }
  }, [isError]);

  // if (isError) {
  //   return <p>error {error?.data?.msg}</p>;
  // }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  let egyptGovernorates = [];
  if (getGovernement.data) {
    egyptGovernorates = getGovernement.data.data;
  }

  return (
    <div className="address-form">
      <form onSubmit={formik.handleSubmit}>
        <Input
          formik={formik}
          label="Username"
          name="username"
          type="text"
          id="username"
          placeholder="Username"
        />
        <div className="mobile">
          <p>+20</p>
          <Input
            formik={formik}
            label="Mobile"
            type="number"
            name="mobile"
            id="mobile"
            placeholder="Mobile"
          />
        </div>

        <div className="form-group">
          <label htmlFor="government">Government:</label>
          <select name="government" id="government" {...formik.getFieldProps("government")}>
            {egyptGovernorates?.map((index, i) => {
              return (
                <option defaultValue={i === 1 ? index.id : ""} key={index.id} value={index?.id}>
                  {index?.gov}
                </option>
              );
            })}
          </select>
          {formik.touched.government && formik.errors.government ? (
            <div style={{ color: "var(--errorcolor)" }}>{formik.errors.government}</div>
          ) : null}
        </div>

        <Input
          formik={formik}
          label={"City"}
          name="city"
          type="text"
          id="city"
          placeholder="City"
        />

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            placeholder="Address"
            name="address"
            rows="3"
            {...formik.getFieldProps("address")}
          ></textarea>
          {formik.touched.address && formik.errors.address ? (
            <div style={{ color: "var(--errorcolor)" }}>{formik.errors.address}</div>
          ) : null}
        </div>
        <Button loading={isLoading} disabled={isLoading} type="submit" className="submit-btn">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Address;
