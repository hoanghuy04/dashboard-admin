import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./components/layout/DefaultLayout"
import CustomerReport from "./components/CustomerReport"
import ProjectReport from './components/ProjectReport';
import TeamReport from './components/TeamReport';
import Analystic from './components/Analystic';
import MessageReport from './components/MessageReport';
import IntergrationReport from './components/IntergrationReport';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
            <Route index element={<CustomerReport />} />
            <Route path='projects' element={<ProjectReport />} />
            <Route path='teams' element={<TeamReport />} />
            <Route path='analytics' element={<Analystic />} />
            <Route path='messages' element={<MessageReport />} />
            <Route path='integrations' element={<IntergrationReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;