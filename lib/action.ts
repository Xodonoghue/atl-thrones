"use server"
import { connectToDb } from "./utils"
import { Calendar,Lead } from "./models";

interface AvailabilityFormData {
    firstName: string;
    email: string;
}

interface RentalFormData {
    firstName: string,
    lastName: string,
    email: string,
    eventDate: string,
    eventTime: string,
    eventLocation: string
}

export const saveLeadInfo = async (data:AvailabilityFormData): Promise<void> => {
    await connectToDb()
    const lead = new Lead({firstName:data.firstName, email:data.email})
    await lead.save()
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

