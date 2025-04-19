import { Content, Footer } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Badge, Input, Form, Modal, Checkbox } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  TeamOutlined,
  ProjectOutlined,
  MessageOutlined,
  SettingOutlined,
  BarChartOutlined,
  DashboardOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import { ListPlus, SquareKanban } from "lucide-react";
import axios from 'axios';
import { NavLink, Outlet } from 'react-router-dom';
import { createOneCustomer, updateOneCustomer } from './../../services/CustomerService';

const menuItems = [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: <NavLink to="/">Dashboard</NavLink>,
  },
  {
    key: "/projects",
    icon: <ProjectOutlined />,
    label: <NavLink to="/projects">Projects</NavLink>,
  },
  {
    key: "/teams",
    icon: <TeamOutlined />,
    label: <NavLink to="/teams">Teams</NavLink>,
  },
  {
    key: "/analytics",
    icon: <BarChartOutlined />,
    label: <NavLink to="/analytics">Analytics</NavLink>,
  },
  {
    key: "/messages",
    icon: <MessageOutlined />,
    label: <NavLink to="/messages">Messages</NavLink>,
  },
  {
    key: "/integrations",
    icon: <SettingOutlined />,
    label: <NavLink to="/integrations">Integrations</NavLink>,
  },
];

export default function DefaultLayout() {
  const [tableData, setTableData] = useState([]);
  const [overviewData, setOverviewData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCust, setSelectedCust] = useState({});
  const [isAdding, setIsAdding] = useState(false); // Track if adding or editing
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

  const showModal = (customer = {}) => {
    setSelectedCust(customer);
    setIsAdding(Object.keys(customer).length === 0); // If no customer, we're adding
    setIsModalOpen(true);
  };

  const showAddCustomerModal = () => {
    form.resetFields(); // Clear form for new customer
    showModal(); // Open modal with empty customer
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsAdding(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    let res;
    if (isAdding) {
      // Call create API
      res = await createOneCustomer(values);
    } else {
      // Call update API
      res = await updateOneCustomer(selectedCust.id, values);
    }

    if (res) {
      setIsModalOpen(false);
      setIsAdding(false);
      form.resetFields();
      const response = await axios.get("http://localhost:3000/customers");
      setTableData(response.data);
    } else {
      console.log(isAdding ? "Tạo mới thất bại" : "Cập nhật thất bại");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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

    fetchOverviewData();
    fetchTableData();
  }, []);

  useEffect(() => {
    if (isModalOpen && !isAdding && selectedCust) {
      form.setFieldsValue({
        ...selectedCust,
        status: selectedCust.status === "active",
      });
    }
  }, [selectedCust, isModalOpen, isAdding, form]);

  return (
    <div className='min-h-screen grid grid-cols-[250px_1fr] grid-rows-[auto_1fr_auto]'>
      {/* Sidebar */}
      <div className="bg-white shadow-md row-span-3">
        <div className="p-4 flex justify-center">
          <a href="/" className="text-2xl font-bold text-blue-500 text-center cursor-pointer">LOGO</a>
        </div>
        <Menu
          defaultSelectedKeys={["/"]}
          mode="inline"
          theme="light"
          items={menuItems}
        />
      </div>
      {/* Header */}
      <div className="bg-gray-300 py-4 shadow-lg flex items-center justify-between px-6 rounded-b-lg">
        <h1 className="text-2xl font-bold text-white">Header</h1>
        <div className="flex items-center space-x-4"></div>
      </div>

      {/* Main Content */}
      <Content className="p-6 bg-gray-400">
        <div className="space-y-6">
          {/* Modal */}
          <Modal
            title={isAdding ? "Thêm khách hàng mới" : "Cập nhật thông tin khách hàng"}
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
              initialValues={{ remember: true, status: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="grid grid-cols-2"
            >
              <Form.Item label="Họ tên" name="name" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[{ required: true, message: "Vui lòng nhập email" }, { type: "email", message: "Email không hợp lệ" }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Created Date"
                name="createdAt"
                rules={[{ required: true, message: "Vui lòng nhập ngày tạo" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="status" valuePropName="checked" label={"Active"}>
                <Checkbox />
              </Form.Item>
            </Form>
          </Modal>
          {/* Overview Section */}
          <h2 className="font-bold text-xl flex items-center space-x-2 mb-2 pb-2 mt-2">
            <SquareKanban size={32} style={{ color: "var(--color-blue-600)" }} />
            <span className="text-gray-800 text-2xl">Overview</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-10 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Turnover</h3>
              <p className="text-3xl font-bold text-blue-600">$ {turnover()}</p>
              <p className="text-green-500 text-sm">
                <CaretUpOutlined className="mr-2" />
                5.39% period of change
              </p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Profit</h3>
              <p className="text-3xl font-bold text-blue-600">$ {profit()}</p>
              <p className="text-green-500 text-sm">
                <CaretUpOutlined className="mr-2" />
                5.39% period of change
              </p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">New Customer</h3>
              <p className="text-3xl font-bold text-blue-600">{newCustomers()}</p>
              <p className="text-green-500 text-sm">
                <CaretUpOutlined className="mr-2" />
                6.8% period of change
              </p>
            </div>
          </div>

          {/* Detailed Report Section */}
          <h2 className="font-bold text-xl flex items-center space-x-2 mt-8 mb-2 pb-2">
            <ListPlus size={32} className="text-blue-600" />
            <span className="text-gray-800 text-2xl">Detail Report</span>
          </h2>
          <Outlet context={{ setSelectedCust, showModal, showAddCustomerModal }} />
        </div>
      </Content>

      {/* Footer */}
      <Footer className="text-center text-gray-500 bg-gray-200 shadow-md">
        Footer
      </Footer>
    </div>
  );
}