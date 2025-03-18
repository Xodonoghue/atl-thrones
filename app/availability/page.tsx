import AvailabilityForm from "@/components/AvailabilityForm";

export default function Page() {
    return (
        <main className=" min-h-screen flex flex-col bg-gradient-to-b from-black to-indigo-800 items-center justify-center">
            <div className="flex w-11/12 sm:w-4/5 md:w-7/12 lg:w-5/12">
                <AvailabilityForm/>
            </div>
        </main>
    )
}