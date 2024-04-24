import {Link, Navigate} from "react-router-dom";
import {useContext,useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";


export default function LoginPage(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);



  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      
      const {data} = await axios.post('/api/auth/login', {username,password});
      setUser(data);
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      alert('Login failed');
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }

    return (
        <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
              <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={ev => setUsername(ev.target.value)}
                      />
              <input type="password"
                     placeholder="password"
                     value={password}
                     onChange={ev => setPassword(ev.target.value)} 
                     />
              <button className="primary">Login</button>
              <div className="text-center py-2 text-gray-500">
                Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
            
              </div>
            </form>
          </div>
        </div>
      );
    }
