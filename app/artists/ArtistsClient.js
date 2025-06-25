'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import artists from '../../data/artists.json';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function ArtistsClient() {
    const sP = useSearchParams();
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [initialized, setinitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            const initialCategory = sP.get('category') || '';
            setCategory(initialCategory);
            setinitialized(true);
        }
    }, [initialized, sP]);

    const handleCategoryChange = (value) => {
        const select = value === 'all' ? '' : value;
        setCategory(select);
        const params = new URLSearchParams();
        if (select) params.set('category', select);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, '', newUrl);
    };

    const categories = useMemo(() => [...new Set(artists.map((a) => a.category))], []);
    const locations = useMemo(() => [...new Set(artists.map((a) => a.location))], []);
    const prices = ['< ₹30K', '₹30K–50K', '> ₹50K'];

    const parseFeeRange = (feeString) => {
        if (!feeString) return { minFee: 0, maxFee: 0 };
        const [min, max] = feeString
            .replace(/[₹,]/g, '')
            .split('–')
            .map((val) => parseInt(val.trim()));
        return { minFee: min || 0, maxFee: max || 0 };
    };

    const matchesPrice = (feeString) => {
        if (!price) return true;
        const { minFee, maxFee } = parseFeeRange(feeString);
        if (price === '< ₹30K') return minFee < 30000;
        if (price === '₹30K–50K') return minFee >= 30000 && maxFee <= 50000;
        if (price === '> ₹50K') return maxFee > 50000;
        return true;
    };

    const filteredArtists = artists.filter((artist) => {
        const categoryMatch = category ? artist.category === category : true;
        const locationMatch = location ? artist.location === location : true;
        const priceMatch = matchesPrice(artist.fee);
        return categoryMatch && locationMatch && priceMatch;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Browse Artists</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Select value={category || 'all'} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={location || 'all'} onValueChange={(v) => setLocation(v === 'all' ? '' : v)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map((l) => (
                            <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={price || 'all'} onValueChange={(v) => setPrice(v === 'all' ? '' : v)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Price Ranges</SelectItem>
                        {prices.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {filteredArtists.length === 0 ? (
                <p className="text-gray-500">No artists match the selected filters.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArtists.map((artist) => (
                        <div
                            key={artist.id}
                            className="bg-white p-4 rounded-xl shadow hover:cursor-pointer hover:border-2 hover:border-amber-400 transition"
                        >
                            <h2 className="text-xl font-semibold mb-1">{artist.name}</h2>
                            <p className="text-sm text-gray-600">{artist.category}</p>
                            <p className="text-sm">{artist.location}</p>
                            <p className="text-sm font-medium">{artist.fee}</p>
                            <button className="mt-3 bg-black text-white px-4 py-2 rounded hover:border-2 hover:border-blue-600 hover:bg-white hover:text-blue-600 transition duration-500">
                                Ask for Quote
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
