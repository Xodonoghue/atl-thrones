import mongoose from "mongoose"

const calendarSchema = new mongoose.Schema({
    events:{
        type:[{firstName:String,lastName:String,email:String,startTime:Date,endTime:Date,eventLocation:String}]
    }
})

const leadSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    }
})

export const Lead = mongoose.models?.Lead || mongoose.model("Lead", leadSchema)
export const Calendar = mongoose.models?.Calendar || mongoose.model("Calendar", calendarSchema)