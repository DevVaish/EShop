import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Filter, SlidersHorizontal } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useSearch } from "@/contexts/SearchContext";
import { allProducts, categories } from "@/data/products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { searchQuery } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  // Get search query from URL if present
  const urlSearchQuery = searchParams.get("search") || "";
  const effectiveSearchQuery = searchQuery || urlSearchQuery;

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by search query
    if (effectiveSearchQuery) {
      const query = effectiveSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [effectiveSearchQuery, selectedCategory, sortBy, priceRange]);

  useEffect(() => {
    gsap.fromTo(
      ".shop-product-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [filteredProducts]);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
              placeholder="Min"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {effectiveSearchQuery ? (
                  <>
                    Search Results for "<span className="text-secondary">{effectiveSearchQuery}</span>"
                  </>
                ) : (
                  <>
                    Our <span className="text-secondary">Products</span>
                  </>
                )}
              </h1>
              <p className="text-muted-foreground mt-2">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 bg-card p-6 rounded-2xl border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="w-5 h-5 text-secondary" />
                  <h2 className="font-semibold text-foreground">Filters</h2>
                </div>
                <FilterSidebar />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">No products found</p>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                <div className="products-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="shop-product-card product-card group">
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
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Add to Cart
                          </Button>
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
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {product.description}
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-2 mt-3">
                          <span className="product-price-sale">${product.price}</span>
                          {product.originalPrice && (
                            <>
                              <span className="product-price-original">
                                ${product.originalPrice}
                              </span>
                              <span className="product-discount">
                                {Math.round(
                                  ((product.originalPrice - product.price) / product.originalPrice) *
                                    100
                                )}
                                % OFF
                              </span>
                            </>
                          )}
                        </div>

                        {/* Colors */}
                        {product.colors && (
                          <div className="flex gap-2 mt-3">
                            {product.colors.map((color, i) => (
                              <button
                                key={i}
                                className="w-5 h-5 rounded-full border-2 border-border hover:border-secondary transition-colors"
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
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
