import Footer from '@/components/Footer';
import './globals.css';
import MainPage from '@/components/Main';
import Navbar from '@/components/Navbar';

export default function Index() {
  return (
    <div className="w-full h-full relative">
      <img src="/bg.jpg" alt="bg" className='w-[100%] h-[100vh] bg-cover fixed hidden sm:block z-[-10]' />
      <Navbar />
      <MainPage />
      <Footer />
    </div>
  )
}
