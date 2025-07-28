'use client';

import Link from 'next/link';
import { useUserAuth } from './_utils/auth-context';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { user, gitHubSignIn, googleSignIn } = useUserAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
      // Redirect to shopping list page after successful login
      router.push('/week-10/shopping-list');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoogleLogin = async () => {
  try {
    await googleSignIn();
    router.push('/week-10/shopping-list');
  } catch (error) {
    console.error('Google login error:', error);
  }
};

  return (
    <main className="min-h-screen bg-amber-100 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-emerald-900">Welcome to the Shopping List App</h1>

      {!user ? (
        <div>
          <button onClick={handleLogin} className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800"> Login with GitHub </button>
          <button onClick={handleGoogleLogin} className="ml-4 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"> Login with Google </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4 text-center">
          <p className="text-lg text-green-800">
            Welcome, <strong>{user.displayName}</strong> ({user.email})
          </p>

          <Link
            href="./week-10/shopping-list"
            className="inline-block bg-emerald-700 text-white px-6 py-2 rounded hover:bg-emerald-800"
          >
            Go to Shopping List
          </Link>

          <Link href="./week-10/profile" className=" bg-amber-800 text-white  text-2xl px-8 py-1 rounded hover:bg-amber-700">View Profile </Link>

        </div>
      )}
    </main>
  );
}
