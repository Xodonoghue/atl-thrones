"use server"
import { connectToDb } from "./utils"
import React, { FormEvent } from 'react';

interface AvailabilityFormData {
    firstName: string;
    email: string;
    zipcode: string;
    eventDate: string;
    eventTime: string;
}

export const handleAvailabilitySubmission = async (data:AvailabilityFormData): Promise<void> => {
    await connectToDb()
    console.log(data)
}