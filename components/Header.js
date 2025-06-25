'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
    const [Dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => setDropdown(!Dropdown)
    return (
        <header className='flex justify-between items-center'>
            <h1 className=''>Artistly</h1>
            <nav className='relative'>
                <Link href="/" className='mx-4 hover:text-green-500'>Home</Link>
                <Link href="/onboard" className='mx-4 hover:text-green-500'>Add a new artist</Link>
                <Link href="/dashboard" className='mx-4 hover:text-green-500'>Dashboard</Link>
                <Button onClick={toggleDropdown}>
                    Explore artists ^
                </Button>

                {Dropdown && (
                    <div className='absolute top-full'>
                        <Link href="/artists?category=Singers" className='block hover:bg-gray-200' onClick={toggleDropdown}>Singers</Link>
                        <Link href="/artists?category=Dancers" className='block hover:bg-gray-200' onClick={toggleDropdown}>Dancers</Link>
                        <Link href="/artists?category=Speakers" className='block hover:bg-gray-200' onClick={toggleDropdown}>Speakers</Link>
                        <Link href="/artists?category=DJ" className='block hover:bg-gray-200' onClick={toggleDropdown}>DJ</Link>
                        <Link href="/artists?category=All" className='block hover:bg-gray-200' onClick={toggleDropdown}>All</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
