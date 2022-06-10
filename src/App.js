import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Cafe from "./pages/Cafe/Cafe";
import CafeForm from "./pages/Cafe/Form/Form";
import Employee from './pages/Employee/Employee';
import EmployeeForm from './pages/Employee/Form/Form';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Cafe />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/add-cafe" element={<CafeForm />} />
        <Route path="/edit-cafe/:id" element={<CafeForm />} />
        <Route path="/add-employee" element={<EmployeeForm />} />
        <Route path="/edit-employee/:id" element={<EmployeeForm />} />
      </Routes>
    </>
  );
}

export default App;
