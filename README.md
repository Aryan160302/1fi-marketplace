# 1Fi Marketplace

A fully-built **1Fi Marketplace** section added to the Shop page of the 1Fi app (SDE Intern take-home assignment). Built as a mobile-viewport-constrained Next.js web app so it reads like a phone screen, matching the existing 1Fi design language (violet/purple accents, soft rounded cards, gradient banners, bottom tab navigation).

The Shop page has three tabs — **Top Brands** and **Nearby Stores** are left as blank stubs per the assignment spec, and **1Fi Marketplace** is fully implemented: a product grid, a product detail page with variant selection and a selectable EMI plan ladder, and a confirmation step.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** — design tokens defined in `tailwind.config.ts` (colors, radius, shadows, font), wired in via the `@config` directive
- **Prisma ORM** + **PostgreSQL** for storage
- **lucide-react** for icons, **Plus Jakarta Sans** (via `next/font/google`) for type
- Plain Next.js **Route Handlers** as the backend (no separate server)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Postgres

Point `DATABASE_URL` at any Postgres instance — a local install or a hosted one like [Neon](https://neon.tech). Copy the example env file and fill it in:

```bash
cp .env.example .env
```

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
```

### 3. Run migrations and seed data

```bash
npm run db:migrate   # applies prisma/migrations, generates the Prisma Client
npm run db:seed      # seeds iPhone 17 Pro, Galaxy S24 Ultra, MacBook Air
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/home`. Use the bottom nav to get to **Shop → 1Fi Marketplace**.

Other useful scripts: `npm run build` (production build), `npm run lint`, `npm run db:studio` (Prisma Studio GUI on the DB).

## Project structure

```
prisma/
  schema.prisma          Product / Variant / EmiPlan models
  seed.ts                Seed script (3 products, variants, EMI ladders)
src/
  app/
    api/products/route.ts             GET /api/products
    api/products/[slug]/route.ts      GET /api/products/[slug]
    shop/page.tsx                     Shop page (banner + 3-way toggle)
    products/[slug]/page.tsx          Product detail route
    home|emi-dues|limit|profile/      Static stub screens (bottom nav destinations)
    layout.tsx                        Root layout: font + MobileShell wrapper
  components/
    layout/       BottomNav, MobileShell (phone-width frame)
    shop/         ShopBanner, SegmentedToggle, SearchBar, ProductCard, ProductGrid, StubTab
    product/      VariantSelector, EmiPlanCard, ProceedBar, ConfirmModal, ProductDetailScreen
    ui/           SectionHeader, PillButton, Skeleton, EmptyState, ErrorState
  hooks/useFetch.ts        Small fetch hook exposing loading/error/success state + refetch
  lib/prisma.ts, types.ts  Prisma client singleton + shared API types
```

Every screen under the Marketplace flow is client-rendered and fetches from the API routes with explicit loading (skeletons), error (retry button), and empty states — there is no hardcoded product or EMI data in any component.

## API endpoints

### `GET /api/products`

Returns the fields the Marketplace grid needs: id, slug, name, image, and starting price.

```json
[
  {
    "id": "cmtpkfi2g00008zq8377t4548",
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "imageUrl": "/products/iphone-17-pro.svg",
    "price": 134900
  },
  {
    "id": "cmtpkfi2y000d8zq8ogix6nqv",
    "slug": "samsung-galaxy-s24-ultra",
    "name": "Samsung Galaxy S24 Ultra",
    "imageUrl": "/products/galaxy-s24-ultra.svg",
    "price": 129999
  }
]
```

### `GET /api/products/[slug]`

Full product detail: variants and the EMI plan ladder, used by the product page.

```json
{
  "id": "cmtpkfi33000r8zq8d3gs601j",
  "slug": "macbook-air",
  "name": "MacBook Air",
  "category": "Laptops",
  "mrp": 124900,
  "price": 114900,
  "imageUrl": "/products/macbook-air.svg",
  "variants": [
    { "id": "...", "type": "storage", "label": "256GB SSD", "priceDelta": 0 },
    { "id": "...", "type": "storage", "label": "512GB SSD", "priceDelta": 15000 },
    { "id": "...", "type": "color", "label": "Midnight", "priceDelta": 0 }
  ],
  "emiPlans": [
    {
      "id": "...",
      "monthlyAmount": 38300,
      "tenureMonths": 3,
      "interestRate": 0,
      "cashbackAmount": null
    },
    {
      "id": "...",
      "monthlyAmount": 5329,
      "tenureMonths": 24,
      "interestRate": 10.5,
      "cashbackAmount": 3000
    }
  ]
}
```

Returns `404 { "error": "Product not found" }` for an unknown slug, and `500 { "error": "..." }` on an unexpected failure — both are surfaced in the UI via the shared `ErrorState` component.

## Data model (Prisma)

```prisma
model Product {
  id        String   @id @default(cuid())
  slug      String   @unique
  name      String
  category  String
  mrp       Int
  price     Int
  imageUrl  String
  createdAt DateTime @default(now())

  variants Variant[]
  emiPlans EmiPlan[]
}

model Variant {
  id         String @id @default(cuid())
  productId  String
  type       String // "storage" | "color"
  label      String
  priceDelta Int    @default(0)

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model EmiPlan {
  id             String  @id @default(cuid())
  productId      String
  monthlyAmount  Int
  tenureMonths   Int
  interestRate   Float
  cashbackAmount Int?

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}
```

**One deliberate addition beyond the spec:** `Variant.priceDelta`. The brief asks for price to "update when variant changes," but the base schema only carries a single `price` on `Product`. Rather than hardcoding a markup in the UI, each variant carries the amount it adds to the base price (e.g. a 512GB storage option might add ₹15,000; color options add ₹0) — so the displayed price is still 100% API-driven, just computed from `product.price + Σ(priceDelta of selected variants)` on the client.

## Design tokens

`tailwind.config.ts` extends the theme with values sampled directly from the reference 1Fi screenshots (`ref/`): a `brand` violet scale (`#7C3AED`/`#6D28D9`), the indigo→violet diagonal `banner` gradient stops, the `success` emerald used for badges, `surface.bg`/`surface.card` for the off-white background vs. white cards, and `card`/`pill` radii with matching soft shadows. Every component pulls from these tokens rather than one-off hex values.

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Add a `DATABASE_URL` environment variable pointing at a Postgres instance (e.g. a free [Neon](https://neon.tech) database).
3. `npm install` triggers `postinstall` → `prisma generate`, and `next build` runs as normal.
4. Run migrations against the production database once (locally, with `DATABASE_URL` pointed at prod): `npx prisma migrate deploy`, then `npm run db:seed`.
