"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import {
  matchaMenu,
  MatchaBase,
  formatRupiah,
} from "@/data/matchaMenu";

type Props = {
  selected: MatchaBase["id"];
  onSelect: (id: MatchaBase["id"]) => void;
};

export default function BrewSelector({
  selected,
  onSelect,
}: Props) {
  return (
    <section className="bg-neutral-white rounded-3xl border border-neutral-100 shadow-sm p-6">

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-body-sm text-brand-500 font-medium">
            Step 2
          </p>

          <h2 className="text-h4 font-heading">
            Choose Brewing
          </h2>
        </div>
      </div>

      <div className="space-y-4">

        {matchaMenu.map((base) => {

          const active = selected === base.id;

          return (

            <button
              key={base.id}
              onClick={() => onSelect(base.id)}
              className={`
                w-full
                rounded-3xl
                border
                p-4
                transition-all
                duration-200
                group

                ${
                  active
                    ? "border-brand-500 bg-brand-500 text-white shadow-lg"
                    : "border-neutral-200 bg-white hover:border-brand-300 hover:shadow-md"
                }
              `}
            >

              <div className="flex items-center gap-5">

                <div className="relative">

                  <Image
                    src={base.image}
                    alt={base.name}
                    width={72}
                    height={72}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    className="rounded-2xl"
                  />

                  {active && (
                    <CheckCircle2
                      className="
                        absolute
                        -top-2
                        -right-2
                        w-5
                        h-5
                        bg-white
                        rounded-full
                        text-brand-500
                      "
                    />
                  )}

                </div>

                <div className="flex-1 text-left">

                  <h3 className="font-heading text-h4">
                    {base.name}
                  </h3>

                  <p
                    className={`
                      mt-2
                      text-body-sm
                      line-clamp-2

                      ${
                        active
                          ? "text-white/80"
                          : "text-neutral-400"
                      }
                    `}
                  >
                    {base.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">

                    {base.ingredients.map((ingredient) => (

                      <span
                        key={ingredient}
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
                        {ingredient}
                      </span>

                    ))}

                  </div>

                </div>

                <div
                  className={`
                    text-right

                    ${
                      active
                        ? "text-white"
                        : "text-brand-500"
                    }
                  `}
                >

                  <p className="text-body-sm">
                    Additional
                  </p>

                  <h4 className="font-semibold text-h5">
                    + {formatRupiah(base.price)}
                  </h4>

                </div>

              </div>

            </button>

          );

        })}

      </div>

    </section>
  );
}