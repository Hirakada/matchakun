"use client";

import {
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import Button from "@/components/ui/Button";
import {
  MatchaProduct,
  formatRupiah,
} from "@/data/matchaMenu";

type Props = {
  product: MatchaProduct;
  qty: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onAdd: () => void;
};

export default function ProductSummary({
  product,
  qty,
  onIncrease,
  onDecrease,
  onAdd,
}: Props) {
  return (
    <section className="bg-neutral-white rounded-3xl border border-neutral-100 shadow-sm p-6">

      <p className="text-body-sm text-brand-500 font-medium">
        Step 3
      </p>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mt-2">

        {/* Product */}

        <div>

          <h2 className="text-h3 font-heading">
            {product.name}
          </h2>

          <p className="text-body text-neutral-400 mt-2">
            {product.powder.name} • {product.base.name}
          </p>

          <p className="text-h4 font-semibold text-brand-500 mt-4">
            {formatRupiah(product.price)}
          </p>

        </div>

        {/* Qty */}

        <div className="flex items-center gap-4">

          <div className="flex items-center rounded-2xl border border-neutral-200 overflow-hidden">

            <button
              onClick={onDecrease}
              className="
                w-12
                h-12
                flex
                items-center
                justify-center
                hover:bg-neutral-100
                transition
              "
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="w-14 text-center font-semibold">
              {qty}
            </div>

            <button
              onClick={onIncrease}
              className="
                w-12
                h-12
                flex
                items-center
                justify-center
                hover:bg-neutral-100
                transition
              "
            >
              <Plus className="w-4 h-4" />
            </button>

          </div>

          <Button
            variant="cta"
            onClick={onAdd}
            className="
              h-12
              px-6
              rounded-2xl
              flex
              items-center
              gap-2
            "
          >
            <ShoppingCart className="w-5 h-5" />

            <span>Add</span>

          </Button>

        </div>

      </div>

    </section>
  );
}