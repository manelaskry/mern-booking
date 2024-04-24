import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(

  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Reservation = mongoose.model("Reservation", ReservationSchema);

export default Reservation;