'use client';

import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="w-full px-4 py-20 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    Your One stop solution for talented artists
                </h2>
                <p className="text-md sm:text-lg mb-6">
                    Connect with talented performers and make your event unforgettable.
                </p>
                <Link href="/artists">
                    <button className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                        Explore Artists
                    </button>
                </Link>
            </div>
        </section>
    );
}
