import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Menu, Avatar, Badge, Input } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  TeamOutlined,
  ProjectOutlined,
  MessageOutlined,
  SettingOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const menuItems = [
  {
    key: "1",
    icon: <ProjectOutlined />,
    label: "Projects",
  },
  {
    key: "2",
    icon: <TeamOutlined />,
    label: "Teams",
  },
  {
    key: "3",
    icon: <BarChartOutlined />,
    label: "Analytics",
  },
  {
    key: "4",
    icon: <MessageOutlined />,
    label: "Messages",
  },
  {
    key: "5",
    icon: <SettingOutlined />,
    label: "Integrations",
  },
];

const DefaultLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-[250px_1fr] grid-rows-[auto_1fr_auto]">
      {/* Sidebar */}
      <div className="bg-white shadow-md row-span-3">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-500 text-center">LOGO</h1>
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="light"
          items={menuItems}
        />
      </div>

      {/* Header */}
      <div className="bg-blue-600 py-4 shadow-lg flex items-center justify-between px-6 rounded-b-lg">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            className="w-64"
          />
          <div className="mr-10">
            <Badge className="cursor-pointer" count={5}>
              <BellOutlined className="text-xl text-white" />
            </Badge>
          </div>
          <Avatar src="https://picsum.photos/40" />
        </div>
      </div>

      {/* Main Content */}
      <Content className="p-6 bg-gray-100">
        <Outlet />
      </Content>

      {/* Footer */}
      <Footer className="text-center text-gray-500 bg-white shadow-md">
        © 2025 My Dashboard. All rights reserved.
      </Footer>
    </div>
  );
};

export default DefaultLayout;
