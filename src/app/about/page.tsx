export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Tashna Eyewear</h1>

        <div className="prose prose-lg">
          <p className="text-xl text-muted-foreground mb-8">
            Your trusted partner for premium eyewear solutions
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground">
              Tashna Eyewear was founded with a simple mission: to provide high-quality,
              stylish eyewear that everyone can afford. We believe that great vision
              shouldn't come with a hefty price tag, and that style should be accessible
              to all.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              We are committed to offering a diverse selection of frames, sunglasses,
              vision glasses, and contact lenses that combine quality, comfort, and
              contemporary design. Every product we offer is carefully selected to ensure
              it meets our high standards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Premium quality eyewear at affordable prices</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Wide selection of styles for every taste</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Professional prescription services</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Fast and reliable delivery across Pakistan</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Excellent customer service</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions? We'd love to hear from you. Visit our{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact page
              </a>{" "}
              to get in touch with our team.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
