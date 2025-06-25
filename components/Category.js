'use client';
import Link from 'next/link';

const categories = [
    { name: 'Singers' },
    { name: 'Dancers' },
    { name: 'Speakers' },
    { name: 'DJs' },
];

export default function CategoryCards() {
    return (
        <section className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {categories.map((c) => (
                <Link
                    key={c.name}
                    href={`/artists?category=${c.name}`}
                >
                    <div className="p-6 bg-white text-black rounded-xl shadow hover:shadow-lg text-center cursor-pointer hover:bg-gray-100 transition">
                        <h3 className="font-semibold text-lg">{c.name}</h3>
                    </div>
                </Link>
            ))}
        </section>
    );
}

