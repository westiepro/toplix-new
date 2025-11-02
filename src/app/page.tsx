import { Navbar } from "@/components/Navbar";
import { HeroSearch } from "@/components/HeroSearch";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* Hero Section with Background Image */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-garden-villa.jpg"
            alt="Luxury Algarve villa with infinity pool and ocean view"
            fill
            className="object-cover brightness-[0.75]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-4">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              Find Your Dream Home in the Algarve
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-lg">
              Discover beautiful properties with stunning gardens
            </p>
          </div>
          <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            <HeroSearch />
            <p className="text-center text-white/70 text-sm mt-3 flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Try searching "Lagos", "Faro", or "Albufeira"
            </p>
          </div>
          <div className="flex gap-6 text-base text-white/80 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <span className="cursor-pointer hover:text-white transition-colors font-medium">Buy</span>
            <span className="cursor-pointer hover:text-white transition-colors font-medium">Rent</span>
            <span className="cursor-pointer hover:text-white transition-colors font-medium">Sell</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#198754] text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Premium Properties</h3>
              <p className="text-muted-foreground">
                Handpicked villas, apartments, and traditional homes throughout Portugal
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#198754] text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Interactive Maps</h3>
              <p className="text-muted-foreground">
                Explore properties with our advanced map search and filtering tools
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#198754] text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Expert Agents</h3>
              <p className="text-muted-foreground">
                Work with experienced local agents who know the market inside out
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
