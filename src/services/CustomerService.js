import { post, put } from "./request";

export const updateOneCustomer = async (customerId, customer) => {
  const newCustomer = { ...customer, status: customer.status === false ? "inactive" : "active" };
  const result = await put(`customers/${customerId}`, newCustomer);

  if (result) {
    console.log("Cập nhật thành công:", result);
    return result;
  } else {
    console.log("Cập nhật thất bại");
  }
};

export const createOneCustomer = async (customer) => {
  const newCustomer = { ...customer, status: customer.status === false ? "inactive" : "active" };
  const result = await post(`customers`, newCustomer);

  if (result) {
    console.log("Tạo mới thành công:", result);
    return result;
  } else {
    console.log("Tạo mới thất bại");
  }
};