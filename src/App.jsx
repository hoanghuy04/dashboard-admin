import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./components/layout/DefaultLayout"
import CustomerReport from "./components/CustomerReport"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />} >
            <Route index element={<CustomerReport />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
