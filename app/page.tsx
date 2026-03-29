import Image from "next/image";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-brand-500 text-white h-screen flex items-center">
        <div className="max-w-container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="font-heading text-h1 leading-tight">
              Modern Matcha
              <br />
              <span className="text-brand-300">
                For Your Everyday Energy
              </span>
            </h1>

            <p className="text-body max-w-md mx-auto md:mx-0 opacity-90">
              Clean energy, smooth focus, and a refreshing taste.
              Discover your perfect matcha ritual with Matcha Kun.
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              <Button
                variant="cta"
                href="https://ig.me/m/matchakun.id"
              >
                Order Now
              </Button>

              <Button variant="default">
                Explore Menu
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-72 h-72 bg-brand-300 rounded-full blur-3xl opacity-30"></div>

            <Image
              src="/wordmark.svg"
              alt="Matcha Drink"
              width={400}
              height={400}
              className="relative z-10 transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>
      </section>

      {/* VPC */}
      <section className="bg-neutral-100 py-20">
        <div className="max-w-container mx-auto px-6 md:px-12">

          <h2 className="font-heading text-h2 text-center mb-12">
            Why Choose Matcha Kun?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="text-center space-y-3">
              <div className="bg-brand-300 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl">🌿</span>
              </div>

              <h3 className="font-heading text-h3">
                Premium Quality
              </h3>

              <p className="text-body opacity-80">
                We source only the finest matcha leaves for a smooth and vibrant taste.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-brand-300 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl">🌱</span>
              </div>

              <h3 className="font-heading text-h3">
                Sustainable Sourcing
              </h3>

              <p className="text-body opacity-80">
                Ethically sourced matcha that supports fair and sustainable practices.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-brand-300 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl">💚</span>
              </div>

              <h3 className="font-heading text-h3">
                Health Benefits
              </h3>

              <p className="text-body opacity-80">
                Rich in antioxidants and L-theanine for calm, focused energy.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20">
        <div className="max-w-container mx-auto px-6 md:px-12 text-center">

          <h2 className="font-heading text-h2 mb-6">
            Join the Matcha Movement
          </h2>

          <p className="text-body max-w-lg mx-auto opacity-80 mb-8">
            Follow us on Instagram for updates, recipes, and matcha inspiration.
          </p>

          <Button
            variant="cta"
            href="https://ig.me/m/matchakun.id"
          >
            Follow @matchakun.id
          </Button>

        </div>
      </section>
    </>
  );
}