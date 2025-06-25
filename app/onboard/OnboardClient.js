'use client';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const category = ['Singers', 'Dancers', 'Speakers', 'DJs'];
const language = ['English', 'Hindi', 'Punjabi', 'Marathi'];
const fee = ['< ₹30K', '₹30K–50K', '> ₹50K'];

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    bio: Yup.string().required('Bio is required'),
    categories: Yup.array().min(1, 'Select at least one category'),
    languages: Yup.array().min(1, 'Select at least one language'),
    fee: Yup.string().required('Fee range is required'),
    location: Yup.string().required('Location is required'),
});

export default function OnboardArtist() {
    const [imagePreview, setImagePreview] = useState(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            bio: '',
            categories: [],
            languages: [],
            fee: '',
            location: '',
            image: null,
        },
    });

    const onSubmit = (data) => {
        console.log('Submitted:', data);
        alert('Form submitted in console');
        reset();
        setImagePreview(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Onboard New Artist</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        {...register('name')}
                        className="w-full border p-2 rounded"
                    />
                    <p className="text-red-500 text-sm">{errors.name?.message}</p>
                </div>

                <div>
                    <label className="block font-medium">Bio</label>
                    <textarea
                        {...register('bio')}
                        className="w-full border p-2 rounded"
                    />
                    <p className="text-red-500 text-sm">{errors.bio?.message}</p>
                </div>

                <div>
                    <label className="block font-medium">Category</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {category.map((cat) => (
                            <label key={cat} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={cat}
                                    {...register('categories')}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                    <p className="text-red-500 text-sm">{errors.categories?.message}</p>
                </div>

                <div>
                    <label className="block font-medium">Languages Spoken</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {language.map((lang) => (
                            <label key={lang} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={lang}
                                    {...register('languages')}
                                />
                                {lang}
                            </label>
                        ))}
                    </div>
                    <p className="text-red-500 text-sm">{errors.languages?.message}</p>
                </div>

                <div>
                    <label className="block font-medium">Fee Range</label>
                    <select {...register('fee')} className="w-full border p-2 rounded">
                        <option value="">Select Fee Range</option>
                        {fee.map((f) => (
                            <option key={f} value={f}>
                                {f}
                            </option>
                        ))}
                    </select>
                    <p className="text-red-500 text-sm">{errors.fee?.message}</p>
                </div>

                <div>
                    <label className="block font-medium">Location</label>
                    <input
                        {...register('location')}
                        className="w-full border p-2 rounded"
                    />
                    <p className="text-red-500 text-sm">{errors.location?.message}</p>
                </div>

                <div>
                    <label className="block font-medium">Profile Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register('image')}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setImagePreview(URL.createObjectURL(file));
                            } else {
                                setImagePreview(null);
                            }
                        }}
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-2 h-32 rounded object-cover"
                        />
                    )}
                </div>

                <Button
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}
