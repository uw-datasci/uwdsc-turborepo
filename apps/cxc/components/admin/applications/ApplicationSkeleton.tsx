import { Card, CardContent, CardHeader } from "@uwdsc/ui";

export function ApplicationSkeleton() {
  return (
    <div className="space-y-6">
      {/* Two Column Layout Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column Skeleton */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <div className="h-6 w-40 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Column Skeleton */}
        <div className="flex flex-col gap-6 h-full">
          <Card className="flex-1">
            <CardHeader>
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full Width Cards Skeleton */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="h-6 w-32 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
