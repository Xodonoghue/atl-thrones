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
        <form onSubmit={handleSubmit} className="bg-zinc-950 rounded-xl flex flex-col gap-7.5 p-5 px-10 sm:px-20 z-50 border border-zinc-200 items-center">
            <h1 className="text-center text-lg font-semibold w-full">Fill out the form below to see if a chair is available for your event date.</h1>
            <div className="flex flex-col gap-5">
                <div className="">
                    <label>First Name: </label>
                    <input name="firstName" className="p-1 rounded-md border border-zinc-200"></input>
                </div>
                <div className="">
                    <label>Email: </label>
                    <input name="email" className="p-1 rounded-md border border-zinc-200"></input>
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
            <div className="flex items-center">
                <button type="submit" className="rounded-xl bg-gradient-to-r from-zinc-200 to-indigo-300 text-black text-lg p-3 border border-indigo-800 hover:shadow hover:shadow-indigo-200 font-bold">Check Availability</button>
            </div>
        </form>
    )
}