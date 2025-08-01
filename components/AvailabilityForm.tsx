"use client"
import { connectToDb } from '@/lib/utils';
import React, { FormEvent } from 'react';
import { saveLeadInfo } from '@/lib/action';
import { useRouter } from 'next/navigation';

export default function AvailabilityForm() {
const router = useRouter()

const handleSubmit = async (event:FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget); // Create a FormData object from the form
    const data = {
        firstName: formData.get('firstName') as string,
        email: formData.get('email') as string,
    };
    saveLeadInfo(data)
    router.push("/booking")
}


    return (
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl bg-gradient-to-b from-zinc-900 to-black py-8 px-16 rounded-xl shadow-xl border border-zinc-800">
            <h1 className="text-center text-lg font-semibold w-full">Fill out the info below to see if a chair is available for your event date.</h1>
            <div className="flex flex-col gap-5 mt-4">
                <div className="flex flex-row gap-4">
                    <input name="firstName" 
                    placeholder="First Name"
                    className="max-w-xs w-full mb-4 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"></input>
                    <input placeholder="Email"
                    className="max-w-xs w-full mb-4 px-4 py-3 rounded-lg bg-zinc-950 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"></input>
                </div>
                <div>
                    <input type="checkbox" name="check1" value="true"></input>
                    <label> My event is one of the following counties Cobb, Fulton, DeKalb, Fayette, Clayton, Gwinnett or Cherokee.</label>    
                </div>
                <div>
                    <input type="checkbox" name="check2" value="true"></input>
                    <label> I understand the only chair color available is white with gold trim.</label>    
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button type="submit" className="bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-400 hover:to-indigo-300 text-white border border-indigo-300 font-semibold text-xl sm:text-2xl font-bold p-4 rounded-2xl hover:bg-indigo-300">Check Availability</button>
            </div>
        </form>
    )
}