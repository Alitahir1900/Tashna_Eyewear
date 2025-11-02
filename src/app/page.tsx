import Link from "next/link";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";

export default async function HomePage() {
  // Fetch featured products
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true },
    include: {
      images: {
        orderBy: { order: "asc" },
        take: 1,
      },
      variants: {
        select: { stockQuantity: true },
      },
      category: true,
    },
    take: 4,
  });

  // Fetch new arrivals
  const newProducts = await prisma.product.findMany({
    where: { isNew: true },
    include: {
      images: {
        orderBy: { order: "asc" },
        take: 1,
      },
      variants: {
        select: { stockQuantity: true },
      },
      category: true,
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  // Fetch categories
  const categories = await prisma.category.findMany({
    take: 4,
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Your Perfect Eyewear
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Premium frames, sunglasses, and vision glasses for every style
            </p>
            <Button size="lg" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-lg border hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Button variant="outline" asChild>
                <Link href="/shop">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">New Arrivals</h2>
              <Button variant="outline" asChild>
                <Link href="/shop?filter=new">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Find Your Perfect Style</h2>
          <p className="text-xl mb-8 opacity-90">
            Browse our complete collection of premium eyewear
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/shop">Explore All Products</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
