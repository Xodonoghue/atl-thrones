import AvailabilityForm from "@/components/AvailabilityForm";
import Calendar from "@/components/Calendar";

export default function Page() {


    return (
        <main className=" min-h-screen flex flex-col bg-gradient-to-b from-black to-indigo-800 items-center justify-center">
            <div className="flex flex-col w-full p-3 items-center">
                <h1 className="text-3xl sm:text-4xl text-center font-bold pb-5">Reserve A Chair For Your Event</h1>
                <Calendar/>
            </div>
        </main>
    )
}