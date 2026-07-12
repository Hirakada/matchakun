"use client";

import { useMemo, useState } from "react";

import {
  getMatchaProduct,
  formatRupiah,
  MatchaBase,
  MatchaPowder,
} from "@/data/matchaMenu";

import PowderSelector from "@/components/order/PowderSelection";
import BrewSelector from "@/components/order/BrewSelection";
import ProductSummary from "@/components/order/ProductSummary";
import OrderSummary from "@/components/order/OrderSummary";
import MobileStepper from "@/components/order/MobileStepper";

import {
  CartItem,
  MobileStep,
} from "@/components/order/types";

export default function OrderPage() {

  // ==========================
  // MOBILE STEP
  // ==========================

  const [mobileStep, setMobileStep] =
    useState<MobileStep>("menu");

  const mobileSteps: MobileStep[] = [
    "menu",
    "checkout",
  ];

  const nextStep = () => {
    if (mobileStep === "menu") {
      setMobileStep("checkout");
    }
  };

  const prevStep = () => {
    if (mobileStep === "checkout") {
      setMobileStep("menu");
    }
  };

  // ==========================
  // PRODUCT
  // ==========================

  const [selectedPowder, setSelectedPowder] =
    useState<MatchaPowder["id"]>("kaze");

  const [selectedBase, setSelectedBase] =
    useState<MatchaBase["id"]>("latte");

  const [qty, setQty] = useState(1);

  const currentProduct = useMemo(() => {

    return getMatchaProduct(
      selectedPowder,
      selectedBase
    )!;

  }, [selectedPowder, selectedBase]);

  // ==========================
  // CUSTOMER
  // ==========================

  const [name, setName] = useState("");

  const [notes, setNotes] = useState("");

  // ==========================
  // CART
  // ==========================

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = () => {

    setCart((prev) => {

      const existing = prev.findIndex(
        (item) =>
          item.powder === selectedPowder &&
          item.base === selectedBase
      );

      if (existing >= 0) {

        const copy = [...prev];

        copy[existing].qty += qty;

        return copy;
      }

      return [
        ...prev,
        {
          powder: selectedPowder,
          base: selectedBase,
          qty,
        },
      ];
    });

    setQty(1);
  };

  const increaseQty = (index: number) => {

    setCart((prev) => {

      const copy = [...prev];

      copy[index].qty++;

      return copy;

    });

  };

  const decreaseQty = (index: number) => {

    setCart((prev) => {

      const copy = [...prev];

      if (copy[index].qty > 1) {

        copy[index].qty--;

      }

      return copy;

    });

  };

  const removeItem = (index: number) => {

    setCart((prev) =>
      prev.filter((_, i) => i !== index)
    );

  };

  // ==========================
  // TOTAL
  // ==========================

  const total = useMemo(() => {

    return cart.reduce((sum, item) => {

      const product = getMatchaProduct(
        item.powder,
        item.base
      )!;

      return sum + product.price * item.qty;

    }, 0);

  }, [cart]);

  // ==========================
  // WHATSAPP
  // ==========================

  const checkout = () => {

    if (!name.trim()) {

      alert("Please enter your name.");

      return;

    }

    if (!cart.length) {

      alert("Your cart is empty.");

      return;

    }

    const items = cart
      .map((item) => {

        const product = getMatchaProduct(
          item.powder,
          item.base
        )!;

        return `${item.qty} × ${product.name}
${formatRupiah(product.price * item.qty)}`;

      })
      .join("\n\n");

    const message =
`MATCHA KUN ORDER

Customer : ${name}

------------------------------

${items}

------------------------------

Total : ${formatRupiah(total)}

Notes : ${notes || "-"}`;

    window.open(

      `https://wa.me/6282141914171?text=${encodeURIComponent(
        message
      )}`,

      "_blank"

    );

  };

  return (

    <main className="bg-linear-to-br from-cream-100 to-neutral-100 min-h-screen lg:min-h-dvh">

      <MobileStepper
        current={mobileStep}
        onBack={prevStep}
        onNext={nextStep}
      />

      <div
        className="
          max-w-7xl
          mx-auto

          lg:h-dvh

          px-3
          lg:px-6

          pt-16
          pb-24 lg:pb-4

          grid

          lg:grid-cols-[1fr_420px]

          gap-4
          text-sm
        "
      >
      {/* ===========================
    LEFT PANEL
=========================== */}

<section
  className="
    flex
    flex-col
    gap-4

    lg:overflow-y-auto

    pr-1
  "
>
  

  {/* ---------- Desktop ---------- */}

  <div className="hidden lg:flex flex-col gap-6">

    <PowderSelector
      selected={selectedPowder}
      onSelect={setSelectedPowder}
    />

    <BrewSelector
      selected={selectedBase}
      onSelect={setSelectedBase}
    />

    <ProductSummary
      product={currentProduct}
      qty={qty}
      onIncrease={() => setQty(qty + 1)}
      onDecrease={() =>
        setQty(Math.max(1, qty - 1))
      }
      onAdd={addToCart}
    />

  </div>

  {/* ---------- Mobile Wizard ---------- */}

  <div className="lg:hidden flex-1">
    {mobileStep === "menu" && (
      <div className="space-y-4">

        <PowderSelector
          selected={selectedPowder}
          onSelect={setSelectedPowder}
        />

        <BrewSelector
          selected={selectedBase}
          onSelect={setSelectedBase}
        />

        <ProductSummary
          product={currentProduct}
          qty={qty}
          onIncrease={() => setQty(qty + 1)}
          onDecrease={() => setQty(Math.max(1, qty - 1))}
          onAdd={addToCart}
        />

      </div>
    )}
  </div>

</section>

{/* ===========================
    RIGHT PANEL
=========================== */}

{/* ---------- Desktop ---------- */}

<div className="hidden lg:flex flex-col min-h-0">

  <OrderSummary
    cart={cart}
    total={total}

    name={name}
    notes={notes}

    onNameChange={setName}
    onNotesChange={setNotes}

    onIncrease={increaseQty}
    onDecrease={decreaseQty}
    onRemove={removeItem}

    onCheckout={checkout}
  />

</div>

{/* ---------- Mobile Checkout ---------- */}

{mobileStep === "checkout" && (

  <div className="lg:hidden">

    <OrderSummary
      cart={cart}
      total={total}

      name={name}
      notes={notes}

      onNameChange={setName}
      onNotesChange={setNotes}

      onIncrease={increaseQty}
      onDecrease={decreaseQty}
      onRemove={removeItem}

      onCheckout={checkout}
    />

  </div>

)}

      </div>
    </main>
  );
}