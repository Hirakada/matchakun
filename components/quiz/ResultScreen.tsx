"use client";

import { motion } from "framer-motion";

import Button from "@/components/ui/Button";
import { formatRupiah, getMatchaProductById } from "@/data/matchaMenu";
import { getQuestResult } from "@/lib/questResult";
import { useQuiz } from "./QuizProvider";

type ResultHeaderProps = {
  product: NonNullable<ReturnType<typeof getMatchaProductById>>;
  result: ReturnType<typeof getQuestResult>;
};

function ResultHeader({
  product,
  result,
}: ResultHeaderProps) {
  return (
    <header className="shrink-0 border-b border-brand-100 bg-white/95 px-5 py-5 sm:px-6">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
        {/* Image */}
        <div className="flex items-center justify-center self-stretch">
          <motion.img
            src={product.base.image}
            alt={product.name}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="h-40 w-auto object-contain sm:h-44 lg:h-52"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <span className="inline-flex w-fit items-center justify-center self-center rounded-full bg-brand-100 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-brand-700 lg:self-start">
            {result.badge}
          </span>

          <h1 className="mt-3 text-h3 font-heading leading-tight text-neutral-black lg:text-h2">
            {result.title}
          </h1>

          <p className="mt-2 text-body font-medium text-brand-700">{result.headline}</p>

          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">{result.description}</p>
        </div>
      </div>
    </header>
  );
}

export default function ResultScreen() {
  const { recommendation, restart } = useQuiz();

  if (!recommendation) {
    return null;
  }

  const result = getQuestResult(recommendation);
  const product = getMatchaProductById(recommendation.id);

  if (!product) {
    return null;
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex min-h-screen items-center justify-center overflow-hidden px-4 py-4 sm:px-6 sm:py-6"
    >
      <div className="flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-[32px] border border-brand-200 bg-white shadow-xl">
        <div className="hidden lg:block">
          <ResultHeader product={product} result={result} />
        </div>

        {/* ---------------- Scrollable Content ---------------- */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 scrollbar-thin scrollbar-thumb-brand-300 scrollbar-track-transparent sm:px-6 sm:py-6">
          <div className="lg:hidden mb-6">
            <ResultHeader product={product} result={result} />
          </div>

          <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Match Confidence</p>

              <h2 className="mt-2 text-h1 font-heading text-brand-700">{recommendation.confidence}%</h2>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Tingkat kecocokan rekomendasi berdasarkan jawaban yang kamu berikan selama Matcha Quest.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-200 bg-white p-4">
              <h2 className="text-h3 font-heading text-neutral-black">Mengapa kami memilih menu ini?</h2>

              <p className="mt-2 text-sm text-neutral-500">
                Berikut alasan mengapa rekomendasi ini paling sesuai dengan preferensimu.
              </p>

              <div className="mt-4 space-y-3">
                {result.reasons.map((reason) => (
                  <div key={reason} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 font-semibold text-white">
                      ✓
                    </div>

                    <p className="leading-7 text-neutral-700">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Detail Menu</p>

                <h2 className="mt-1 text-h3 font-heading text-neutral-black">Tentang Rekomendasimu</h2>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard title="Powder" value={product.powder.name} />
              <StatCard title="Style" value={product.base.name} />
              <StatCard title="Harga" value={formatRupiah(product.price)} />
              <StatCard title="Confidence" value={`${recommendation.confidence}%`} />
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-brand-200 bg-brand-50 p-4 sm:p-5">
            <h2 className="text-h3 font-heading text-neutral-black">Tips Menikmati</h2>

            <p className="mt-2 text-sm text-neutral-500">Agar pengalaman menikmati Matcha semakin maksimal.</p>

            <div className="mt-4 space-y-3">
              {result.tips.map((tip) => (
                <div key={tip} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-white text-lg shadow-sm">💡</div>

                  <p className="leading-7 text-neutral-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- Footer CTA ---------------- */}
        <footer className="shrink-0 border-t border-brand-100 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            href={`/order?powder=${recommendation.powder}&brew=${recommendation.brew}`}
            className="flex-1"
          >
            Order Sekarang
          </Button>            
          <Button variant="default" onClick={restart} className="flex-1">
            Ulangi Matcha Quest
          </Button>
          </div>
        </footer>
      </div>
    </motion.main>
  );
}

interface StatCardProps {
  title: string;
  value: string;
}

function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div
      className="
        flex
        flex-col
        rounded-2xl
        border
        border-brand-100
        bg-white
        px-5
        py-4
        transition-all
        duration-300
        hover:border-brand-300
        hover:shadow-sm
      "
    >
      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-[0.16em]
          text-neutral-500
        "
      >
        {title}
      </p>

      <h3
        className="
          text-h4
          font-heading
          leading-tight
          text-neutral-black
          break-words
        "
      >
        {value}
      </h3>
    </div>
  );
}