import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container relative mx-auto p-2">
      {/* Header */}
      <section className="text-center py-20 px-4">
        <div className="inline-block bg-gradient-to-r from-pink-600 to-pink-400 border border-pink-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
          Atlanta's #1 Throne Chair Rental Business
        </div>
        <h1 className="max-w-5xl text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-center mt-6 max-w-2xl mx-auto">Make Any Celebration <br /> Even More Special
        </h1>
        <p className="text-gray-400 max-w-4xl text-lg sm:text-xl mx-auto mt-4">
          ATL Throne Chairs elevates your events with luxury throne chair rentals
          featuring hassle-free delivery and stunning style.
        </p>
        <form className="flex justify-center gap-4 pt-8">
          <Link href="/availability" className="bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-400 hover:to-indigo-300 text-white border border-indigo-300  font-semibold text-lg sm:text-2xl font-bold p-4 sm:p-6 rounded-2xl hover:bg-indigo-300">
            Check Availablity
          </Link>
        </form>
        <div className="flex max-w-2xl items-center justify-center mt-8 mx-auto w-full">
            <img
            src="https://otds17egwq.ufs.sh/f/zMShoxtoCQOcL7YIk2qmKNn89WqR6Z4sflaJib3IFoQjVBuY"
            alt="White Throne Chair"
            className="w-full rounded-xl shadow-lg"
            />
        </div>

      </section>

      <section className="py-28 lg:py-40">
        <div className="flex text-center justify-center">
        <span className="bg-gray-800 text-xs px-3 py-1 border border-indigo-300 rounded-full uppercase tracking-wide text-indigo-300">
          Areas We Serve
        </span>
        </div>

        
        <div className="text-center text-4xl md:text-6xl lg:text-7xl font-medium mt-8">
            <span className="text-gray-500">We </span>
            <span className="text-indigo-400">deliver for free</span> 
            <span className="text-gray-500"> throughout the following counties</span>{" "}
            <span className="text-indigo-400">{'Fulton, Dekalb, Cobb, Gwinnett, Clayton, Fayette & Cherokee.'}</span>{" "}
        </div>
        </section>

      {/* Feature Section */}
      <section className="py-24 text-center px-4">
        <span className="bg-gray-800 text-xs px-3 py-1 rounded-full uppercase tracking-wide border border-indigo-300 text-indigo-300">
          Who We Are
        </span>
        <h2 className="text-5xl sm:text-6xl font-medium mt-8">About <span className="text-indigo-400">Us</span>
        </h2>
        <p className="mt-4 text-lg text-gray-500">We're ATL Throne Chairs, the premier throne chair rental service catering to all your event needs across the greater Atlanta area. We are dedicated to delivering elegance and sophistication right to your doorstep. At ATL Throne Chairs, we understand that every event is unique and deserves the royal treatment. Whether you're planning a wedding, a birthday celebration, or any special occasion, our throne chairs are the perfect centerpiece to elevate your event's ambiance. Our commitment to exceptional customer service and timely delivery ensures that your rentals arrive in pristine condition, ready to impress your guests. Let us help you turn your next event into a majestic celebration. Trust ATL Throne Chairs to add that touch of royalty to your special day.</p>
      </section>

      <section className="py-24 text-center px-4">
        <div className="flex flex-col bg-black rounded-lg border bg-gray-950 border border-gray-700 max-w-7xl mx-auto p-8 items-center">
            <div className="flex flex-col md:flex-row w-full justify-between items-center">
                <div>
                <h3 className="text-3xl sm:text-4xl font-medium max-w-2xl text-center">Check to see if we have a chair available for your event</h3>
                    <p className="text-gray-400 mt-4 mb-8 text-lg max-w-2xl">
                        Click the below and let us know when and where your event is located so we can see if we have a chair available.
                    </p>
                    <Link href="/availability" className="bg-indigo-500 text-white font-semibold px-6 py-4 rounded-full hover:bg-indigo-400 text-lg sm:text-xl">
                        Check Availability
                    </Link>
                </div>
                <div className="hidden md:flex">
                <img
                src="https://otds17egwq.ufs.sh/f/zMShoxtoCQOc3F8vQCLGugE4t2q1jpT9dvkJOLoiZyMmCfzX"
                alt="Gold Throne Chair"
                className="w-[450px] rounded-xl shadow-lg mt-4"
                />
                </div>
            </div>
            
        </div>
        </section>

      {/* Footer */}
      <footer className="mt-32 py-10 text-center border-t border-gray-800 text-gray-500 text-sm">
        © 2025 ATL Throne Chairs. All rights reserved.
      </footer>
    </div>
  );
}
