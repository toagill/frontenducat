import { HeroSection } from "@/components/home/hero-section";
import { UCATSubtestCards } from "@/components/home/ucat-subtest-cards";
import { UCATProgressSection } from "@/components/home/ucat-progress-section";
import { PlayerTestimonials } from "@/components/home/player-testimonials";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { Footer } from "@/components/layout/footer";
import "swiper/swiper-bundle.css";

export default function Home() {
  return (
    <div className="space-y-4 xl:space-y-8 pb-8">
      <HeroSection />
      <UCATSubtestCards />
      <UCATProgressSection />
      <PlayerTestimonials />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
