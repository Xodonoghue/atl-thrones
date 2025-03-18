"use client"
import React, { FormEvent } from 'react';
import { createRental } from '@/lib/action';
export default function RentalForm(){
    const handleSubmit = async (event:FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget); // Create a FormData object from the form
        const data = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            zipcode: formData.get('zipcode') as string,
            eventDate: formData.get('eventDate') as string,
            eventTime: formData.get('eventTime') as string,
            eventLocation: formData.get('eventLocation') as string
        };
        createRental(data)
    }
    return(
        <form onSubmit={handleSubmit} className="bg-zinc-950 rounded-xl flex flex-col gap-7.5 p-5 px-20 z-50 border border-zinc-200 items-center">
            <h1 className="text-center text-lg font-semibold">Fill out the form below to see if a chair is available for your event date.</h1>
            <div className="flex flex-col gap-5">
                <div className="">
                    <label>First Name: </label>
                    <input name="firstName" className="p-1 rounded-md border border-zinc-200"></input>
                </div>
                <div className="">
                    <label>Last Name: </label>
                    <input name="lastName" className="p-1 rounded-md border border-zinc-200"></input>
                </div>
                <div className="">
                    <label>Email: </label>
                    <input name="email" className="p-1 rounded-md border border-zinc-200"></input>
                </div>
                <div className="">
                    <label>Event Zipcode: </label>
                    <input name="zipcode" className="p-1 rounded-md border border-zinc-200" type="number"></input>
                </div>
                <div className="">
                    <label>Event Date: </label>
                    <input name="eventDate" className="p-1 rounded-md border border-zinc-200" type="date"></input>
                </div>
                <div className="">
                    <label>Event Time: </label>
                    <select name="eventTime">
                    <option disabled> choose delivery time </option>
                        <option value="5:00 AM">5:00 AM</option>
                        <option value="6:00 AM">6:00 AM</option>
                        <option value="7:00 AM">7:00 AM</option>
                        <option value="8:00 AM">8:00 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                    </select>
                </div>
                <div className="">
                    <label>Event Location: </label>
                    <input name="eventLocation" className="p-1 rounded-md border border-zinc-200"></input>
                </div>
            </div>
            <div className="flex items-center">
                <button type="submit" className="rounded-xl bg-gradient-to-r from-zinc-200 to-indigo-300 text-black text-lg p-3 border border-indigo-800 hover:shadow hover:shadow-indigo-200">Rent Chair</button>
            </div>
        </form>)
}