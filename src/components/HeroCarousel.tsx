import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import headphone from "@/assets/headphone.png";
import macbook from "@/assets/macbook.png";
import vr from "@/assets/vr.png";

const slides = [
  {
    title: "Beats Solo",
    subtitle: "Wireless",
    category: "HEADPHONE",
    image: headphone,
  },
  {
    title: "Beats Solo",
    subtitle: "Branded",
    category: "LAPTOPS",
    image: macbook,
  },
  {
    title: "Beats Solo",
    subtitle: "Wireless",
    category: "VIRTUAL",
    image: vr,
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="bg-hero rounded-3xl mx-4 md:mx-8 my-4 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="flex-1 animate-slide-in" key={currentSlide}>
            <p className="text-foreground font-medium text-lg mb-2">{slide.title}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-2">
              {slide.subtitle}
            </h1>
            <h2 className="hero-title-outline text-5xl md:text-8xl font-extrabold mb-8">
              {slide.category}
            </h2>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 font-medium">
              Shop By Category
            </Button>
          </div>

          {/* Product Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={slide.image}
              alt={slide.category}
              className="w-full max-w-md md:max-w-lg object-contain animate-float"
              key={`img-${currentSlide}`}
            />
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
