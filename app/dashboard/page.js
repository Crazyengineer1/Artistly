export const metadata = {
    title: 'Dashboard | Artistly',
    description: 'View and manage onboarded artists efficiently.',
};


import artists from '../../data/artists.json';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';

export default function ManagerDashboard() {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>

            {artists.length === 0 ? (
                <p className="text-gray-500">No artists have been onboarded yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Fee</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {artists.map((artist) => (
                                <TableRow key={artist.id}>
                                    <TableCell>{artist.name}</TableCell>
                                    <TableCell>{artist.category}</TableCell>
                                    <TableCell>{artist.location}</TableCell>
                                    <TableCell>{artist.fee}</TableCell>
                                    <TableCell>
                                        <Button className="bg-black text-white px-3 py-1 rounded hover:cursor-pointer hover:bg-gray-800 text-sm">
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
