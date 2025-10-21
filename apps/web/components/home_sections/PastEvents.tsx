import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@uwdsc/ui";
import { PAST_EVENTS } from "@/constants/home";
import SectionTitle from "../team/SectionTitle";
import EventCard from "../home/EventCard";
import SectionWrapper from "../SectionWrapper";

export default function PastEvents() {
  return (
    <SectionWrapper>
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
    </SectionWrapper>
  );
}
