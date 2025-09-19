'use client';

import { useEffect, useState } from 'react';

interface User {
    id: string;
    email: string;
}

export default function MePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/auth/me');
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData.user);
                } else {
                    setError('Failed to fetch user data');
                }
            } catch (err) {
                setError('An error occurred while fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            {user ? (
                <div>
                    <p>Welcome :D</p>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
}