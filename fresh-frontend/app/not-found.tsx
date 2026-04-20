import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B1F3A] p-6 text-center">
      <div className="text-8xl font-black text-teal-500 mb-4">404</div>
      <h1 className="text-3xl font-bold text-white mb-2">Page not found</h1>
      <p className="text-white/60 mb-8 max-w-sm">
        This page doesn't exist. It may have been moved or removed.
      </p>
      <Link href="/dashboard"
        className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-8 py-3 rounded-xl transition-colors">
        Back to Dashboard
      </Link>
    </div>
  );
}
