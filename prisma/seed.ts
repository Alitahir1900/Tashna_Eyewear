import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'frames' },
      update: {},
      create: {
        name: 'Frames',
        slug: 'frames',
        description: 'Optical frames for prescription lenses',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sunglasses' },
      update: {},
      create: {
        name: 'Sunglasses',
        slug: 'sunglasses',
        description: 'Stylish sunglasses for sun protection',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'vision-glasses' },
      update: {},
      create: {
        name: 'Vision Glasses',
        slug: 'vision-glasses',
        description: 'Complete prescription glasses',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'contact-lenses' },
      update: {},
      create: {
        name: 'Contact Lenses',
        slug: 'contact-lenses',
        description: 'Comfortable contact lenses',
      },
    }),
  ]);

  console.log('Categories created:', categories.length);

  // Create admin user
  const hashedPassword = await hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tashnaeyewear.com' },
    update: {},
    create: {
      email: 'admin@tashnaeyewear.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  console.log('Admin user created:', admin.email);

  // Create sample customer
  const customerPassword = await hash('Customer@123', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      name: 'Test Customer',
      role: 'CUSTOMER',
      phone: '+923001234567',
      emailVerified: new Date(),
    },
  });

  console.log('Customer user created:', customer.email);

  // Create sample products
  const sunglassesCategory = categories.find(c => c.slug === 'sunglasses');
  const framesCategory = categories.find(c => c.slug === 'frames');

  if (sunglassesCategory) {
    const product1 = await prisma.product.create({
      data: {
        name: 'Classic Aviator Sunglasses',
        slug: 'classic-aviator-sunglasses',
        description: 'Timeless aviator style sunglasses with UV protection. Perfect for any occasion.',
        shortDescription: 'Classic aviator style with UV protection',
        basePrice: 2999,
        categoryId: sunglassesCategory.id,
        isFeatured: true,
        isNew: true,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
              altText: 'Classic Aviator Sunglasses',
              order: 0,
            },
          ],
        },
        variants: {
          create: [
            {
              sku: 'AVT-001-BLK-M',
              color: 'Black',
              size: 'Medium',
              material: 'Metal',
              priceDifference: 0,
              stockQuantity: 50,
            },
            {
              sku: 'AVT-001-GLD-M',
              color: 'Gold',
              size: 'Medium',
              material: 'Metal',
              priceDifference: 500,
              stockQuantity: 30,
            },
          ],
        },
      },
    });

    console.log('Sample product created:', product1.name);
  }

  if (framesCategory) {
    const product2 = await prisma.product.create({
      data: {
        name: 'Modern Square Frames',
        slug: 'modern-square-frames',
        description: 'Contemporary square frames suitable for any face shape. Lightweight and durable.',
        shortDescription: 'Modern square design, lightweight',
        basePrice: 1999,
        categoryId: framesCategory.id,
        isFeatured: true,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371',
              altText: 'Modern Square Frames',
              order: 0,
            },
          ],
        },
        variants: {
          create: [
            {
              sku: 'SQR-001-BLK-M',
              color: 'Black',
              size: 'Medium',
              material: 'Acetate',
              priceDifference: 0,
              stockQuantity: 40,
            },
            {
              sku: 'SQR-001-TRT-M',
              color: 'Tortoise',
              size: 'Medium',
              material: 'Acetate',
              priceDifference: 0,
              stockQuantity: 25,
            },
          ],
        },
      },
    });

    console.log('Sample product created:', product2.name);
  }

  console.log('Database seeding completed!');
  console.log('\nDefault credentials:');
  console.log('Admin - Email: admin@tashnaeyewear.com, Password: Admin@123');
  console.log('Customer - Email: customer@example.com, Password: Customer@123');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
