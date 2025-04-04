"use client";

import { useAuth } from "@/hooks/use-auth";

export const DebugAuth = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading auth state...</div>;
  }

  return (
    <div className="border p-4 rounded-md bg-gray-100 dark:bg-gray-800">
      <h3 className="font-bold">Auth Debug</h3>
      {user ? (
        <>
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </>
      ) : (
        <p>Not authenticated</p>
      )}
    </div>
  );
};
