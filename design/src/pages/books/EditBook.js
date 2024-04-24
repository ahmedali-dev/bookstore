import Button from "components/Buttons/Button";
import Input from "components/Inputs/Input";
import { useFormik } from "formik";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useGetCategorys from "hooks/useGetCategorys";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { updateBook } from "./BookSlice";
const EditBook = () => {
  const axios = useAxiosPrivate();
  const navegate = useNavigate();
  const usecategory = useGetCategorys();
  const dispatch = useDispatch();
  const { id } = useParams();
  const query = useQuery("edit", () => {
    return axios.get(`books/${id}`);
  });
  const mutation = useMutation((values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("count", values.count);
    formData.append("category_id", values.category);
    formData.append("cover", values.cover);
    return axios.post(`books/n/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      count: "",
      category: "",
      cover: [],
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .required("Title is required")
        .max(255, "Title cannot exceed 255 characters"),

      description: Yup.string()
        .required("Description is required")
        .min("50", "Description can not less than 50 character"),
      // .max(1000, "Description cannot exceed 1000 characters"),,

      price: Yup.number()
        .required("Price is required")
        .positive("Price must be a positive number")
        .max(10000, "Price cannot exceed $10,000"),

      count: Yup.number()
        .required("Count is required")
        .integer("Count must be an integer")
        .positive("Count must be greater than zero"),

      category: Yup.string().required("Category is required"),
    }),
    onSubmit: (values) => {
      console.log(values);

      mutation.mutate(values);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      // navegate to books page
      dispatch(updateBook(mutation?.data?.data?.UpdatedBook));
      navegate("/books");
      toast.success("Book created successfully");
    }
  }, [mutation.data, mutation.error, mutation.isSuccess, mutation.isError]);
  useEffect(() => {
    let queryData = [];
    if (query?.data) {
      queryData = query?.data?.data[0];
    }
    formik.setValues({
      title: queryData?.title,
      description: queryData?.description,
      price: queryData?.price,
      count: queryData?.count,
      category: queryData?.category_id,
    });
  }, [query.data]);
  if (query?.isError) {
    return <div>{usecategory?.error}</div>;
  }

  if (query?.isLoading) {
    return <div>Loading...</div>;
  }

  let queryData = [];
  if (query?.data) {
    queryData = query?.data?.data[0];
  }

  return (
    <div className="addnewbook">
      <form onSubmit={formik.handleSubmit}>
        <Input
          id={"title"}
          label={"Title"}
          placeholder={"Title"}
          formik={formik}
          name={"title"}
          type={"text"}
          defaultValue={queryData?.title}
        />
        <div className="description">
          <label htmlFor="description">Description: (markdown)</label>
          <textarea
            placeholder="Discretion"
            name="description"
            id="description"
            className={`${formik.touched.description && formik.errors.description ? "error" : ""}`}
            defaultValue={queryData?.description}
            {...formik.getFieldProps("description")} // add formik field props
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div className="error">{formik.errors.description}</div>
          ) : null}
        </div>
        <Input
          label={"Price"}
          placeholder={"Price"}
          formik={formik}
          name={"price"}
          type={"decimal"}
          id={"price"}
          defaultValue={queryData?.price}
        />
        <Input
          label={"Count"}
          placeholder={"Count"}
          formik={formik}
          name={"count"}
          type={"decimal"}
          id={"count"}
          defaultValue={queryData?.count}
        />
        <select name="category" id="category" {...formik.getFieldProps("category")}>
          {usecategory?.data?.data?.category?.map((cat, index) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            );
          })}
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div style={{ color: "var(--errorcolor)" }}>{formik.errors.category}</div>
        ) : null}
        <Input
          label={"Cover"}
          formik={formik}
          name={"cover"}
          type={"file"}
          onChange={(event) => {
            formik.setFieldValue("cover", event.currentTarget.files[0]);
          }}
        />

        <Button type={"submit"}>Submit</Button>
      </form>
    </div>
  );
};

export default EditBook;
