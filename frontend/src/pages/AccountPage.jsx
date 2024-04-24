import { useContext, useState } from "react"; 
import { UserContext } from "../UserContext.jsx";
import { Navigate,Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import axios from "axios";



export default function AccountPage() {
  const [redirect,setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext); 
    let {subpage} = useParams();
    if (subpage === undefined){
        subpage ='profile';
    }

    async function logout() {
        await axios.post('/api/logout/logout');
        setRedirect('/');
        setUser(null);
      }


      if (!ready) {
        return 'Loading...';
      }
    
      if (ready && !user && !redirect ) {
        return <Navigate to={'/login'} />
      }
    
      
   

    function linkClasses(type = null) {
        let classes = '1 py-2 px-6';
        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full';
        }
        return classes;
    }
    

    return (
        <div>
        <nav className="w-full flex justify-center mt-8 gap-2 ">
      <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
      <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
        </nav>
        {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto py-20">
          you are logged in<br />
          <button onClick={logout} className="primary max-w-sm mt-2 py-6">Logout</button>
        </div>
      )}
        </div>
    );
    }
