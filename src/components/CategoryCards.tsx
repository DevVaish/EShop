import earphone from "@/assets/earphone.png";
import watch from "@/assets/watch.png";
import macbook from "@/assets/macbook.png";

const categories = [
  {
    title: "Earphone",
    image: earphone,
    variant: "dark" as const,
  },
  {
    title: "Gadget",
    image: watch,
    variant: "yellow" as const,
  },
  {
    title: "Laptop",
    image: macbook,
    variant: "red" as const,
  },
];

const CategoryCards = () => {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category-card h-56 flex items-end justify-between ${
                category.variant === "dark"
                  ? "category-card-dark"
                  : category.variant === "yellow"
                  ? "category-card-yellow"
                  : "category-card-red"
              }`}
            >
              <div className="z-10">
                <p className="text-sm opacity-80">Enjoy</p>
                <p className="font-semibold">With</p>
                <h3 className="text-3xl font-bold opacity-50">{category.title}</h3>
                <button
                  className={`btn-browse mt-4 ${
                    category.variant === "dark"
                      ? "btn-browse-dark"
                      : category.variant === "yellow"
                      ? "border-foreground/50 text-foreground hover:bg-foreground hover:text-card"
                      : "btn-browse-dark"
                  }`}
                >
                  Browse
                </button>
              </div>
              <img
                src={category.image}
                alt={category.title}
                className="absolute right-4 bottom-4 h-40 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
