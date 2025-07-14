
'use client';

import { useUserAuth } from '../_utils/auth-context';

export default function ProfilePage() {
  const { user } = useUserAuth();

  if (!user) {
    return (
      <main className="flex items-center justify-center min-h-screen p-6 bg-amber-50">
        <p className="text-xl text-red-600 font-semibold">Please log in to view your profile.</p>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-4xl font-extrabold mb-6 text-emerald-800 text-center">User Profile</h1>
      
      <div className="flex flex-col items-center">
        <img
          src={user.photoURL}
          alt={`${user.displayName} Profile Picture`}
          width={120}
          height={120}
          className="rounded-full border-4 border-black shadow-md"
        />
        
        <div className="mt-6 w-full">
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Name:</span> {user.displayName}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
      </div>
    </main>
  );
}
