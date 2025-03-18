import mongoose from "mongoose"

const calendarSchema = new mongoose.Schema({
    events:{
        type:[{firstName:String,lastName:String,email:String,startTime:Date,endTime:Date,eventLocation:String}]
    }
})

export const Calendar = mongoose.models?.Calendar || mongoose.model("Calendar", calendarSchema)