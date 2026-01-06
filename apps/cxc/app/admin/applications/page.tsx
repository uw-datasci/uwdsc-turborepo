"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@uwdsc/ui";
import { FileText } from "lucide-react";
import {
  ApplicationsTable,
  ApplicationModal,
} from "@/components/admin/applications";
import { LoadingScreen } from "@/components/LoadingScreen";
import { getAllApplications, getApplicationDetails } from "@/lib/api";
import type { ApplicationSummary, FullApplicationDetails } from "@/types/api";

export default function AdminApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fullApplicationDetails, setFullApplicationDetails] =
    useState<FullApplicationDetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllApplications();
      setApplications(data.applications);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load applications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (application: ApplicationSummary) => {
    setModalOpen(true);
    setLoadingDetails(true);
    setFullApplicationDetails(null); // Clear previous data

    try {
      const data = await getApplicationDetails(application.id);
      setFullApplicationDetails(data.application);
    } catch (err) {
      console.error("Error fetching application details:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load application details."
      );
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleGoToReview = () => {
    router.push("/admin/review");
  };

  if (loading) {
    return <LoadingScreen message="LOADING APPLICATIONS..." />;
  }

  if (error && applications.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 pt-24 md:pt-28">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle>Error Loading Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={fetchApplications} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Applications</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all submitted applications
            </p>
          </div>
          <Button onClick={handleGoToReview} className="gap-2">
            <FileText className="w-4 h-4" />
            Go to Review Page
          </Button>
        </div>

        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              Submitted Applications ({applications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ApplicationsTable
              data={applications}
              onRowClick={handleRowClick}
            />
          </CardContent>
        </Card>

        <ApplicationModal
          application={fullApplicationDetails}
          open={modalOpen}
          onOpenChange={setModalOpen}
          loading={loadingDetails}
        />
      </div>
    </div>
  );
}
