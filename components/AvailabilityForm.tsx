export default function AvailabilityForm() {
    return (
        <form className="bg-zinc-950 rounded-xl flex flex-col gap-7.5 p-5 px-20 z-50 border border-zinc-200 items-center">
            <h1 className="text-center text-lg font-semibold">Fill out the form below to see if a chair is available for your event date.</h1>
            <div className="flex flex-col gap-5">
                <div className="">
                    <label>First Name: </label>
                    <input className="p-1 rounded-md border border-zinc-200"></input>
                </div>
                <div className="">
                    <label>Email: </label>
                    <input className="p-1 rounded-md border border-zinc-200"></input>
                </div>
                <div className="">
                    <label>Event Zipcode: </label>
                    <input className="p-1 rounded-md border border-zinc-200" type="number"></input>
                </div>
                <div className="">
                    <label>Event Date: </label>
                    <input className="p-1 rounded-md border border-zinc-200" type="date"></input>
                </div>
            </div>
            <div className="flex items-center">
                <button className="rounded-xl bg-gradient-to-r from-zinc-200 to-indigo-300 text-black text-lg p-3 border border-indigo-800 hover:shadow hover:shadow-indigo-200">Check Availability</button>
            </div>
        </form>
    )
}