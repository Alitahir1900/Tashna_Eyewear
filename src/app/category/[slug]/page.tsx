import prisma from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: { categoryId: category.id },
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-muted-foreground">{category.description}</p>
        )}
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            No products in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
