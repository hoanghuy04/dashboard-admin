import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Modal, Tag } from "antd";
import DataTable from "react-data-table-component";
import { ProjectOutlined, CaretUpOutlined } from "@ant-design/icons";
import axios from "axios";
import { PencilLine } from "lucide-react";
import { updateOneCustomer } from "../services/CustomerService";

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [overviewData, setOverviewData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCust, setSelectedCust] = useState({});
  const [form] = Form.useForm();

  const turnover = () => {
    return overviewData.reduce((total, item) => total + item.totalPrice, 0);
  };

  const profit = () => {
    return overviewData.reduce((total, item) => total + item.profit, 0);
  };

  const newCustomers = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return tableData.filter((cust) => {
      const createdDate = new Date(cust.createdAt);

      return (
        createdDate.getMonth() === currentMonth &&
        createdDate.getFullYear() === currentYear
      );
    }).length;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const res = await updateOneCustomer(selectedCust.id, values);

    if (res) {
      console.log(res);
      setIsModalOpen(false);

      const response = await axios.get("http://localhost:3000/customers");
      setTableData(response.data);
    } else {
      console.log("Cập nhật thất bại");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      name: "CUSTOMER NAME",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <img
            src={`https://picsum.photos/30?random=${row.id}`}
            alt={row.customerName}
            className="rounded-full"
          />
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "PHONE",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "ADDRESS",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "CREATED DATE",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <Tag color={row.status === "active" ? "orange" : "green"}>
          {row.status}
        </Tag>
      ),
    },
    {
      name: "",
      cell: (row) => (
        <div className="">
          <PencilLine
            className={"cursor-pointer"}
            onClick={() => {
              setSelectedCust(row);
              showModal();
            }}
          />
          <span style={{ display: "none" }}>{row.id}</span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchOverviewData = async () => {
      const response = await axios.get("http://localhost:3000/orders");

      if (Array.isArray(response.data)) {
        setOverviewData(response.data);
      }
    };

    const fetchTableData = async () => {
      const response = await axios.get("http://localhost:3000/customers");

      if (Array.isArray(response.data)) {
        setTableData(response.data);
      }
    };

    fetchTableData();
    fetchOverviewData();
  }, []);

  useEffect(() => {
    if (isModalOpen && selectedCust) {
      form.setFieldsValue({
        ...selectedCust,
      });
    }
  }, [selectedCust, isModalOpen]);
  return (
    <div className="space-y-6">
      <Modal
        title="Cập nhật thông tin khách hàng"
        width={800}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="CustomerInfor"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="grid grid-cols-2"
        >
          <Form.Item label="Họ tên" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Created Date"
            name="createdAt"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="status" valuePropName="checked" label={"Active"}>
            <Checkbox />
          </Form.Item>
        </Form>
      </Modal>
      {/* Overview Section */}
      <h2 className="font-bold text-xl flex items-center space-x-2 mb-2 pb-2">
        <ProjectOutlined className="text-blue-600" />
        <span className="text-gray-800">Overview</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Turnover</h3>
          <p className="text-3xl font-bold text-blue-600">$ {turnover()}</p>
          <p className="text-green-500 text-sm">
            <CaretUpOutlined className="mr-2" />
            5.39% period of change
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Profit</h3>
          <p className="text-3xl font-bold text-blue-600">$ {profit()}</p>
          <p className="text-green-500 text-sm">
            <CaretUpOutlined className="mr-2" />
            5.39% period of change
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">New Customer</h3>
          <p className="text-3xl font-bold text-blue-600">{newCustomers()}</p>
          <p className="text-green-500 text-sm">
            <CaretUpOutlined className="mr-2" />
            6.8% period of change
          </p>
        </div>
      </div>

      {/* Detailed Report Section */}
      <h2 className="font-bold text-xl flex items-center space-x-2 mt-6 mb-2 pb-2">
        <ProjectOutlined className="text-blue-600" />
        <span className="text-gray-800">Detail Report</span>
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-end">
          <div className="space-x-2">
            <Button type="default">Import</Button>
            <Button
              type="primary"
              style={{ backgroundColor: "#2563eb", borderColor: "#2563eb" }}
            >
              Export
            </Button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={tableData}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
          highlightOnHover
          customStyles={{
            headCells: {
              style: {
                fontWeight: "bold",
                color: "#2563eb",
              },
            },
            cells: {
              style: {
                color: "#374151",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
