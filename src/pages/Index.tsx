import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PromoBanner from "@/components/PromoBanner";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import BankBar from "@/components/BankBar";
import Features from "@/components/Features";
import CategoryCards from "@/components/CategoryCards";
import Products from "@/components/Products";
import SaleBanner from "@/components/SaleBanner";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Refresh ScrollTrigger on page load
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Header />
      <main>
        <HeroCarousel />
        <BankBar />
        <Features />
        <Products />
        <CategoryCards />
        <SaleBanner
          variant="primary"
          discount="30% OFF"
          title="Winter Sale"
          dateRange="Limited Time Offer"
          subtitle="Premium Headphones"
          saleType="Best Deal"
          image="headphone"
        />
        <Products />
        <SaleBanner
          variant="secondary"
          discount="40% OFF"
          title="Smart Watch Sale"
          dateRange="Exclusive Online"
          subtitle="Track Your Health"
          saleType="Top Seller"
          image="smartwatch"
        />
        <Blogs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
