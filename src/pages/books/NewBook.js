import Button from "./../../components/Buttons/Button";
import Input from "./../../components/Inputs/Input";
import { useFormik } from "formik";
import useAxiosPrivate from "./../../hooks/useAxiosPrivate";
import useGetCategorys from "./../../hooks/useGetCategorys";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewBookVaidation } from "./addNewBookValidation";
import { useDispatch, useSelector } from "react-redux";
import { addBook, selectBooksState, updateSuccess } from "./BookSlice";
import { setError } from "../../Error/ErrorSlice";
const NewBook = () => {
  const axios = useAxiosPrivate();
  const navegate = useNavigate();
  const usecategory = useGetCategorys();
  const dispatch = useDispatch();
  const { error, isError, isLoading, isSuccess } = useSelector(selectBooksState);

  // const mutation = useMutation((values) => {
  //   const formData = new FormData();
  //   formData.append("title", values.title);
  //   formData.append("description", values.description);
  //   formData.append("price", values.price);
  //   formData.append("count", values.count);
  //   formData.append("category_id", values.category);
  //   formData.append("cover", values.cover);
  //   return axios.post("books/n/create", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // });
  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      count: "",
      category: "",
      cover: [],
    },
    validationSchema: addNewBookVaidation,
    onSubmit: (values) => {
      dispatch(addBook({ fetch: axios, book: values })).finally(()=> {
        if(!isError) {
          dispatch(updateSuccess());
          navegate("/books");
          toast.success("Book created successfully");
        }
      });
    },
  });

  useEffect(() => {
    if (isError) {
      dispatch(setError(error));
    }
  }, [isSuccess, isError]);

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
        <div>
          <p>Category</p>
          <select name="category" id="category" {...formik.getFieldProps("category")}>
            {usecategory?.data?.data?.category?.map((cat, index) => {
              if (index == 1) {
                return (
                  <option selected={true} key={cat.id} value={cat.id}>
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
        </div>
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
