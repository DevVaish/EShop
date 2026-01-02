import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const blogs = [
  {
    title: "How to choose perfect smartwatch",
    date: "Jan 20, 2024",
    author: "Dilshad",
    image: blog1,
    excerpt:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
  },
  {
    title: "How to choose perfect gadget",
    date: "Jan 20, 2024",
    author: "Satya",
    image: blog2,
    excerpt:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
  },
  {
    title: "How to choose perfect VR headset",
    date: "Jan 20, 2024",
    author: "Sabir",
    image: blog3,
    excerpt:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
  },
];

const Blogs = () => {
  return (
    <section id="blog" className="py-12 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-primary font-medium mb-2">Recent News</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Explore Our Blogs
          </h2>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <article key={index} className="blog-card">
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  {blog.date} by{" "}
                  <span className="text-primary">{blog.author}</span>
                </p>
                <h3 className="text-lg font-semibold text-foreground mb-3 hover:text-primary transition-colors cursor-pointer">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
