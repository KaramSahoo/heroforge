"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [mission, setMission] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/generate/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mission }),
      });
      if (response.ok) {
        const data = await response.json();
        router.push('/story');
      } else {
        alert('Subscription failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <header>
      {/* Hero Container */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Component */}
        <div className="mx-auto mb-8 w-full max-w-3xl text-center md:mb-12 lg:mb-16">
          {/* Hero Title */}
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            HeroForge: AI Storytelling
          </h1>
          <p className="mx-auto mb-5 max-w-3xl text-sm text-gray-500 sm:text-xl md:mb-6 lg:mb-8">
            If you are looking to find a job during a zombie apocalypse or trying to save your crush from an alien abduction, you are at the right place.<span className="text-yellow-600"> Using our professional and out of the world (literally) services recruit a team of superheroes and listen to their heroic quest in solving your mission.</span>
          </p>
          {/* Hero Button */}
          <div className="flex items-stretch justify-center flex-wrap">
            <input
              type="text"
              placeholder="Enter your mission"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="mr-5 inline-block rounded-md w-full max-w-xs px-8 py-4 text-center font-semibold text-white md:mr-6 lg:mr-8"
            />
            <button
              onClick={handleSubmit}
              className="mr-5 inline-block rounded-md bg-yellow-600 px-8 py-4 text-center font-semibold text-white md:mr-6 lg:mr-8"
            >
              Summon Heroes
            </button>
            <a href="#" className="flex items-center justify-center rounded-md border border-solid border-yellow-600 px-6 py-3 font-bold text-black">
              <p className="text-sm text-yellow-600 sm:text-base">Lore</p>
            </a>
          </div>
        </div>
        {/* Hero Image */}
        <img src="./pic.jpg" alt="" className="inline-block max-h-[512px] w-full object-cover" />
      </div>
    </header>
  );
}

