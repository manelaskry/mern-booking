import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function RoomPages() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  async function reserve() {
    if (!room || !startTime || !endTime) {
      console.error('Incomplete reservation data.');
      return;
    }

    const data = { roomId: room._id, userId: 'userId_placeholder', startTime, endTime };

    try {
      const response = await axios.post('/api/res/createres', data);
      if (response.status === 200) {
        console.log('Reservation created successfully');
        setStartTime('');
        setEndTime('');
      } else {
        console.error('Reservation creation failed with status:', response.status);
      }
    } catch (error) {
      console.error('Reservation creation failed:', error);
    }
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/room/${id}`).then(response => {
      setRoom(response.data);
    });
  }, [id]);

  if (!room) return '';

  const formatDate = (date) => {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
  };

  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'>
      <h1 className='text-2xl mb-4 font-semibold '>Meeting room available</h1>
      <div className='grid gap-2 grid-cols-[2fr_1fr]'>
        <div>
          <img className='aspect-square object-cover rounded-xl' src='https://www.concept-bureau.fr/img/cms/blog/salle-de-reunion.jpg' />
        </div>
        <div className='grid gap-1 '>
          <img className='aspect-square object-cover rounded-xl' src='https://www.laradiodesentreprises.com/wp-content/uploads/2022/02/_x_amenagement-salle-de-reunion.jpeg' />
          <img className='aspect-square object-cover rounded-xl' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVaQwLfoNG4X019F6JQGl-bfdroj7Agg1H5g&s' />
        </div>
      </div>

      <div className="mt-8 mb-8 grid  grid-cols-1 ">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae massa in lorem posuere condimentum. Vestibulum nec fringilla nulla. Mauris ultrices nisi non metus consequat, vel consequat nulla porta. Donec at malesuada lorem.</h3>
          </div>
          <div className='grid grid-cols-[2fr_1fr]'>
            <div className='mb-12'>
              <h2 className="font-semibold text-2xl">About this room</h2>
              roomNumber: {room.roomNumber}<br />
              capacity: {room.capacity}<br />
              equipment: {room.equipment}<br />
              unavailableDates :{room.unavailableDates.map(date => formatDate(date)).join(', ')}
            </div>
            <div >
              <div className='bg-white shadow p-4 rounded-2xl mb-4   '>
                <input type='text' placeholder='RoomNumber' value={room._id} readOnly />
                <div className='my-4 border py-3 px-4 rounded-2xl'>
                  <label>check in :  </label>
                  <input type='datetime-local' value={startTime} onChange={ev => setStartTime(ev.target.value)} />
                </div>
                <div className='my-4 border py-3 px-4 rounded-2xl'>
                  <label>checkout :</label>
                  <input type='datetime-local' value={endTime} onChange={ev => setEndTime(ev.target.value)} />
                </div>
                <button onClick={reserve} className='primary mt-4'>Reserve</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">extraInfo</div>
      </div>
    </div>
  );
}
