"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, Input } from "@uwdsc/ui";
import {
  Search,
  Loader2,
  CheckCircle2,
  XCircle,
  Users,
  Code,
} from "lucide-react";
import CxCButton from "@/components/CxCButton";

interface User {
  id: string;
  email: string;
  role: string;
  display_name: string | null;
}

export default function AdminAssignVolunteersPage() {
  const [emailQuery, setEmailQuery] = useState<string>("");
  const [searching, setSearching] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [assigning, setAssigning] = useState<{
    userId: string;
    role: string;
  } | null>(null);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSearch = async () => {
    if (!emailQuery.trim()) {
      setResult({
        success: false,
        message: "Please enter an email to search",
      });
      return;
    }

    setSearching(true);
    setResult(null);
    setUsers([]);

    try {
      const response = await fetch(
        `/api/admin/users/search?email=${encodeURIComponent(emailQuery.trim())}`,
      );
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users || []);
        if (data.users.length === 0) {
          setResult({
            success: false,
            message: "No users found matching that email",
          });
        }
      } else {
        setResult({
          success: false,
          message: data.message || data.error || "Failed to search users",
        });
      }
    } catch (error) {
      console.error("Error searching users:", error);
      setResult({
        success: false,
        message: "Failed to search users. Please try again.",
      });
    } finally {
      setSearching(false);
    }
  };

  const handleAssignRole = async (
    userId: string,
    userEmail: string,
    role: "hacker" | "volunteer",
  ) => {
    if (
      !confirm(`Are you sure you want to assign ${role} role to ${userEmail}?`)
    ) {
      return;
    }

    setAssigning({ userId, role });
    setResult(null);

    try {
      const response = await fetch("/api/admin/users/assign-volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          role,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: `Successfully assigned ${role} role to ${userEmail}`,
        });

        // Update the user's role in the local state
        setUsers(users.map((u) => (u.id === userId ? { ...u, role } : u)));

        // Clear result after 5 seconds
        setTimeout(() => {
          setResult(null);
        }, 5000);
      } else {
        setResult({
          success: false,
          message:
            data.message || data.error || `Failed to assign ${role} role`,
        });
      }
    } catch (error) {
      console.error(`Error assigning ${role} role:`, error);
      setResult({
        success: false,
        message: `Failed to assign ${role} role. Please try again.`,
      });
    } finally {
      setAssigning(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background text-white p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-bold mb-2">Assign Roles</h1>
          <p className="text-gray-400">
            Search for users by email and assign them hacker or volunteer roles.
            Only admins and superadmins can access this page.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <Card className="bg-black border border-white/20 rounded-none !gap-0">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-white uppercase tracking-wider text-sm">
                Search Users
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Search Input */}
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={emailQuery}
                  onChange={(e) => setEmailQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter email address to search..."
                  className="flex-1 bg-black border-white/20 text-white placeholder:text-white/40 rounded-none focus-visible:ring-white/40"
                  disabled={searching}
                />
                <CxCButton
                  onClick={handleSearch}
                  disabled={searching || !emailQuery.trim()}
                  className="px-6 py-2"
                >
                  {searching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </CxCButton>
              </div>

              {/* Result Message */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 flex items-center gap-2 border ${
                    result.success
                      ? "bg-green-500/10 text-green-400 border-green-400/40"
                      : "bg-red-500/10 text-red-400 border-red-400/40"
                  }`}
                >
                  {result.success ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <span>{result.message}</span>
                </motion.div>
              )}

              {/* Users List */}
              {users.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-gray-400">
                    Found {users.length} user{users.length !== 1 ? "s" : ""}:
                  </h3>
                  <div className="space-y-2">
                    {users.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 border border-white/20 bg-black hover:bg-white/5 transition-colors flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-white">
                            {user.email}
                          </div>
                          {user.display_name && (
                            <div className="text-sm text-gray-400">
                              {user.display_name}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            Current role:{" "}
                            <span className="font-mono text-gray-300">
                              {user.role}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.role === "admin" ||
                          user.role === "superadmin" ? (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <span>Cannot change {user.role} role</span>
                            </div>
                          ) : user.role === "hacker" ||
                            user.role === "volunteer" ? (
                            <div className="flex items-center gap-2">
                              <CxCButton
                                onClick={() =>
                                  handleAssignRole(
                                    user.id,
                                    user.email,
                                    "hacker",
                                  )
                                }
                                disabled={
                                  assigning?.userId === user.id ||
                                  user.role === "hacker"
                                }
                                className={`px-3 py-1.5 text-sm ${
                                  user.role === "hacker"
                                    ? "!bg-blue-500 !text-white hover:!bg-blue-600 border border-blue-400"
                                    : "!bg-blue-500/10 !text-blue-400 hover:!bg-blue-500/20 border border-blue-400/40"
                                }`}
                              >
                                {assigning?.userId === user.id &&
                                assigning?.role === "hacker" ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Assigning...
                                  </>
                                ) : (
                                  <>
                                    <Code className="mr-2 h-4 w-4" />
                                    Assign Hacker
                                  </>
                                )}
                              </CxCButton>
                              <CxCButton
                                onClick={() =>
                                  handleAssignRole(
                                    user.id,
                                    user.email,
                                    "volunteer",
                                  )
                                }
                                disabled={
                                  assigning?.userId === user.id ||
                                  user.role === "volunteer"
                                }
                                className={`px-3 py-1.5 text-sm ${
                                  user.role === "volunteer"
                                    ? "!bg-purple-500 !text-white hover:!bg-purple-600 border border-purple-400"
                                    : "!bg-purple-500/10 !text-purple-400 hover:!bg-purple-500/20 border border-purple-400/40"
                                }`}
                              >
                                {assigning?.userId === user.id &&
                                assigning?.role === "volunteer" ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Assigning...
                                  </>
                                ) : (
                                  <>
                                    <Users className="mr-2 h-4 w-4" />
                                    Assign Volunteer
                                  </>
                                )}
                              </CxCButton>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CxCButton
                                onClick={() =>
                                  handleAssignRole(
                                    user.id,
                                    user.email,
                                    "hacker",
                                  )
                                }
                                disabled={assigning?.userId === user.id}
                                className="px-3 py-1.5 text-sm !bg-blue-500/10 !text-blue-400 hover:!bg-blue-500/20 border border-blue-400/40"
                              >
                                {assigning?.userId === user.id &&
                                assigning?.role === "hacker" ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Assigning...
                                  </>
                                ) : (
                                  <>
                                    <Code className="mr-2 h-4 w-4" />
                                    Assign Hacker
                                  </>
                                )}
                              </CxCButton>
                              <CxCButton
                                onClick={() =>
                                  handleAssignRole(
                                    user.id,
                                    user.email,
                                    "volunteer",
                                  )
                                }
                                disabled={assigning?.userId === user.id}
                                className="px-3 py-1.5 text-sm !bg-purple-500/10 !text-purple-400 hover:!bg-purple-500/20 border border-purple-400/40"
                              >
                                {assigning?.userId === user.id &&
                                assigning?.role === "volunteer" ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Assigning...
                                  </>
                                ) : (
                                  <>
                                    <Users className="mr-2 h-4 w-4" />
                                    Assign Volunteer
                                  </>
                                )}
                              </CxCButton>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
