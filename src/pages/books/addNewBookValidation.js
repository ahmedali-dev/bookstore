import * as Yup from "yup";
export const addNewBookVaidation = Yup.object().shape({
  title: Yup.string().required("Title is required").max(255, "Title cannot exceed 255 characters"),

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
      (value) => !value || (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
    ),
});
