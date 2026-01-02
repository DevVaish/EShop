import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import headphone from "@/assets/headphone.png";
import smartwatch from "@/assets/smartwatch.png";

gsap.registerPlugin(ScrollTrigger);

interface SaleBannerProps {
  variant?: "primary" | "secondary";
  discount: string;
  title: string;
  dateRange: string;
  subtitle: string;
  saleType: string;
  image: "headphone" | "smartwatch";
}

const SaleBanner = ({
  variant = "primary",
  discount,
  title,
  dateRange,
  subtitle,
  saleType,
  image,
}: SaleBannerProps) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const productImage = image === "headphone" ? headphone : smartwatch;

  useEffect(() => {
    if (bannerRef.current && contentRef.current && imageRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section className="py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div
          ref={bannerRef}
          className={`sale-banner ${
            variant === "secondary" ? "sale-banner-dark" : ""
          } p-8 md:p-12`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side with discount */}
            <div ref={contentRef} className="text-center md:text-left">
              <span className="inline-block bg-primary text-primary-foreground font-bold px-4 py-2 rounded-lg mb-4">
                {discount}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-2">
                {title}
              </h2>
              <p className="text-secondary-foreground/80">{dateRange}</p>
            </div>

            {/* Center product image */}
            <div className="flex-shrink-0">
              <img
                ref={imageRef}
                src={productImage}
                alt={title}
                className="h-40 md:h-56 object-contain animate-float drop-shadow-2xl"
              />
            </div>

            {/* Right side with CTA */}
            <div className="text-center md:text-right">
              <p className="text-xl font-semibold text-secondary-foreground">{subtitle}</p>
              <p className="text-secondary-foreground/80 mb-4">{saleType}</p>
              <p className="text-sm text-secondary-foreground/70 mb-4 max-w-xs">
                Premium sound quality with advanced noise cancellation
              </p>
              <Button className="btn-shop-outline">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleBanner;
