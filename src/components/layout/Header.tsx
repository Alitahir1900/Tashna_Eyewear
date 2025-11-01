"use client";

import Link from "next/link";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Tashna Eyewear
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="hover:text-primary">
              Shop
            </Link>
            <Link href="/category/frames" className="hover:text-primary">
              Frames
            </Link>
            <Link href="/category/sunglasses" className="hover:text-primary">
              Sunglasses
            </Link>
            <Link href="/category/vision-glasses" className="hover:text-primary">
              Vision Glasses
            </Link>
            <Link href="/category/contact-lenses" className="hover:text-primary">
              Contact Lenses
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {/* Cart count badge */}
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <Link
              href="/shop"
              className="block py-2 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/category/frames"
              className="block py-2 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Frames
            </Link>
            <Link
              href="/category/sunglasses"
              className="block py-2 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sunglasses
            </Link>
            <Link
              href="/category/vision-glasses"
              className="block py-2 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vision Glasses
            </Link>
            <Link
              href="/category/contact-lenses"
              className="block py-2 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Lenses
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
