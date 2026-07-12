"use client";

import { ShoppingBag, Package } from "lucide-react";
import Button from "@/components/ui/Button";
import { MobileStep } from "./types";

const steps: MobileStep[] = [
  "menu",
  "checkout",
];

const labels = {
  menu: "Choose Matcha",
  checkout: "Confirm Order",
};

const icons = {
  menu: Package,
  checkout: ShoppingBag,
};

type Props = {
  current: MobileStep;
  onBack: () => void;
  onNext: () => void;
};

export default function MobileStepper({
  current,
  onBack,
  onNext,
}: Props) {
  const index = steps.indexOf(current);
  const Icon = icons[current];

  return (
    <div className="lg:hidden">

      {/* Progress */}

      <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-white">

        <div className="h-1 bg-neutral-100">

          <div
            className="h-full bg-brand-500 transition-all"
            style={{
              width: `${((index + 1) / steps.length) * 100}%`,
            }}
          />

        </div>

        <div className="px-5 py-4 flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-brand-500"/>
          </div>

          <div>

            <p className="text-body-sm text-neutral-400">
              Step {index + 1} of {steps.length}
            </p>

            <h2 className="font-heading text-h4">
              {labels[current]}
            </h2>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="fixed z-50 bottom-0 left-0 right-0 bg-neutral-white border-t border-neutral-100 p-4 flex gap-3">

        {current === "checkout" && (
          <Button
            variant="default"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
        )}

        <Button
          variant="cta"
          onClick={onNext}
          className="flex-1"
        >
          {current === "menu"
            ? "Review Order"
            : "Checkout"}
        </Button>

      </div>

    </div>
  );
}