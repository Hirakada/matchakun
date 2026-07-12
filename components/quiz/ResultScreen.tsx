"use client";

import { motion } from "framer-motion";

import Button from "@/components/ui/Button";

import {
  formatRupiah,
  getMatchaProductById,
} from "@/data/matchaMenu";

import { useQuiz } from "./QuizProvider";

export default function ResultScreen() {
  const {
    resultId,
    restart,
  } = useQuiz();

  if (!resultId) return null;

  const product = getMatchaProductById(resultId);

  if (!product) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: .92,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: .45,
      }}
      className="
        min-h-[calc(100dvh-2.5rem)]
        flex
        items-center
        justify-center
        px-4
        py-4
        w-full
      "
    >
      <div
        className="
          flex
          flex-col
          justify-between
          rounded-[32px]
          border
          border-brand-200
          bg-white
          p-4
          sm:p-5
          shadow-xl
          w-full
          max-w-3xl
        "
      >
        <div className="text-center">

          <motion.img
            src={product.base.image}
            alt={product.name}
            initial={{
              y: 24,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: .15,
            }}
            className="
              mx-auto
              h-28
              w-auto
              md:h-36
            "
          />

          <span
            className="
              mt-3
              inline-flex
              rounded-full
              bg-brand-100
              px-3
              py-1.5
              text-xs
              font-medium
              text-brand-700
            "
          >
            YOUR MATCHA
          </span>

          <h1
            className="
              mt-3
              text-h2
              md:text-h1
              font-heading
              text-neutral-black
            "
          >
            {product.name}
          </h1>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-body
              text-neutral-500
            "
          >
            {product.base.description}
          </p>

        </div>

        <div
          className="
            mt-5
            grid
            gap-3
            md:grid-cols-3
          "
        >
          <StatCard
            title="Powder"
            value={product.powder.name}
          />

          <StatCard
            title="Style"
            value={product.base.name}
          />

          <StatCard
            title="Price"
            value={formatRupiah(product.price)}
          />
        </div>

        <div
          className="
            mt-4
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
          "
        >
          <Button
            href="/order"
            className="flex-1"
          >
            Order Now
          </Button>

          <Button
            variant="default"
            onClick={restart}
            className="flex-1"
          >
            Play Again
          </Button>
        </div>

      </div>
    </motion.div>
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
        rounded-2xl
        bg-brand-50
        p-3
        text-center
      "
    >
      <p
        className="
          text-sm
          text-neutral-500
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-1
          text-h4
          font-heading
          text-neutral-black
        "
      >
        {value}
      </h3>
    </div>
  );
}