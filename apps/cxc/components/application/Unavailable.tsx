import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
} from "@uwdsc/ui";
import { CalendarX, Clock } from "lucide-react";

export function Unavailable() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <CalendarX className="w-10 h-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-3xl">
            Applications Currently Closed
          </CardTitle>
          <CardDescription className="text-lg">
            Thank you for your interest in participating in CxC!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Hacker applications for CxC are not currently open. Applications
              typically open a few months before the event.
            </p>

            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-3 py-1"
              >
                <Clock className="w-4 h-4" />
                <span>Check back soon for updates!</span>
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-center text-muted-foreground">
              Want to stay informed about CxC and when applications open?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={() =>
                  window.open("https://www.uwdatascience.ca/", "_blank")
                }
              >
                Learn More About CxC
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open("https://discord.gg/wvAhzAHMQK", "_blank")
                }
              >
                Join UWDSC Discord
              </Button>
            </div>
          </div>

          <div className="pt-6 border-t">
            <p className="text-xs text-center text-muted-foreground">
              If you believe you&apos;re seeing this message in error, please
              contact us at{" "}
              <a
                // TODO: Replace with actual email
                href="mailto:contact@uwdatascience.ca"
                className="underline hover:text-foreground"
              >
                contact@uwdatascience.ca
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
