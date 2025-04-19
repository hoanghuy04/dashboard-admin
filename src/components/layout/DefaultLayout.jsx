import { Content, Footer } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
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
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {

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
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
      setIsModalOpen(false);
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
    fetchTableData()
  }, []);

  useEffect(() => {
    if (isModalOpen && selectedCust) {
      form.setFieldsValue({
        ...selectedCust,
      });
    }
  }, [selectedCust, isModalOpen]);

  return (
    <div className='min-h-screen grid grid-cols-[250px_1fr] 
        grid-rows-[auto_1fr_auto]'>
      {/* Sidebar */}
      <div className="bg-gray-200 shadow-md row-span-3">Sidebar</div>
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
          <Outlet context={{ setSelectedCust, showModal }} />
        </div>
      </Content>

      {/* Footer */}
      <Footer className="text-center text-gray-500 bg-gray-200 shadow-md">
        Footer
      </Footer>
    </div>
  )
}
