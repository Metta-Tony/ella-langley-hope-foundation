import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { CommunityGallery } from './components/CommunityGallery';
import { Impact } from './components/Impact';
import { DonationForm } from './components/DonationForm';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToDonation = () => {
    const donationSection = document.getElementById('donate');
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-purple-200 selection:text-purple-950 font-sans">
      {/* Sticky Navigation with Ella 6 Logo */}
      <Navbar onDonateClick={scrollToDonation} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onDonateClick={scrollToDonation}
          onLearnMoreClick={scrollToAbout}
        />

        {/* 2. About Section */}
        <About onDonateClick={scrollToDonation} />

        {/* 3. Community Gallery & Initiatives (Integrated Images) */}
        <CommunityGallery onDonateClick={scrollToDonation} />

        {/* 4. Impact Section */}
        <Impact />

        {/* 5. Donation Section */}
        <DonationForm />

        {/* 6. Testimonials Section */}
        <Testimonials />

        {/* 7. FAQ Accordion Section */}
        <FAQ />

        {/* 8. Contact Section */}
        <Contact />
      </main>

      {/* 9. Footer Section */}
      <Footer />
    </div>
  );
}
