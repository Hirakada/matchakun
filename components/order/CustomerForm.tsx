"use client";

import {
  User,
  NotebookPen,
  ArrowRight,
} from "lucide-react";

import Button from "@/components/ui/Button";

type Props = {
  name: string;
  notes: string;

  onNameChange: (value: string) => void;
  onNotesChange: (value: string) => void;

  onCheckout: () => void;
};

export default function CustomerForm({
  name,
  notes,
  onNameChange,
  onNotesChange,
  onCheckout,
}: Props) {
  return (
    <div className="space-y-5">

      {/* Heading */}

      <div>

        <h3 className="font-heading text-h4">
          Customer Information
        </h3>

        <p className="text-body-sm text-neutral-400 mt-1">
          Your order will be sent via WhatsApp.
        </p>

      </div>

      {/* Name */}

      <div
        className="
          rounded-2xl
          border
          border-neutral-200
          bg-neutral-50

          flex
          items-center
          gap-3

          px-4
          py-3

          transition

          focus-within:border-brand-500
          focus-within:bg-white
        "
      >

        <User
          className="
            w-5
            h-5
            text-neutral-400
          "
        />

        <input
          type="text"
          value={name}
          onChange={(e) =>
            onNameChange(e.target.value)
          }
          placeholder="Your Name"
          className="
            flex-1

            bg-transparent

            outline-none

            text-body
          "
        />

      </div>

      {/* Notes */}

      <div
        className="
          rounded-2xl
          border
          border-neutral-200
          bg-neutral-50

          transition

          focus-within:border-brand-500
          focus-within:bg-white
        "
      >

        <div
          className="
            flex
            items-center
            gap-2

            px-4
            pt-4
          "
        >

          <NotebookPen
            className="
              w-5
              h-5
              text-neutral-400
            "
          />

          <span
            className="
              text-body-sm
              text-neutral-400
            "
          >
            Additional Notes
          </span>

        </div>

        <textarea
          rows={4}
          value={notes}
          onChange={(e) =>
            onNotesChange(e.target.value)
          }
          placeholder="Less sugar, no ice, etc."
          className="
            w-full

            px-4
            pb-4

            bg-transparent

            resize-none

            outline-none
          "
        />

      </div>

      {/* CTA */}

      <Button
        variant="cta"
        onClick={onCheckout}
        className="
          w-full
          h-14

          rounded-2xl

          flex
          items-center
          justify-center
          gap-3
        "
      >

        <span>
          Continue
        </span>

        <ArrowRight
          className="
            w-5
            h-5
          "
        />

      </Button>

    </div>
  );
}