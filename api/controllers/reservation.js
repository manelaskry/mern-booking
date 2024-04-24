import Room from "../models/Room.js";
import Reservation from "../models/Reservation.js";
import { verifyToken } from "../utils/verifyToken.js";
import {sendReservationConfirmationEmail} from "../utils/emailService.js"


export const createReservation = async (req, res, next) => {
    const { roomId,userId ,startTime, endTime } = req.body;

    try {
        verifyToken(req, res, async () => {
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).send("Room not found");
        }

        const existingReservation = await Reservation.findOne({
            room: roomId,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Check if there is any overlapping reservation
                {
                    $and: [
                        { startTime: { $gte: startTime, $lte: endTime } },
                        { endTime: { $gte: startTime, $lte: endTime } }
                    ]
                }
            ]
        });

        if (existingReservation) {
            return res.status(400).json({ message: "Room is not available for the specified time period" });
        }

        const reservedDates = getDatesBetween(startTime, endTime);
        room.unavailableDates.push(...reservedDates);
        await room.save();

        const reservation = new Reservation({
            room: roomId,
            user:userId,
            startTime,
            endTime
        });
        await reservation.save();
        await reservation.populate('user').then(p=>console.log(p))
        .catch(error=>console.log(error));
        await reservation.populate('room').then(p=>console.log(p))
        .catch(error=>console.log(error));
        sendReservationConfirmationEmail(reservation.user.email, reservation);

        res.status(200).json(reservation);
    });
    } catch (error) {
        next(error);
    }
};

function getDatesBetween(startTime, endTime) {
    const dates = [];
    let currentDate = new Date(startTime);

    while (currentDate <= new Date(endTime)) {
        dates.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}


export const getAllReservations = async (req, res,next) => {
    try {
      const reservations = await Reservation.find();
      res.status(200).json(reservations);
    } catch (error) {
      next(err)
    }
  };

  // Get a single reservation by ID
export const getReservationById = async (req, res, next) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (!reservation) {
        res.status(404).json({ message: "Reservation not found" });
        return;
      }
      res.status(200).json(reservation);
    } catch (error) {
      next(err)
    }
  };


  export const updateReservation = async (req, res, next) => {
    try {
      const reservation = await Reservation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } //retouner info updated for mongo
      );
      if (!reservation) {
        res.status(404).json({ message: "Reservation not found" });
        return;
      }
      // Extract  info room  from the updated reservation 
      //const { room } = reservation;
      // Envoyer un email de confirmation de mise à jour de réservation
      //const reservationDetails = {
      //date: reservation.startTime,
        //room: room 
      //};
      //sendReservationModificationEmail('destinataire@example.com', reservationDetails);
  
      res.status(200).json(reservation);
    } catch (error) {
      next(err)
    }
  };


  // Delete a reservation by ID
/*export const deleteReservation = async (req, res ,next) => {
    try {
      const reservation = await Reservation.findByIdAndDelete(req.params.id);
      if (!reservation) {
        res.status(404).json({ message: "Reservation not found" });
        return;
      }
      //update the corresponding room to mark it as available
      const room = await Room.findById(reservation.roomId);
      if (!room) {
        res.status(404).json({ message: "Room not found" });
        return;
      }
      const reservationDates = getDatesBetween(reservation.startTime, reservation.endTime);
        room.unavailableDates = room.unavailableDates.filter(date => !reservationDates.includes(date));
      await room.save();
      // Envoyer un email de confirmation de suppression de réservation
      //const reservationDetails = {
      //  date: reservation.startTime, 
       // room: room.name 
      //};
      //sendReservationCancellationEmail('destinataire@example.com', reservationDetails);
      res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (error) {
      next(err)
    }
  };*/

  export const deleteReservation = async (req,res,next)=>{
    try{
         await Reservation.findByIdAndDelete(
            req.params.id
         );
         res.status(200).json("room has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
}