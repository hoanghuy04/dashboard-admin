import { Content, Footer } from 'antd/es/layout/layout'
import React from 'react'

export default function DefaultLayout() {
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
                Main content
            </Content>

            {/* Footer */}
            <Footer className="text-center text-gray-500 bg-gray-200 shadow-md">
                Footer
            </Footer>
        </div>
    )
}
