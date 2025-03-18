import AvailabilityForm from "@/components/AvailabilityForm";
import Link from "next/link";

export default function Home() {
  const title2 = "text-4xl font-semibold"
  return (
    <main className="flex flex-col items-center bg-gradient-to-b from-black to-indigo-950 min-h-screen gap-15 py-20">
      <div className="flex flex-col items-center gap-7.5 sm:gap-10 p-5">
        <h1 className="z-50 text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-indigo-300 w-11/12 md:w-9/12">Make Any Special Occasion Even More Special</h1>
        <p className="flex w-11/12 md:w-8/12 text-center text-lg">We deliver throne chairs throughout the greater Atlanta area from Fayette all the way to Cherokee county click the button below to see if we have a chair available for your event date</p>
        <Link href="/availability" className="bg-gradient-to-b from-zinc-200 to-indigo-400 p-4 rounded-lg text-black text-lg font-semibold">Check Availability</Link>
        <img src="https://otds17egwq.ufs.sh/f/zMShoxtoCQOcL7YIk2qmKNn89WqR6Z4sflaJib3IFoQjVBuY" width={700} className="rounded-md border border-indigo-400"></img>
      </div>
      <div className="flex flex-col lg:flex-row bg-black">
        <div className="flex flex-col items-center text-center w-full lg:w-1/2 p-5 py-10">
          <h1 className={title2}>About Us</h1>
          <p className="p-5 text-base">We're ATL Throne Chairs, the premier throne chair rental service catering to all your event needs across the greater Atlanta area. We are dedicated to delivering elegance and sophistication right to your doorstep. At ATL Throne Chairs, we understand that every event is unique and deserves the royal treatment. Whether you're planning a wedding, a birthday celebration, or any special occasion, our throne chairs are the perfect centerpiece to elevate your event's ambiance. Our commitment to exceptional customer service and timely delivery ensures that your rentals arrive in pristine condition, ready to impress your guests. Let us help you turn your next event into a majestic celebration. Trust ATL Throne Chairs to add that touch of royalty to your special day.</p>
        </div>
        <div className="flex w-full lg:w-1/2 items-center justify-center p-10">
          <div className="flex w-11/12">
            <img className="rounded-sm" src="https://otds17egwq.ufs.sh/f/zMShoxtoCQOc3F8vQCLGugE4t2q1jpT9dvkJOLoiZyMmCfzX"></img>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-center gap-5 w-full p-5">
        <h1 className={title2}>Areas We Serve</h1>
        <p className="w-3/4 text-xl">We deliver throughout the following counties Fulton, Dekalb, Cobb, Gwinnett, Clayton, Fayette & Cherokee.</p>
      </div>
      <div className="flex flex-col text-center gap-5 p-10 bg-black rounded-lg border border-indigo-400 w-3/4 md:w-7/12 lg:w-1/2">
        <h1 className={"text-2xl md:text-3xl font-semibold"}>Check to see if we have a chair available for your event</h1>
        <p className="text-center px-5 sm:px-10">Click the below and let us know when and where your event is located so we can see if we have a chair available.</p>
        <div className="items-center">
        <Link href="/availability" className="bg-gradient-to-b from-zinc-200 to-indigo-400 p-4 rounded-lg text-black text-lg font-semibold">Check Availability</Link>
        </div>
      </div>
    </main>
  );
}
