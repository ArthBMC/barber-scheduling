import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import GalleryCarousel from "@/components/sections/GalleryCarousel";
import ServicesList from "@/components/sections/ServicesList";
import LocationSection from "@/components/sections/LocationSection";
import BookingModal from "@/components/modals/BookingModal";
import AppointmentCheckModal from "@/components/modals/AppointmentCheckModal";
import BarberAreaModal from "@/components/modals/BarberAreaModal";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isBarberAreaOpen, setIsBarberAreaOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenBookingWithService = (service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleOpenBooking = () => {
    setSelectedService(null);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-orange-500 selection:text-zinc-950">
      {/* Header */}
      <Header
        onOpenBooking={handleOpenBooking}
        onOpenBarberArea={() => setIsBarberAreaOpen(true)}
        onOpenConsult={() => setIsConsultOpen(true)}
      />

      {/* Main Content */}
      <main className="grow">
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onOpenConsult={() => setIsConsultOpen(true)}
        />
        <GalleryCarousel />
        <ServicesList onSelectService={handleOpenBookingWithService} />
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenConsult={() => setIsConsultOpen(true)}
        onOpenBarberArea={() => setIsBarberAreaOpen(true)}
      />

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
      />

      <AppointmentCheckModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
        onOpenBooking={handleOpenBooking}
      />

      <BarberAreaModal
        isOpen={isBarberAreaOpen}
        onClose={() => setIsBarberAreaOpen(false)}
      />
    </div>
  );
}