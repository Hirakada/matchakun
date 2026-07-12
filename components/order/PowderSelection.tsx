"use client";

import { CheckCircle2 } from "lucide-react";
import { matchaPowders, MatchaPowder, formatRupiah } from "@/data/matchaMenu";

type Props = {
  selected: MatchaPowder["id"];
  onSelect: (id: MatchaPowder["id"]) => void;
};

export default function PowderSelector({
  selected,
  onSelect,
}: Props) {
  return (
    <section className="bg-neutral-white rounded-3xl border border-neutral-100 shadow-sm p-6">

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-body-sm text-brand-500 font-medium">
            Step 1
          </p>

          <h2 className="text-h4 font-heading">
            Choose Powder
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {matchaPowders.map((powder) => {

          const active = selected === powder.id;

          return (

            <button
              key={powder.id}
              onClick={() => onSelect(powder.id)}
              className={`
                relative
                rounded-3xl
                border
                p-5
                text-left
                transition-all
                duration-200
                group

                ${
                  active
                    ? "border-brand-500 bg-brand-500 text-white shadow-lg scale-[1.02]"
                    : "border-neutral-200 bg-white hover:border-brand-300 hover:shadow-md"
                }
              `}
            >

              {active && (
                <CheckCircle2
                  className="absolute right-4 top-4 w-5 h-5"
                />
              )}

              <div className="space-y-4">

                <div>

                  <h3 className="font-heading text-h4">
                    {powder.name}
                  </h3>

                  <p
                    className={`
                      text-body-sm mt-2
                      ${
                        active
                          ? "text-white/80"
                          : "text-neutral-400"
                      }
                    `}
                  >
                    {powder.description}
                  </p>

                </div>

                <div className="flex flex-wrap gap-2">

                  {powder.notes.map((note) => (

                    <span
                      key={note}
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs

                        ${
                          active
                            ? "bg-white/20"
                            : "bg-neutral-100"
                        }
                      `}
                    >
                      {note}
                    </span>

                  ))}

                </div>

                <div
                  className={`
                    text-h5
                    font-semibold

                    ${
                      active
                        ? "text-white"
                        : "text-brand-500"
                    }
                  `}
                >
                  + {formatRupiah(powder.price)}
                </div>

              </div>

            </button>

          );

        })}

      </div>

    </section>
  );
}