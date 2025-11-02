import prisma from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
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
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of premium eyewear
        </p>
      </div>

      {/* Categories filter */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-3">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          <a
            href="/shop"
            className="px-4 py-2 rounded-full border hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            All
          </a>
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/category/${category.slug}`}
              className="px-4 py-2 rounded-full border hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>

      {/* Products grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No products available at the moment.</p>
        </div>
      )}
    </div>
  );
}
