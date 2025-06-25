export const metadata = {
  title: 'Artistly - Discover and Book Talented Artists',
  description: 'Find and book top singers, dancers, DJs, and speakers for your next event with Artistly.',
};

import Header from '../components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryCards from '@/components/Category'

export default function Home() {
  return (<>
    <Header />
    <HeroSection />
    <CategoryCards />
  </>
  );
}
