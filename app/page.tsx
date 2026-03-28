export default function Home() {
  return (
    <section className="bg-cream-100">
      <div className="max-w-container mx-auto px-6 md:px-12 py-24 md:py-32">
        <h1 className="text-h1 font-heading font-semibold text-neutral-black max-w-2xl leading-tight">
          Modern Matcha for Everyday Energy 🍵
        </h1>

        <p className="text-body font-sans text-neutral-300 mt-6 max-w-xl">
          Clean, smooth, and crafted from high-quality matcha.
          Designed for focus, calm, and daily rituals.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="px-6 py-3 bg-brand-500 text-white text-button font-medium rounded-full shadow-sm hover:bg-brand-700 hover:shadow-lg transition">
            Order Now
          </button>

          <button className="px-6 py-3 border border-neutral-200 text-neutral-black text-button font-medium rounded-full hover:bg-neutral-100 transition">
            View Menu
          </button>
        </div>
      </div>
    </section>
  );
}