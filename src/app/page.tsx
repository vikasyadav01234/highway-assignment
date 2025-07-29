'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-50 flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Notes App📝</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/signup')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Signup
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* GitHub Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border">
          <h2 className="text-xl text-black font-semibold mb-2">📦 Project GitHub Repo</h2>
          <p className="text-gray-700 mb-4">Explore the code, contribute, or fork the repo.</p>
          <Link
            href="https://github.com/vikasyadav01234/highway-assignment"
            target="_blank"
            className="inline-block mt-2 text-blue-600 hover:underline font-medium"
          >
            🔗 View on GitHub
          </Link>
        </div>

        {/* Developer Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border">
          <h2 className="text-xl text-black font-semibold mb-2">👨‍💻 Developer Info</h2>
          <p className="text-gray-700 mb-1"><span className="font-medium">Name:</span> Your Name</p>
          <p className="text-gray-700 mb-1"><span className="font-medium">Email:</span> your@email.com</p>
          <p className="text-gray-700 mb-1"><span className="font-medium">LinkedIn:</span> <a href="https://www.linkedin.com/in/vikas-yadav2/" target="_blank" className="text-blue-600 hover:underline">yourprofile</a></p>
          <p className="text-gray-700"><span className="font-medium">Tech Stack:</span> Next.js, TypeScript, MongoDB</p>
        </div>
      </div>
    </main>
  );
}
