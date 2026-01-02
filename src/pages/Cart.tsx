import { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  useEffect(() => {
    gsap.fromTo(
      ".cart-item",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }
    );
  }, [items.length]);

  const shipping = items.length > 0 ? 9.99 : 0;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Shopping <span className="text-secondary">Cart</span>
            </h1>
            {items.length > 0 && (
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                Clear Cart
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-20">
              <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground/30 mb-6" />
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link to="/shop">
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item flex gap-4 p-4 bg-card rounded-2xl border border-border"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                      {item.color && (
                        <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-bold text-foreground">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm line-through text-muted-foreground">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right hidden sm:block">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-lg font-bold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({items.length} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between text-lg font-bold text-foreground">
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-6 text-lg mb-4">
                    Proceed to Checkout
                  </Button>

                  <Link to="/shop" className="block">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>

                  {/* Promo Code */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Have a promo code?</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
