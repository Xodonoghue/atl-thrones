"use server"
import { connectToDb } from "./utils"
import React, { FormEvent } from 'react';

interface AvailabilityFormData {
    firstName: string;
    email: string;
    zipcode: string;
    eventDate: string;
}

export const handleAvailabilitySubmission = async (): Promise<void> => {
    await connectToDb()
}