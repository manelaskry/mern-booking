import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    axios.get('/api/res')
      .then(response => {
        setBookings(response.data);
        // Fetch room details for each booking
        const roomIds = response.data.map(booking => booking.room);
        axios.get('/api/room/rooms', { params: { ids: roomIds.join(',') } })
          .then(response => {
            const roomDetails = {};
            response.data.forEach(room => {
              roomDetails[room._id] = room;
            });
            setRooms(roomDetails);
          })
          .catch(error => {
            console.error('Error fetching room details:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
  }, []);

  return (
    <div className="my-8">
      <AccountNav />
      <div className="grid gap-6">
        {bookings?.length > 0 && bookings.map(booking => (
          <div key={booking._id} className="bg-gray-200 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Room Number: {rooms[booking.room]?.roomNumber}</h2>
              <div className="text-lg">
                <p>Start Time: {new Date(booking.startTime).toLocaleString()}</p>
                <p>End Time: {new Date(booking.endTime).toLocaleString()}</p>
                <p>Total price: ${booking.price}</p>
              </div>
            </div>
            <div className="bg-primary p-6 text-white rounded-2xl">
              <Link to={`/bookings/${booking._id}`} className="text-xl font-semibold">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
