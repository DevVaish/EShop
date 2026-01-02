import { Truck, DollarSign, Shield, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free Shipping On All Order",
  },
  {
    icon: DollarSign,
    title: "Safe Money",
    description: "30 Days Money Back",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "All Payment Secure",
  },
  {
    icon: Headphones,
    title: "Online Support 24/7",
    description: "Technical Support 24/7",
  },
];

const Features = () => {
  return (
    <section className="py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="bg-card rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {features.map((feature, index) => (
              <div key={index} className="feature-card p-6">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
