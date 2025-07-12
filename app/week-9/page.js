'use client';

import Link from 'next/link';
import { useUserAuth } from './_utils/auth-context';

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <main className="min-h-screen bg-amber-100 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-emerald-900">Welcome to the Shopping List App</h1>

      {!user ? (
        <button
          onClick={handleLogin}
          className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800"
        >
          Login with GitHub
        </button>
      ) : (
        <div className="space-y-4">
          <p className="text-lg text-green-800">
            Welcome, <strong>{user.displayName}</strong> ({user.email})
          </p>

          <Link
            href="/week-9/shopping-list"
            className="inline-block bg-emerald-700 text-white px-6 py-2 rounded hover:bg-emerald-800"
          >
            Go to Shopping List
          </Link>

          <button
            onClick={handleLogout}
            className="block mt-4 text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      )}
    </main>
  );
}
