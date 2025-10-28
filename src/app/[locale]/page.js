"use client";
import HeroSliderClient from "@/components/home/HeroSlider";
import Services from "@/components/home/Services";

export default function Home() {

  return (
    <>
      <HeroSliderClient />
      <div className="max-w-7xl w-full mx-auto px-5 lg:px-2  py-16">
        <Services />
      </div>
    </>
  );
}