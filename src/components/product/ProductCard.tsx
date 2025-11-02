import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product & {
    images: { url: string; altText: string | null }[];
    variants: { stockQuantity: number }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0];
  const inStock = product.variants.some((v) => v.stockQuantity > 0);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.altText || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-semibold rounded">
              NEW
            </span>
          )}
          {!inStock && (
            <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-semibold rounded">
              OUT OF STOCK
            </span>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        {product.shortDescription && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.shortDescription}
          </p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold">
            {formatPrice(Number(product.basePrice))}
          </span>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="h-9 w-9">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-9 w-9" disabled={!inStock}>
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
