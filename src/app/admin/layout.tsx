import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Star,
  BarChart
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <nav className="space-y-2 sticky top-4">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="ghost" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Products
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button variant="ghost" className="w-full justify-start">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Orders
              </Button>
            </Link>
            <Link href="/admin/customers">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Customers
              </Button>
            </Link>
            <Link href="/admin/reviews">
              <Button variant="ghost" className="w-full justify-start">
                <Star className="mr-2 h-4 w-4" />
                Reviews
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button variant="ghost" className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <div className="border-t pt-2 mt-2">
              <Link href="/">
                <Button variant="outline" className="w-full justify-start">
                  Back to Store
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="md:col-span-3">
          {children}
        </main>
      </div>
    </div>
  );
}
