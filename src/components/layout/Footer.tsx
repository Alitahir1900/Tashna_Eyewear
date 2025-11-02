import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Tashna Eyewear</h3>
            <p className="text-sm text-muted-foreground">
              Premium eyewear for every style. Discover frames, sunglasses, and more.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/frames" className="hover:text-primary">
                  Frames
                </Link>
              </li>
              <li>
                <Link href="/category/sunglasses" className="hover:text-primary">
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link href="/category/vision-glasses" className="hover:text-primary">
                  Vision Glasses
                </Link>
              </li>
              <li>
                <Link href="/category/contact-lenses" className="hover:text-primary">
                  Contact Lenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-primary">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tashna Eyewear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
