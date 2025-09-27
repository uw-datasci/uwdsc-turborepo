"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Globe, Linkedin, Instagram } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@uwdsc/ui";
import { Member } from "@/types/team";

interface TeamCardProps {
  member: Member;
}

export default function TeamCard({ member }: TeamCardProps) {
  const initials = member.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="group relative w-full max-w-xs overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-black p-0 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
      {/* Member Image */}
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Social Links Overlay */}
        {(member.email ||
          member.website ||
          member.linkedin ||
          member.instagram) && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {member.email && (
              <Link
                href={`mailto:${member.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="h-5 w-5 text-white" />
              </Link>
            )}
            {member.website && (
              <Link
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
                aria-label={`Visit ${member.name}'s website`}
              >
                <Globe className="h-5 w-5 text-white" />
              </Link>
            )}
            {member.linkedin && (
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
                aria-label={`Visit ${member.name}'s LinkedIn`}
              >
                <Linkedin className="h-5 w-5 text-white" />
              </Link>
            )}
            {member.instagram && (
              <Link
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
                aria-label={`Visit ${member.name}'s Instagram`}
              >
                <Instagram className="h-5 w-5 text-white" />
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Member Info */}
      <CardHeader className="relative z-10 -mt-16 bg-gradient-to-t from-black to-transparent px-6 pb-4 pt-16">
        <CardTitle className="text-xl font-bold text-white">
          {member.name}
        </CardTitle>
        <CardDescription className="text-sm font-medium text-gray-300">
          {member.position}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
