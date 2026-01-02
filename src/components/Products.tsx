import { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { allProducts } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const { addToCart } = useCart();
  const displayProducts = allProducts.slice(0, 8);

  useEffect(() => {
    gsap.fromTo(
      ".product-card-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".products-section",
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleAddToCart = (product: typeof displayProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
  };

  return (
    <section id="shop" className="products-section py-12 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-secondary font-medium mb-2">Our Products</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Explore Our Products
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="product-card-item product-card group">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {product.badge && (
                  <span
                    className={`product-badge ${
                      product.badge === "bestseller"
                        ? "product-badge-bestseller"
                        : "product-badge-new"
                    }`}
                  >
                    {product.badge === "bestseller" ? "Best Seller" : "New"}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors"
                  >
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Rating */}
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < product.rating
                          ? "text-primary fill-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <h3 className="font-semibold text-foreground">{product.name}</h3>
                
                {/* Price */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-foreground">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm line-through text-muted-foreground">
                        ${product.originalPrice}
                      </span>
                      <span className="text-accent text-sm font-semibold">
                        {Math.round(
                          ((product.originalPrice - product.price) / product.originalPrice) * 100
                        )}
                        % OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Colors */}
                {product.colors && (
                  <div className="flex gap-2 mt-2">
                    {product.colors.map((color, i) => (
                      <button
                        key={i}
                        className="w-4 h-4 rounded-full border border-border hover:border-secondary transition-colors"
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/90 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
