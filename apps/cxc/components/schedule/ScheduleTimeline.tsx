"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@uwdsc/ui";
import { ScheduleEvent } from "@/lib/api/schedule";

interface ScheduleTimelineProps {
  readonly events: ScheduleEvent[];
}

export function ScheduleTimeline({ events }: ScheduleTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(
    null,
  );
  const [maxDays, setMaxDays] = useState(3);
  const [startDayIndex, setStartDayIndex] = useState(0);
  const [nowTick, setNowTick] = useState(() => Date.now());
  const PX_PER_MINUTE = 1.25;
  const MIN_EVENT_HEIGHT = 70;
  const HIDDEN_HOURS_START = 0;
  const HIDDEN_HOURS_END = 7;
  const TIME_ZONE = "America/New_York";

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDayLabel = (dayKey: string) => {
    const [yearString, monthString, dayString] = dayKey.split("-");
    if (!yearString || !monthString || !dayString) {
      return dayKey;
    }
    const year = Number(yearString);
    const month = Number(monthString);
    const day = Number(dayString);
    const date = new Date(Date.UTC(year, month - 1, day, 12));
    return date.toLocaleDateString("en-US", {
      timeZone: TIME_ZONE,
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getDayKey = (dateString: string) => {
    return getDayKeyFromZone(TIME_ZONE, new Date(dateString));
  };

  const getTimePartsInZone = (timeZone: string, date: Date) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    const parts = formatter.formatToParts(date);
    const lookup = Object.fromEntries(
      parts.map((part) => [part.type, part.value]),
    );
    return {
      year: Number(lookup.year),
      month: Number(lookup.month),
      day: Number(lookup.day),
      hour: Number(lookup.hour),
      minute: Number(lookup.minute),
    };
  };

  const getDayKeyFromZone = (timeZone: string, date: Date) => {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  const getMinutesFromMidnight = (dateString: string) => {
    const date = new Date(dateString);
    return date.getHours() * 60 + date.getMinutes();
  };

  useEffect(() => {
    const getResponsiveMaxDays = () => {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    };

    const handleResize = () => {
      setMaxDays(getResponsiveMaxDays());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNowTick(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const eventsByDay = events.reduce(
    (acc, event) => {
      const dayKey = getDayKey(event.start_time);
      if (!acc[dayKey]) {
        acc[dayKey] = [];
      }
      acc[dayKey].push(event);
      return acc;
    },
    {} as Record<string, ScheduleEvent[]>,
  );

  const sortedDayKeys = Object.keys(eventsByDay).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  const nowDate = new Date(nowTick);
  const estParts = getTimePartsInZone(TIME_ZONE, nowDate);
  const estDayKey = getDayKeyFromZone(TIME_ZONE, nowDate);
  const estMinutes = estParts.hour * 60 + estParts.minute;

  const allMinutes = events.flatMap((event) => [
    getMinutesFromMidnight(event.start_time),
    getMinutesFromMidnight(event.end_time),
  ]);
  if (sortedDayKeys.includes(estDayKey)) allMinutes.push(estMinutes);

  const minMinute = Math.min(...allMinutes);
  const maxMinute = Math.max(...allMinutes);
  const rawMinHour = Math.max(0, Math.floor(minMinute / 60) - 1);
  const rawMaxHour = Math.min(24, Math.ceil(maxMinute / 60) + 1);
  const minHour =
    rawMinHour >= HIDDEN_HOURS_START && rawMinHour < HIDDEN_HOURS_END
      ? HIDDEN_HOURS_END
      : rawMinHour;
  const maxHour = Math.min(24, Math.max(rawMaxHour, minHour + 1));

  const viewStartMinute = minHour * 60;
  const viewEndMinute = maxHour * 60;
  const hiddenStartMinute = HIDDEN_HOURS_START * 60;
  const hiddenEndMinute = HIDDEN_HOURS_END * 60;

  const getHiddenOverlap = (start: number, end: number) => {
    const overlapStart = Math.max(start, hiddenStartMinute);
    const overlapEnd = Math.min(end, hiddenEndMinute);
    return Math.max(0, overlapEnd - overlapStart);
  };

  const toVisibleMinutes = (minute: number) => {
    const clampedMinute = Math.max(minute, viewStartMinute);
    const hiddenOverlap = getHiddenOverlap(viewStartMinute, clampedMinute);
    return clampedMinute - viewStartMinute - hiddenOverlap;
  };

  const totalMinutes = Math.max(60, toVisibleMinutes(viewEndMinute));

  const hours = Array.from({ length: maxHour - minHour + 1 }, (_, index) => {
    return minHour + index;
  }).filter((hour) => hour < HIDDEN_HOURS_START || hour >= HIDDEN_HOURS_END);

  const isActiveDay = (dayEvents: ScheduleEvent[]) => {
    if (dayEvents.length === 0) return false;
    const now = new Date();
    const hasOngoingEvent = dayEvents.some((event) => {
      return (
        now >= new Date(event.start_time) && now <= new Date(event.end_time)
      );
    });

    if (hasOngoingEvent) return true;

    const firstEvent = dayEvents[0];
    if (!firstEvent) return false;
    const todayKey = estDayKey;
    const dayKey = getDayKey(firstEvent.start_time);
    const hasFutureEvents = dayEvents.some(
      (event) => now < new Date(event.end_time),
    );

    return todayKey === dayKey && hasFutureEvents;
  };

  const isDayPassed = (dayEvents: ScheduleEvent[]) => {
    if (dayEvents.length === 0) return false;
    const now = new Date();
    return dayEvents.every((event) => now > new Date(event.end_time));
  };

  type PositionedEvent = {
    event: ScheduleEvent;
    top: number;
    height: number;
    column: number;
    columnCount: number;
  };

  const getPositionedEvents = (dayEvents: ScheduleEvent[]) => {
    const sorted = [...dayEvents].sort((a, b) => {
      return (
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      );
    });

    const positions: PositionedEvent[] = [];
    const columns: PositionedEvent[][] = [[], []];
    const eventRanges = sorted.map((event) => ({
      startMinutes: getMinutesFromMidnight(event.start_time),
      endMinutes: getMinutesFromMidnight(event.end_time),
    }));
    const hasOverlaps = eventRanges.map((range, index) => {
      return eventRanges.some((otherRange, otherIndex) => {
        if (otherIndex === index) return false;
        return (
          range.startMinutes < otherRange.endMinutes &&
          range.endMinutes > otherRange.startMinutes
        );
      });
    });

    const getOverlapCount = (
      columnEvents: PositionedEvent[],
      startMinutes: number,
      endMinutes: number,
    ) => {
      return columnEvents.reduce((count, existing) => {
        const existingStart = getMinutesFromMidnight(existing.event.start_time);
        const existingEnd = getMinutesFromMidnight(existing.event.end_time);
        const overlaps = startMinutes < existingEnd && endMinutes > existingStart;
        return overlaps ? count + 1 : count;
      }, 0);
    };

    sorted.forEach((event, index) => {
      const range = eventRanges[index];
      if (!range) return;
      const { startMinutes, endMinutes } = range;
      const height = Math.max(
        (toVisibleMinutes(endMinutes) - toVisibleMinutes(startMinutes)) *
          PX_PER_MINUTE,
        MIN_EVENT_HEIGHT,
      );

      const overlaps = hasOverlaps[index] ?? false;
      const overlapCounts = columns.map((columnEvents) =>
        getOverlapCount(columnEvents, startMinutes, endMinutes),
      );
      const firstCount = overlapCounts[0] ?? 0;
      const secondCount = overlapCounts[1] ?? 0;
      const column = overlaps
        ? firstCount <= secondCount
          ? 0
          : 1
        : 0;

      const positioned: PositionedEvent = {
        event,
        top: toVisibleMinutes(startMinutes) * PX_PER_MINUTE,
        height,
        column,
        columnCount: overlaps ? 2 : 1,
      };

      columns[column]?.push(positioned);
      positions.push(positioned);
    });

    return positions;
  };

  const getEventTone = (eventId: number) => {
    const tones = [
      "border-emerald-500 bg-emerald-950/70",
      "border-indigo-500 bg-indigo-950/70",
      "border-fuchsia-500 bg-fuchsia-950/70",
      "border-cyan-500 bg-cyan-950/70",
      "border-amber-500 bg-amber-950/70",
    ];
    return tones[Math.abs(eventId) % tones.length];
  };

  const clampedStartIndex = Math.max(
    0,
    Math.min(startDayIndex, Math.max(0, sortedDayKeys.length - maxDays)),
  );
  const pagedDayKeys = sortedDayKeys.slice(
    clampedStartIndex,
    clampedStartIndex + maxDays,
  );
  const columnTemplate = `80px repeat(${pagedDayKeys.length}, minmax(0, 1fr))`;
  const estLineTop = toVisibleMinutes(estMinutes) * PX_PER_MINUTE;
  const showEstLine =
    estMinutes >= viewStartMinute && estMinutes <= viewEndMinute;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end text-sm text-white/70">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStartDayIndex((prev) => Math.max(0, prev - 1))}
            disabled={clampedStartIndex === 0}
            aria-label="Previous days"
            className="h-8 w-8 flex items-center justify-center border border-white/10 hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              setStartDayIndex((prev) =>
                Math.min(prev + 1, Math.max(0, sortedDayKeys.length - maxDays)),
              )
            }
            disabled={clampedStartIndex + maxDays >= sortedDayKeys.length}
            aria-label="Next days"
            className="h-8 w-8 flex items-center justify-center border border-white/10 hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="border border-white/10 bg-black overflow-hidden">
        <div>
          <div
            className="grid border-b border-white/10 bg-black"
            style={{ gridTemplateColumns: columnTemplate }}
          >
            <div className="px-3 py-2 text-[11px] uppercase tracking-wider text-white/40">
              Time
            </div>
            {pagedDayKeys.map((dayKey) => {
              const dayEvents = eventsByDay[dayKey] ?? [];
              const activeDay = isActiveDay(dayEvents);
              const dayPassed = isDayPassed(dayEvents);

              return (
                <div
                  key={dayKey}
                  className={`border-l border-white/10 px-3 py-2 ${
                    dayPassed ? "text-white/40" : "text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span>{formatDayLabel(dayKey)}</span>
                    {activeDay && (
                      <span className="inline-flex h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <div className="text-xs text-white/50"></div>
                </div>
              );
            })}
          </div>

          <div className="grid" style={{ gridTemplateColumns: columnTemplate }}>
            <div className="relative border-r border-white/10">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="border-t border-white/10 px-3 pt-2 text-[11px] text-white/40"
                  style={{ height: `${60 * PX_PER_MINUTE}px` }}
                >
                  {new Date(0, 0, 0, hour).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                </div>
              ))}
            </div>

            {pagedDayKeys.map((dayKey) => {
              const dayEvents = eventsByDay[dayKey] ?? [];
              const positionedEvents = getPositionedEvents(dayEvents);
              const isTodayEst = dayKey === estDayKey;

              return (
                <div
                  key={dayKey}
                  className="relative border-r border-white/10"
                  style={{ height: `${totalMinutes * PX_PER_MINUTE}px` }}
                >
                  {isTodayEst && showEstLine && (
                    <div
                      className="absolute left-0 right-0 flex items-center gap-2"
                      style={{ top: `${estLineTop}px` }}
                    >
                      <div className="h-px w-full bg-red-500/80" />
                      <div className="text-[10px] text-red-400 whitespace-nowrap">
                        Now (EST)
                      </div>
                    </div>
                  )}
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="absolute left-0 right-0 border-t border-white/10"
                      style={{
                        top: `${toVisibleMinutes(hour * 60) * PX_PER_MINUTE}px`,
                      }}
                    />
                  ))}

                  {positionedEvents.map(
                    ({ event, top, height, column, columnCount }) => {
                      const isOngoing =
                        new Date() >= new Date(event.start_time) &&
                        new Date() <= new Date(event.end_time);
                      const isPast = new Date() > new Date(event.end_time);
                      const columnWidth = 100 / columnCount;
                      const showTime = height >= 38;
                      const showLocation = height >= 52;

                      const tone = getEventTone(event.id);

                      let eventColorClasses: string;
                      if (isOngoing) {
                        eventColorClasses =
                          "border-blue-500 bg-blue-900/80 text-white";
                      } else if (isPast) {
                        eventColorClasses =
                          "border-slate-600 bg-slate-900/70 text-white/60";
                      } else {
                        eventColorClasses = `${tone} text-white`;
                      }

                      return (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => setSelectedEvent(event)}
                          className={`absolute border-l-4 px-2 py-2 text-xs text-left overflow-hidden flex flex-col justify-start ${eventColorClasses} transition-colors`}
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            left: `${column * columnWidth}%`,
                            width: `${columnWidth}%`,
                          }}
                        >
                          <div className="font-semibold line-clamp-1">
                            {event.name}
                          </div>
                          {showTime && (
                            <div className="mt-1 flex items-center text-[11px] text-white/70 line-clamp-1">
                              <Clock className="mr-1 h-3 w-3" />
                              {formatTime(event.start_time)} -{" "}
                              {formatTime(event.end_time)}
                            </div>
                          )}
                          {showLocation && event.location && (
                            <div className="mt-1 flex items-center text-[11px] text-white/60 line-clamp-1">
                              <MapPin className="mr-1 h-3 w-3" />
                              {event.location}
                            </div>
                          )}
                        </button>
                      );
                    },
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog
        open={Boolean(selectedEvent)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedEvent(null);
          }
        }}
      >
        <DialogContent className="max-w-xl bg-black border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedEvent?.name}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              {selectedEvent
                ? `${formatFullDate(selectedEvent.start_time)} • ${formatTime(
                    selectedEvent.start_time,
                  )} - ${formatTime(selectedEvent.end_time)}`
                : ""}
            </DialogDescription>
          </DialogHeader>

          {selectedEvent?.description && (
            <p className="mt-2 text-sm text-white/80">
              {selectedEvent.description}
            </p>
          )}

          {selectedEvent?.location && (
            <div className="mt-4 flex items-center text-sm text-white/70">
              <MapPin className="mr-2 h-4 w-4" />
              {selectedEvent.location}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
