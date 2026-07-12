"use client";

import {
  Minus,
  Plus,
  Trash2,
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
  onRemove: () => void;
};

export default function CartItem({
  product,
  qty,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  const subtotal = product.price * qty;

  return (
    <div
      className="
        rounded-3xl
        border
        border-neutral-100
        bg-neutral-white
        p-5
        transition-all
        duration-200
        hover:border-brand-300
        hover:shadow-md
      "
    >
      {/* Product */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">

          <h3 className="font-heading text-h5">
            {product.name}
          </h3>

          <p className="text-body-sm text-neutral-400 mt-1">
            {formatRupiah(product.price)} / cup
          </p>

        </div>

        <button
          onClick={onRemove}
          className="
            w-10
            h-10
            rounded-xl
            flex
            items-center
            justify-center
            hover:bg-red-50
            transition
          "
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>

      </div>

      {/* Bottom */}

      <div className="flex items-center justify-between mt-5">

        {/* Qty */}

        <div
          className="
            flex
            items-center
            rounded-2xl
            border
            border-neutral-200
            overflow-hidden
          "
        >

          <button
            onClick={onDecrease}
            className="
              w-10
              h-10
              flex
              items-center
              justify-center
              hover:bg-neutral-100
              transition
            "
          >
            <Minus className="w-4 h-4" />
          </button>

          <div
            className="
              w-12
              text-center
              font-semibold
            "
          >
            {qty}
          </div>

          <button
            onClick={onIncrease}
            className="
              w-10
              h-10
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

        {/* Price */}

        <div className="text-right">

          <p className="text-body-sm text-neutral-400">
            Subtotal
          </p>

          <h3 className="text-h5 font-semibold text-brand-500">
            {formatRupiah(subtotal)}
          </h3>

        </div>

      </div>
    </div>
  );
}