"use client"

import {
    MapPin,
    Bike,
    ShoppingBag,
    ChevronRight,
} from "lucide-react"

import Button from "@/components/ui/Button"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type FindUsPopupProps = {
    className?: string
}

export default function FindUsPopup({
    className = "",
}: FindUsPopupProps) {
    const items = [
        {
            title: "Store Location",
            description: "Visit our offline store",
            href: "https://maps.app.goo.gl/hNffjyRno3LTnFuKA",
            icon: MapPin,
        },
        {
            title: "GrabFood",
            description: "Order via GrabFood",
            href: "https://food.grab.com/id/id/restaurant/matcha-kun-tirtomoyo-delivery/6-C75ACYWHFEAJVJ",
            icon: Bike,
        },
        {
            title: "ShopeeFood",
            description: "Coming soon on ShopeeFood",
            href: "#",
            icon: ShoppingBag,
            disabled: true,
        },
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={
                        className ||
                        "mx-auto lg:mx-0 w-fit rounded-full bg-neutral-black px-5 py-2.5 text-button font-semibold text-neutral-white transition-all duration-300 hover:scale-105 hover:shadow-lg sm:px-6 sm:py-3"
                    }
                >
                    Find Us
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[92vw] max-w-md rounded-[28px] border border-neutral-200 bg-neutral-white p-5 shadow-2xl sm:p-6">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-center font-heading text-h3 leading-heading tracking-tight text-neutral-black">
                        Find Matcha-Kun
                    </DialogTitle>

                    <p className="mx-auto max-w-xs text-center text-body-sm leading-body text-neutral-300">
                        Visit or order from your favorite platform
                    </p>
                </DialogHeader>

                <div className="mt-5 flex flex-col gap-3 sm:mt-6">
                    {items.map((item) => {
                        const Icon = item.icon

                        if (item.disabled) {
                            return (
                                <div
                                    key={item.title}
                                    className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-100 p-3.5 opacity-70 sm:p-4"
                                >
                                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 sm:size-11">
                                            <Icon className="size-4 text-neutral-400 sm:size-5" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-neutral-400 sm:text-base">
                                                {item.title}
                                            </p>

                                            <p className="truncate text-body-sm text-neutral-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="ml-3 shrink-0 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                                        Soon
                                    </span>
                                </div>
                            )
                        }

                        return (
                            <a
                                key={item.title}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-white p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md sm:p-4"
                            >
                                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cream-100 sm:size-11">
                                        <Icon className="size-4 text-brand-700 sm:size-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-neutral-black sm:text-base">
                                            {item.title}
                                        </p>

                                        <p className="truncate text-body-sm text-neutral-300">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <ChevronRight className="ml-3 size-4 shrink-0 text-neutral-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-500 sm:size-5" />
                            </a>
                        )
                    })}
                </div>
            </DialogContent>
        </Dialog>
    )
}