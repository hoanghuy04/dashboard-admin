import { Button, Tag } from 'antd';
import axios from 'axios';
import { PencilLine } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function CustomerReport() {
    const [tableData, setTableData] = useState([])

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
                            setSelectedCust({
                                ...row,
                                status: row.status === "inactive" ? false : true,
                            });
                            showModal();
                        }}
                    />
                    <span style={{ display: "none" }}>{row.id}</span>
                </div>
            ),
        },
    ];

    useEffect(() => {
        const fetchTableData = async () => {
            const response = await axios.get("http://localhost:3000/customers");

            if (Array.isArray(response.data)) {
                setTableData(response.data);
            }
        };

        fetchTableData();
    }, []);

    return (

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
                paginationPerPage={8}
                paginationRowsPerPageOptions={[8, 16, 24]}
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
    )
}
