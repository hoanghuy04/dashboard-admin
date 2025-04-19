import { put } from "./request"

export const updateOneCustomer = async (customerId, customer) => {
    const newCustomer = {...customer, status: customer.status === false ? "inactive" : "active"}
    const result = await put(`customers/${customerId}`, newCustomer)

    if (result) {
        console.log("Cập nhật thành công:", result);
        return result
    } else {
        console.log("Cập nhật thất bại");
    }
}       