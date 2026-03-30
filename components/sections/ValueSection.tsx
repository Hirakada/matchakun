export default function ValueSecti() {
  return (
    <section className="bg-neutral-100 py-24">
      <div className="max-w-container mx-auto px-6 lg:px-12">
        <h2 className="font-heading text-h2 text-center mb-16">
          Matcha Kun ꨄ︎
        </h2>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="text-center space-y-4 p-6 rounded-2xl bg-white hover:shadow-lg transition">
            <div className="bg-brand-300 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              🌿
            </div>
            <h3 className="font-heading text-h3">Ceremonial Quality</h3>
            <p className="text-body opacity-80">
              Authentic ceremonial-grade matcha with rich flavor and smooth finish.
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-2xl bg-white hover:shadow-lg transition">
            <div className="bg-brand-300 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              ⚡
            </div>
            <h3 className="font-heading text-h3">Clean Energy</h3>
            <p className="text-body opacity-80">
              Sustained energy without crash, powered by natural L-theanine.
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-2xl bg-white hover:shadow-lg transition">
            <div className="bg-brand-300 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              💚
            </div>
            <h3 className="font-heading text-h3">Modern Lifestyle</h3>
            <p className="text-body opacity-80">
              Designed for creators, thinkers, and everyday productivity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}