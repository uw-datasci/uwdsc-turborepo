"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  MapPinIcon,
  CalendarIcon,
} from "@uwdsc/ui";
import { Clock } from "lucide-react";

// Mock event type - will be replaced with actual type from schema
interface Event {
  id: number;
  name: string;
  description?: string;
  location?: string;
  start_time: Date;
  end_time: Date;
  checked_in?: boolean;
}

interface EventTimelineProps {
  events?: Event[];
  className?: string;
}

// Mock events for UI demonstration
const mockEvents: Event[] = [
  // {
  //   id: 1,
  //   name: "Opening Ceremony",
  //   description:
  //     "Welcome to CxC! Learn about the hackathon schedule and rules.",
  //   location: "Main Hall",
  //   start_time: new Date("2025-01-15T09:00:00"),
  //   end_time: new Date("2025-01-15T10:00:00"),
  //   checked_in: false,
  // },
  // {
  //   id: 2,
  //   name: "Team Formation",
  //   description: "Find teammates and form your project groups.",
  //   location: "Networking Area",
  //   start_time: new Date("2025-01-15T10:00:00"),
  //   end_time: new Date("2025-01-15T11:00:00"),
  //   checked_in: false,
  // },
  // {
  //   id: 3,
  //   name: "Workshop: AI/ML Fundamentals",
  //   description: "Learn the basics of machine learning and AI development.",
  //   location: "Workshop Room A",
  //   start_time: new Date("2025-01-15T13:00:00"),
  //   end_time: new Date("2025-01-15T14:30:00"),
  //   checked_in: false,
  // },
  // {
  //   id: 4,
  //   name: "Dinner",
  //   description: "Take a break and enjoy some food!",
  //   location: "Cafeteria",
  //   start_time: new Date("2025-01-15T18:00:00"),
  //   end_time: new Date("2025-01-15T19:00:00"),
  //   checked_in: false,
  // },
  // {
  //   id: 5,
  //   name: "Midnight Check-in",
  //   description: "Quick progress update and Q&A session.",
  //   location: "Main Hall",
  //   start_time: new Date("2025-01-16T00:00:00"),
  //   end_time: new Date("2025-01-16T00:30:00"),
  //   checked_in: false,
  // },
  // {
  //   id: 6,
  //   name: "Project Submissions Due",
  //   description: "Submit your project on Devpost.",
  //   location: "Online",
  //   start_time: new Date("2025-01-16T09:00:00"),
  //   end_time: new Date("2025-01-16T09:00:00"),
  //   checked_in: false,
  // },
  // {
  //   id: 7,
  //   name: "Closing Ceremony & Awards",
  //   description: "Project demos and winner announcements.",
  //   location: "Main Hall",
  //   start_time: new Date("2025-01-16T12:00:00"),
  //   end_time: new Date("2025-01-16T14:00:00"),
  //   checked_in: false,
  // },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function EventTimeline({
  events = mockEvents,
  className,
}: Readonly<EventTimelineProps>) {
  // Group events by date
  const groupedEvents = events.reduce(
    (acc, event) => {
      const dateKey = formatDate(event.start_time);
      acc[dateKey] ??= [];

      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, Event[]>,
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn("space-y-4", className)}
    >
      {/* Notice about mock data */}
      <motion.div variants={item}>
        <Card className="bg-black border border-yellow-400/40 rounded-none !gap-0">
          <CardContent className="py-4">
            <p className="text-yellow-400/80 text-sm font-mono">
              ▶ Schedule data will be available closer to the event. Check back
              soon!
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {Object.entries(groupedEvents).map(([date, dayEvents]) => (
        <motion.div key={date} variants={item}>
          <Card className="bg-black border border-white/20 rounded-none overflow-hidden !gap-0">
            <CardHeader className="bg-white/5 border-b border-white/10">
              <CardTitle className="text-white flex items-center gap-2 uppercase tracking-wider text-sm">
                <CalendarIcon className="w-5 h-5" />
                {date}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/10">
                {dayEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="p-4 hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      {/* Time */}
                      <div className="flex items-center gap-2 text-white/40 text-sm min-w-[120px] font-mono">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(event.start_time)}</span>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-white font-medium">
                            {event.name}
                          </h4>
                          {event.checked_in && (
                            <span className="text-emerald-400 text-xs font-mono border border-emerald-400 px-2 py-0.5">
                              CHECKED IN
                            </span>
                          )}
                        </div>

                        {event.description && (
                          <p className="text-white/60 text-sm">
                            {event.description}
                          </p>
                        )}

                        {event.location && (
                          <div className="flex items-center gap-1 text-white/40 text-sm">
                            <MapPinIcon className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
