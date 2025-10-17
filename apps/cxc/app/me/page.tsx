'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@uwdsc/server/core/database/client';

interface User {
    id: string;
    email: string;
}

interface UploadResponse {
    message?: string;
    key?: string;
    publicUrl?: string;
    error?: string;
}

export default function MePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Resume upload states
    const [uploading, setUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Use the pre-configured Supabase client
                console.log('Using pre-configured Supabase client...');

                // Check if there's an access token in the URL hash (from email verification)
                const hashParams = new URLSearchParams(window.location.hash.substring(1));
                const accessToken = hashParams.get('access_token');
                
                if (accessToken) {
                    console.log('Email verification token detected:', accessToken);
                    
                    // Let Supabase handle the session from URL hash
                    const { data: { session }, error } = await supabase.auth.getSession();
                    if (error) {
                        console.error('Session error:', error);
                    } else if (session) {
                        console.log('Session established:', session);
                        // Set user data directly from session
                        setUser({
                            id: session.user.id,
                            email: session.user.email || '',
                        });
                        setLoading(false);
                        return;
                    }
                    
                    window.history.replaceState({}, document.title, window.location.pathname);
                }

                // Debug (thanks GPT)
                const response = await fetch('/api/auth/me');
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData.user);
                } else {
                    const errorData = await response.text();
                    console.error('Auth me error:', response.status, errorData);
                    setError(`Failed to fetch user data: ${response.status} - ${errorData}`);
                }
            } catch (err) {
                console.error('Error in fetchUser:', err);
                setError(`An error occurred while fetching user data: ${err instanceof Error ? err.message : String(err)}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        setUploadResult(null);
        setUploadError(null);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadError('Please select a file first');
            return;
        }

        setUploading(true);
        setUploadError(null);
        setUploadResult(null);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            console.log('Uploading file:', {
                name: selectedFile.name,
                size: selectedFile.size,
                type: selectedFile.type
            });

            const response = await fetch('/api/applications/resumes', {
                method: 'POST',
                body: formData,
            });

            const result: UploadResponse = await response.json();
            
            console.log('Upload response:', {
                status: response.status,
                statusText: response.statusText,
                result
            });

            if (response.ok) {
                setUploadResult(result);
            } else {
                setUploadError(result.error || `Upload failed with status ${response.status}`);
            }
        } catch (err) {
            console.error('Upload error:', err);
            setUploadError(`Network error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setUploading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });
            
            if (response.ok) {
                router.push('/');
            } else {
                console.error('Logout failed');
            }
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">User Profile</h1>
            
            {user ? (
                <div className="space-y-8">
                    {/* User Info Section */}
                    <div className="bg-gray-50 text-black p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold">Profile Information</h2>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                        <p>Welcome :D</p>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>

                    {/* Resume Upload Section */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-black mb-4">Resume Upload Test</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="resume-file" className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Resume File (PDF or DOCX, max 10MB)
                                </label>
                                <input
                                    id="resume-file"
                                    type="file"
                                    accept=".pdf,.docx,.doc"
                                    onChange={handleFileSelect}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>

                            {selectedFile && (
                                <div className="text-sm text-gray-600">
                                    <p><strong>Selected file:</strong> {selectedFile.name}</p>
                                    <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <p><strong>Type:</strong> {selectedFile.type}</p>
                                </div>
                            )}

                            <button
                                onClick={handleUpload}
                                disabled={!selectedFile || uploading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {uploading ? 'Uploading...' : 'Upload Resume'}
                            </button>
                        </div>

                        {/* Upload Results */}
                        {uploadResult && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                                <h3 className="text-green-800 font-semibold">Upload Successful!</h3>
                                <div className="mt-2 text-sm text-green-700">
                                    <p><strong>Message:</strong> {uploadResult.message}</p>
                                    <p><strong>File Key:</strong> {uploadResult.key}</p>
                                    {uploadResult.publicUrl && (
                                        <p><strong>Public URL:</strong> 
                                            <a href={uploadResult.publicUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                                {uploadResult.publicUrl}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {uploadError && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                                <h3 className="text-red-800 font-semibold">Upload Failed</h3>
                                <p className="mt-2 text-sm text-red-700">{uploadError}</p>
                            </div>
                        )}

                        
                        {/* Debug 
                        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md">
                            <h3 className="text-gray-800 font-semibold mb-2">Debug Information</h3>
                            <div className="text-xs text-gray-600 space-y-1">
                                <p><strong>User ID:</strong> {user.id}</p>
                                <p><strong>Selected File:</strong> {selectedFile ? `${selectedFile.name} (${selectedFile.type})` : 'None'}</p>
                                <p><strong>Upload Status:</strong> {uploading ? 'In Progress' : uploadResult ? 'Success' : uploadError ? 'Failed' : 'Ready'}</p>
                                <p><strong>Last Upload Result:</strong> {uploadResult ? JSON.stringify(uploadResult, null, 2) : 'None'}</p>
                                <p><strong>Last Upload Error:</strong> {uploadError || 'None'}</p>
                            </div>
                        </div>
                        */}
                    </div>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
}