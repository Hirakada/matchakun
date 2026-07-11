"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import Button from "@/components/ui/Button";

import {
  matchaPowders,
  matchaMenu,
  getMatchaProduct,
  formatRupiah,
  MatchaBase,
  MatchaPowder,
} from "@/data/matchaMenu";

type CartItem = {
  powder: MatchaPowder["id"];
  base: MatchaBase["id"];
  qty: number;
};

export default function OrderPage() {
  const [selectedPowder, setSelectedPowder] = useState<MatchaPowder["id"]>("kaze");
  const [selectedBase, setSelectedBase] = useState<MatchaBase["id"]>("latte");
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const currentProduct = useMemo(
    () => getMatchaProduct(selectedPowder, selectedBase)!,
    [selectedPowder, selectedBase]
  );

  const total = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = getMatchaProduct(item.powder, item.base)!;
        return sum + product.price * item.qty;
      }, 0),
    [cart]
  );

  function addToCart() {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.powder === selectedPowder && item.base === selectedBase
      );

      if (existing) {
        return prev.map((item) =>
          item.powder === selectedPowder && item.base === selectedBase
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }

      return [
        ...prev,
        { powder: selectedPowder, base: selectedBase, qty },
      ];
    });

    setQty(1);
  }

  function updateQty(index: number, value: number) {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, qty: Math.max(1, value) } : item
      )
    );
  }

  function removeItem(index: number) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function sendWhatsapp() {
    if (!cart.length) {
      alert("Cart is empty.");
      return;
    }

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

const items = cart
  .map((item) => {
    const product = getMatchaProduct(item.powder, item.base)!;

    return `${item.qty} × ${product.name}
${formatRupiah(product.price * item.qty)}`;
  })
  .join("\n\n");

    const message = [
        `Customer : ${name}`,
        "------------------------------",
        items,
        "------------------------------",
        `Total    : ${formatRupiah(total)}`,
        `Notes    : ${notes || "-"}`,
    ].join("\n");

    window.open(
      `https://wa.me/6282141914171?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  return (
    <main className="bg-cream-100 min-h-[100dvh] lg:h-[100dvh] overflow-hidden">
      <div className="max-w-7xl mx-auto h-auto lg:h-full px-4 lg:px-8 pt-20 pb-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        <section className="flex flex-col gap-5 overflow-visible lg:overflow-y-auto min-h-0 pr-1">
          <div className="bg-neutral-white rounded-3xl border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-h4 font-heading">Choose Powder</h2>
              <span className="text-body-sm text-neutral-300">Step 1</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {matchaPowders.map((powder) => {
                const active = selectedPowder === powder.id;

                return (
                  <button
                    key={powder.id}
                    onClick={() => setSelectedPowder(powder.id)}
                    className={`rounded-2xl border p-5 transition-all duration-300 text-left ${
                      active
                        ? "bg-brand-500 border-brand-500 text-neutral-white shadow-lg scale-[1.02]"
                        : "bg-neutral-white border-neutral-200 hover:border-brand-300"
                    }`}
                  >
                    <h3 className="font-heading text-h5">{powder.name}</h3>
                    <p className={`mt-2 text-body-sm ${active ? "text-neutral-white/80" : "text-neutral-300"}`}>
                      {powder.description}
                    </p>
                    <div className="mt-5 font-semibold">{formatRupiah(powder.price)}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-neutral-white rounded-3xl border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-h4 font-heading">Choose Brewing</h2>
              <span className="text-body-sm text-neutral-300">Step 2</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {matchaMenu.map((base) => {
                const active = selectedBase === base.id;

                return (
                  <button
                    key={base.id}
                    onClick={() => setSelectedBase(base.id)}
                    className={`rounded-2xl border p-5 transition-all duration-300 ${
                      active
                        ? "border-brand-500 bg-brand-50 shadow-lg scale-[1.02]"
                        : "border-neutral-200 bg-neutral-white hover:border-brand-300"
                    }`}
                  >
                    <Image src={base.image} alt={base.name} width={64} height={64} className="mx-auto" />
                    <h3 className="mt-4 font-heading text-h5">{base.name}</h3>
                    <p className="text-body-sm text-neutral-300 mt-2 line-clamp-2">{base.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-neutral-white rounded-3xl border border-neutral-200 p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <Image
                src={currentProduct.base.image}
                alt={currentProduct.name}
                width={140}
                height={140}
                className="shrink-0"
              />

              <div className="flex-1">
                <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-body-sm text-brand-700">
                  {currentProduct.powder.name}
                </span>
                <h2 className="text-h3 font-heading mt-3">{currentProduct.name}</h2>
                <p className="text-body text-neutral-300 mt-2">{currentProduct.base.description}</p>
                <p className="text-h4 font-semibold text-brand-500 mt-5">{formatRupiah(currentProduct.price)}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
              <div className="flex items-center gap-3">
                <Button variant="default" onClick={() => setQty(Math.max(1, qty - 1))}>
                  −
                </Button>
                <span className="text-h4 font-semibold w-8 text-center">{qty}</span>
                <Button variant="default" onClick={() => setQty(qty + 1)}>
                  +
                </Button>
              </div>
              <Button variant="cta" onClick={addToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </section>

        <aside className="bg-neutral-white rounded-3xl p-6 shadow-sm border border-neutral-200 flex flex-col h-fit lg:h-full min-h-0">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-h3 font-heading">Your Order</h2>
            <span className="text-body-sm text-neutral-300">
              {cart.length} Item{cart.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-4">🍵</div>
                <h3 className="font-heading text-h4">Cart is Empty</h3>
                <p className="text-body text-neutral-300 mt-2">Add your favorite matcha to begin your order.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => {
                  const product = getMatchaProduct(item.powder, item.base)!;

                  return (
                    <div key={index} className="rounded-2xl border border-neutral-200 p-4">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-body-sm text-neutral-300 mt-1">{formatRupiah(product.price)}</p>
                        </div>
                        <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-600 text-sm">
                          Remove
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button variant="default" onClick={() => updateQty(index, item.qty - 1)}>
                            −
                          </Button>
                          <span className="w-8 text-center">{item.qty}</span>
                          <Button variant="default" onClick={() => updateQty(index, item.qty + 1)}>
                            +
                          </Button>
                        </div>
                        <div className="font-semibold text-brand-500">{formatRupiah(product.price * item.qty)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t border-neutral-200 pt-5 mt-5">
            <div className="flex justify-between items-center">
              <span className="font-heading text-h5">Total</span>
              <span className="text-h4 font-bold text-brand-500">{formatRupiah(total)}</span>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none focus:border-brand-500"
            />
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional Notes"
              className="w-full rounded-2xl border border-neutral-200 px-4 py-3 resize-none outline-none focus:border-brand-500"
            />
            <Button variant="cta" className="w-full" onClick={sendWhatsapp}>
              Order via WhatsApp
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}
