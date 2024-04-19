import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";

//import {UserContextProvider} from "./UserContext";



function App(){
  return (
    
      <Routes>
      <Route path="/" element={<Layout />}>
       <Route path="/login" element={<LoginPage />} />
      </Route>
      


      </Routes>
    
  )
}

export default App
