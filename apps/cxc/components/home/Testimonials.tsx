import { cn, Marquee } from "@uwdsc/ui/index";

const reviews = [
  {
    name: "Samuel Zhang",
    username: "CxC 2025 Winner",
    body: "CXC 2025 was a really fun and rewarding experience! As first year students, it was amazing to meet so many upper years and learn from their experiences. The real world datasets were also extremely engaging. Most importantly though, DSC fattened us up with delicious food which kept us sane throughout the event.",
  },
  {
    name: "Sarah Chen",
    username: "3rd Year Statistics",
    body: "The mentors were incredibly supportive and the collaborative environment made tackling complex data problems actually fun. Plus, the networking opportunities were unmatched!",
  },
  {
    name: "Marcus Thompson",
    username: "CxC 2025 Participant",
    body: "I came in with zero experience in machine learning. Left with a working model and three new friends. 10/10 would recommend to anyone curious about data science.",
  },
  {
    name: "Priya Patel",
    username: "2nd Year CS",
    body: "The workshops before the competition were a game-changer. They prepared us perfectly for the challenge and I actually understood what I was doing!",
  },
  {
    name: "Alex Rodriguez",
    username: "CxC 2023",
    body: "Best case comp I've attended. Real datasets, supportive community, and great prizes. The all-nighter was worth it!",
  },
  {
    name: "Emily Wong",
    username: "1st Year Math",
    body: "As a complete beginner, I was nervous, but the beginner-friendly track made it accessible. I learned more in one weekend than I did all semester.",
  },
  {
    name: "Jordan Lee",
    username: "4th Year Data Science",
    body: "Fire Food 🔥🔥🔥 Seriously though, the catering was incredible and kept us going through those late hours of debugging.",
  },
  {
    name: "Taylor Kim",
    username: "",
    body: "The judging panel gave such valuable feedback. Even though we didn't win, I left with insights I'm already applying to my internship.",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  name,
  username,
  body,
}: {
  name: string;
  username: string;
  body: string;
}) => {
  const gradients: [string, string][] = [
    ["#FF4F7A", "#1E90FF"],
    ["#FFD86B", "#FF6B6B"],
    ["#13C47E", "#0077B6"],
    ["#8B5CF6", "#22D3EE"],
    ["#FF6F61", "#FFD6A5"],
    ["#3B82F6", "#6366F1"],
    ["#F59E42", "#EA580C"],
    ["#F472B6", "#43B48C"],
  ];

  const pickGradient = (key: string): [string, string] => {
    let h = 0;
    for (let i = 0; i < key.length; i++) {
      h = key.charCodeAt(i) + ((h << 5) - h);
      h = h & h;
    }
    const idx = Math.abs(h) % gradients.length;
    return gradients[idx] ?? ["#CCCCCC", "#EEEEEE"];
  };

  const [g1, g2] = pickGradient(name || username || "guest");
  return (
    <figure
      className={cn(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div
          aria-hidden
          className="rounded-full w-8 h-8 flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${g1}, ${g2})`,
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          }}
        />
        <span className="sr-only">{name} avatar</span>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Testimonials() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-20">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
}
