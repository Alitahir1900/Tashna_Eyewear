import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
      variants: {
        where: { isActive: true },
        orderBy: { createdAt: "asc" },
      },
      category: true,
      reviews: {
        where: { isApproved: true },
        include: {
          user: {
            select: { name: true, image: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!product) {
    notFound();
  }

  const mainImage = product.images[0];
  const inStock = product.variants.some((v) => v.stockQuantity > 0);
  const defaultVariant = product.variants[0];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        {" / "}
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>
        {" / "}
        <Link
          href={`/category/${product.category.slug}`}
          className="hover:text-primary"
        >
          {product.category.name}
        </Link>
        {" / "}
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product images */}
        <div>
          <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
            {mainImage ? (
              <Image
                src={mainImage.url}
                alt={mainImage.altText || product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                No Image
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
                >
                  <Image
                    src={image.url}
                    alt={image.altText || product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <div className="mb-6">
            <div className="text-3xl font-bold mb-2">
              {formatPrice(Number(product.basePrice))}
            </div>
            {!inStock && (
              <span className="text-destructive font-semibold">
                Out of Stock
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Available Options</h3>
              <div className="space-y-2">
                {product.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {[variant.color, variant.size, variant.material]
                          .filter(Boolean)
                          .join(" / ")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        SKU: {variant.sku}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatPrice(
                          Number(product.basePrice) +
                            Number(variant.priceDifference)
                        )}
                      </p>
                      <p className="text-sm">
                        {variant.stockQuantity > 0
                          ? `${variant.stockQuantity} in stock`
                          : "Out of stock"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <Button size="lg" className="flex-1" disabled={!inStock}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Category */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              Category:{" "}
              <Link
                href={`/category/${product.category.slug}`}
                className="text-primary hover:underline"
              >
                {product.category.name}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      {product.reviews.length > 0 && (
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold">{review.user.name}</p>
                      <div className="flex">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-500">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    {review.adminResponse && (
                      <div className="mt-4 ml-4 p-4 bg-muted rounded-lg">
                        <p className="font-semibold text-sm mb-1">
                          Response from Tashna Eyewear:
                        </p>
                        <p className="text-sm">{review.adminResponse}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
