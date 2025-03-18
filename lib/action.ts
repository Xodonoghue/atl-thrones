"use server"
import { connectToDb } from "./utils"
import { Calendar } from "./models";

interface AvailabilityFormData {
    firstName: string;
    email: string;
    zipcode: string;
    eventDate: string;
    eventTime: string;
}

interface RentalFormData {
    firstName: string,
    lastName: string,
    email: string,
    eventDate: string,
    eventTime: string,
    eventLocation: string
}

export const handleAvailabilitySubmission = async (data:AvailabilityFormData): Promise<void> => {
    await connectToDb()
    const newStartDate = new Date(data.eventDate + ' ' + data.eventTime)
    const cal = await Calendar.findById('67d9db952f6f12d8f8c5dc8b')
    let available = true
    for (const event of cal.events) {
        if (event.startDate < newStartDate && newStartDate < event.endDate) {
            available = false
        }
    }
    console.log(data)
}

export const createRental = async(data:RentalFormData): Promise<void> => {
    await connectToDb()
    const startTime = new Date(data.eventDate + ' ' + data.eventTime)
    const endTime = new Date(startTime.getTime() + 1000 * 60 * 60 * 6)
    const cal = await Calendar.findById('67d9ec4dd84ce5701ae4fa9d')
    cal.events.push({firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        startTime: startTime,
        endTime: endTime,
        eventLocation: data.eventLocation})
    await cal.save()
}

