import { useState } from 'react'
import DefaultLayout from './layout/DefaultLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/DashBoard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
