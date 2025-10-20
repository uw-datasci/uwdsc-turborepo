import * as React from "react";
import chat from "@/public/graphics/chat.png";

import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@uwdsc/ui";
import { PAST_EVENTS } from "@/constants/home";
import SectionTitle from "../team/SectionTitle";
import EventCard from "../home/EventCard";
import { useState } from "react";

export default function PastEvents() {
  return (
    // mb-section, mx-container
    <section className=" mb-24 lg:mb-52 mx-7 sm:mx-9 md:mx-12 xl:mx-auto xl:max-w-[1200px]">
      <SectionTitle
        mb="mb-8 lg:mb-12"
        className="text-xl md:!text-2xl text-nowrap"
      >
        Past Events
      </SectionTitle>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[250px] md:max-w-2xl xl:max-w-6xl"
      >
        <CarouselPrevious className="rounded-md md:!p-5 !border-purple-500" />

        <CarouselNext className="rounded-md md:!p-5 !border-purple-500" />
        <CarouselContent className="">
          {/* // TODO: Replace constant with fetch from db */}
          {PAST_EVENTS.map((event, index) => (
            <CarouselItem key={index} className="md:basis-1/2 xl:basis-1/3">
              <div className="p-1">
                <EventCard {...event} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
