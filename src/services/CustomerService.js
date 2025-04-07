import { put } from "./request"

export const updateOneCustomer = async (customerId, customer) => {
    const result = await put(`customers/${customerId}`, customer)

    if (result) {
        console.log("Cập nhật thành công:", result);
    } else {
        console.log("Cập nhật thất bại");
    }
}       