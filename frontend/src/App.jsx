import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";


//import {UserContextProvider} from "./UserContext";

axios.defaults.baseURL = 'http://localhost:8800';

function App(){
  return (
    
      <Routes>
      <Route path="/" element={<Layout />}>
       <Route path="/login" element={<LoginPage />} />
       <Route path="/register" element={<RegisterPage />} />

      </Route>
      


      </Routes>
    
  )
}

export default App
