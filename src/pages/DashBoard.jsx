import React, { useState, useEffect } from 'react';
import { Button, Tag } from 'antd';
import DataTable from 'react-data-table-component';
import { ProjectOutlined } from '@ant-design/icons'
const data = [
  { id: 1, customerName: 'Elizabeth Lee', company: 'AvatarSystems', orderValue: '$539', orderDate: '10/07/2023', status: 'New' },
  { id: 2, customerName: 'Carlos Garcia', company: 'SnoozeShift', orderValue: '$747', orderDate: '24/07/2023', status: 'New' },
  { id: 3, customerName: 'Elizabeth Bailey', company: 'Prime Time Telecom', orderValue: '$564', orderDate: '08/07/2023', status: 'In-progress' },
  { id: 4, customerName: 'Ryan Brown', company: 'OmniTech Corporation', orderValue: '$541', orderDate: '31/07/2023', status: 'In-progress' },
  { id: 5, customerName: 'Hailey Adams', company: 'DataStream Inc.', orderValue: '$929', orderDate: '25/07/2023', status: 'Completed' },
];

const columns = [
  {
    name: 'CUSTOMER NAME',
    selector: (row) => row.customerName,
    sortable: true,
    cell: (row) => (
      <div className="flex items-center space-x-2">
        <img src={`https://picsum.photos/30?random=${row.id}`} alt={row.customerName} className="rounded-full" />
        <span>{row.customerName}</span>
      </div>
    ),
  },
  {
    name: 'COMPANY',
    selector: (row) => row.company,
    sortable: true,
  },
  {
    name: 'ORDER VALUE',
    selector: (row) => row.orderValue,
    sortable: true,
  },
  {
    name: 'ORDER DATE',
    selector: (row) => row.orderDate,
    sortable: true,
  },
  {
    name: 'STATUS',
    selector: (row) => row.status,
    sortable: true,
    cell: (row) => (
      <Tag
        color={
          row.status === 'New' ? 'blue' : row.status === 'In-progress' ? 'orange' : 'green'
        }
      >
        {row.status}
      </Tag>
    ),
  },
];

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, []);

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <h2 className="font-bold text-xl flex items-center space-x-2 mb-2 pb-2">
        <ProjectOutlined className="text-blue-600" />
        <span>Overview</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Turnover</h3>
          <p className="text-3xl font-bold text-blue-600">$92,405</p>
          <p className="text-green-500 text-sm">5.39% period of change</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Profit</h3>
          <p className="text-3xl font-bold text-blue-600">$32,218</p>
          <p className="text-green-500 text-sm">5.39% period of change</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">New Customer</h3>
          <p className="text-3xl font-bold text-blue-600">298</p>
          <p className="text-green-500 text-sm">6.8% period of change</p>
        </div>
      </div>

      {/* Detailed Report Section */}
      <h2 className="font-bold text-xl flex items-center space-x-2 mt-6 mb-2 pb-2">
        <ProjectOutlined className="text-blue-600" />
        <span>Detail Report</span>
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="space-x-2">
            <Button type="default">Import</Button>
            <Button type="primary" style={{ backgroundColor: '#2563eb', borderColor: '#2563eb' }}>
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
                fontWeight: 'bold',
                color: '#2563eb', // Màu chủ đạo blue-600
              },
            },
            cells: {
              style: {
                color: '#374151',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;