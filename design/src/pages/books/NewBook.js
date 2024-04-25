import Button from "./../../components/Buttons/Button";
import Input from "./../../components/Inputs/Input";
import { useFormik } from "formik";
import useAxiosPrivate from "./../../hooks/useAxiosPrivate";
import useGetCategorys from "./../../hooks/useGetCategorys";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
const NewBook = () => {
  const axios = useAxiosPrivate();
  const navegate = useNavigate();
  const usecategory = useGetCategorys();
  const mutation = useMutation((values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("count", values.count);
    formData.append("category_id", values.category);
    formData.append("cover", values.cover);
    return axios.post("books/n/create", formData, {
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

      cover: Yup.mixed()
        .required("A cover image is required")
        .test(
          "fileSize",
          "The file is too large",
          (value) => !value || (value && value.size <= 1024 * 1024 * 3) // 2MB
        )
        .test(
          "fileType",
          "Unsupported File Format",
          (value) =>
            !value || (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
        ),
    }),
    onSubmit: (values) => {
      console.log(values);

      mutation.mutate(values);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      // navegate to books page
      navegate("/books");
      toast.success("Book created successfully");
    }
  }, [mutation.data, mutation.error, mutation.isSuccess, mutation.isError]);

  if (usecategory?.isError) {
    return <div>{usecategory?.error}</div>;
  }

  if (usecategory?.isLoading) {
    return <div>Loading...</div>;
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
        />
        <div className="description">
          <label htmlFor="description">Description: (markdown)</label>
          <textarea
            placeholder="Discretion"
            name="description"
            id="description"
            className={`${formik.touched.description && formik.errors.description ? "error" : ""}`}
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
        />
        <Input
          label={"Count"}
          placeholder={"Count"}
          formik={formik}
          name={"count"}
          type={"decimal"}
          id={"count"}
        />
        <select name="category" id="category" {...formik.getFieldProps("category")}>
          {usecategory?.data?.data?.category?.map((cat, index) => {
            if (index == 1) {
              return (
                <option defaultValue={cat.id} key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            } else {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            }
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

export default NewBook;
