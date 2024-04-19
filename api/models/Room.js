import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
    {
        roomNumber: {
            type: Number,
            required: true,
            unique: true
        },
        capacity: {
            type: Number,
            required: true
        },
        equipment: {
            type: String,
            required: true
        },
        unavailableDates: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Room = mongoose.model("Room", RoomSchema);

export default Room;
