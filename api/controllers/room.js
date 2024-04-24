import Room from "../models/Room.js";
import { createError } from "../utils/error.js";


export const createRoom = async (req, res, next) => {

    try {
        const defaultUnavailableDates = []; 
     
        const newRoom = new Room({
            ...req.body,
            unavailableDates: defaultUnavailableDates 
        }); 

        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
};

export const getRooms = async (req, res, next) => {
    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)
    }catch(err){
        next(err)
    }
  };  

  export const getRoom = async (req,res, next) =>{
    const {id} = req.params;
    res.json(await Room.findById (id));
};