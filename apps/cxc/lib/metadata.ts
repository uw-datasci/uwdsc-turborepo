import type { Metadata, Viewport } from "next";

const siteUrl = "https://cxc.uwdatascience.ca/"; // Update with actual CxC domain

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/logos/cxc_logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logos/cxc_logo.svg" }],
    shortcut: "/logos/cxc_logo.svg",
  },
  manifest: "/meta/manifest.json",
  other: {
    "msapplication-TileColor": "#000211",
    "msapplication-TileImage": "/meta/ms-icon-144x144.png",
  },
};

export const baseViewport: Viewport = {
  themeColor: "#000211",
};

/**
 * Creates metadata for dynamic routes using generateMetadata().
 * Use for API-driven or parameter-based pages, not static routes.
 * @example
 * export async function generateMetadata({ params }) {
 *   const event = await fetchEvent(params.id);
 *   return createMetadata({ title: event.name, description: event.description });
 * }
 */
export function createMetadata({
  title,
  description,
  keywords,
  image = "/meta/og-image.png",
  pathname,
}: {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  pathname?: string;
}): Metadata {
  const fullTitle = `${title} | CxC - UWaterloo Data Science Competition`;

  return {
    ...baseMetadata,
    title: fullTitle,
    description:
      description ||
      "CxC - UWaterloo's premier data science competition and hackathon",
    keywords: keywords,
    alternates: {
      canonical: pathname ? `${siteUrl}${pathname}` : undefined,
    },
    openGraph: {
      type: "website",
      title: fullTitle,
      description:
        description ||
        "CxC - UWaterloo's premier data science competition and hackathon",
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description:
        description ||
        "CxC - UWaterloo's premier data science competition and hackathon",
      images: [image],
    },
  };
}
