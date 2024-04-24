import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";




export default function IndexPage() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios.get('/api/room/rooms').then(response => {
      setRooms(response.data);
    });
  }, []);


  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3  py-12">
      {rooms.length > 0 && rooms.map(Room => (
        <Link key={Room._id} to={`/RoomPages/${Room._id}`}>
        <div className="mt-10 mb-3">
          <img
            className="rounded-xl object-cover aspect-square w-[180px] cursor-pointer"
            src="https://blog.1001salles.com/wp-content/uploads/2015/04/preparer-sa-salle.jpg"
            alt=""
          />
          </div>
          
          <div>
          <h2 className="font-bold">{Room.roomNumber} </h2>
          <h3 className="text-sm text-gray-500">{Room.capacity} </h3>
          <h3 className="text-sm text-gray-500">{Room.equipment} </h3>
          </div>
          </Link>
      ))}
    </div>
  );
}

