"use client";

import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import CartItem from "./CartItem";
import CustomerForm from "./CustomerForm";

import {
  getMatchaProduct,
  formatRupiah,
} from "@/data/matchaMenu";

import { CartItem as CartType } from "./types";

type Props = {
  cart: CartType[];
  total: number;

  name: string;
  notes: string;

  onNameChange: (value: string) => void;
  onNotesChange: (value: string) => void;

  onIncrease: (index: number) => void;
  onDecrease: (index: number) => void;
  onRemove: (index: number) => void;

  onCheckout: () => void;
};

export default function OrderSummary({
  cart,
  total,

  name,
  notes,

  onNameChange,
  onNotesChange,

  onIncrease,
  onDecrease,
  onRemove,

  onCheckout,
}: Props) {
  return (
    <aside
      className="
        h-full
        overflow-y-auto
        scrollbar-brand

        bg-neutral-white
        rounded-3xl
        border
        border-neutral-100
        shadow-sm
      "
    >
      <div className="p-6">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-h3 font-heading">
              Your Order
            </h2>

            <p className="text-body-sm text-neutral-400 mt-1">
              {cart.length} Item{cart.length !== 1 ? "s" : ""}
            </p>

          </div>

          <div
            className="
              w-14
              h-14

              rounded-2xl

              bg-brand-500/10

              flex
              items-center
              justify-center
            "
          >
            <ShoppingBag className="w-7 h-7 text-brand-500" />
          </div>

        </div>

        {/* PRODUCT LIST */}

        <div className="mt-8">

          {cart.length === 0 ? (

            <div
              className="
                py-20

                flex
                flex-col
                items-center
                justify-center

                text-center
              "
            >

              <ShoppingBag className="w-14 h-14 text-neutral-300" />

              <h3 className="font-heading text-h4 mt-5">
                Cart is Empty
              </h3>

              <p className="text-body text-neutral-400 mt-2 max-w-xs">
                Add your favorite matcha to start ordering.
              </p>

            </div>

          ) : (

            <AnimatePresence>

              <div className="space-y-4">

                {cart.map((item, index) => {

                  const product = getMatchaProduct(
                    item.powder,
                    item.base
                  )!;

                  return (

                    <motion.div
                      key={`${item.powder}-${item.base}`}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.2 }}
                    >

                      <CartItem
                        product={product}
                        qty={item.qty}

                        onIncrease={() =>
                          onIncrease(index)
                        }

                        onDecrease={() =>
                          onDecrease(index)
                        }

                        onRemove={() =>
                          onRemove(index)
                        }
                      />

                    </motion.div>

                  );

                })}

              </div>

            </AnimatePresence>

          )}

        </div>

        {/* TOTAL */}

        <div className="border-t border-neutral-100 mt-8 pt-8">

          <div className="flex items-center justify-between">

            <span className="font-heading text-h5">
              Total
            </span>

            <span className="text-h3 font-bold text-brand-500">
              {formatRupiah(total)}
            </span>

          </div>

        </div>

        {/* CUSTOMER */}

        <div className="mt-8">

          <CustomerForm
            name={name}
            notes={notes}

            onNameChange={onNameChange}
            onNotesChange={onNotesChange}

            onCheckout={onCheckout}
          />

        </div>

      </div>
    </aside>
  );
}