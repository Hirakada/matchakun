"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const events = [
  {
    id: 1,
    title: "Summer Matcha Festival",
    date: "17–31 August 2026",
    time: "10:00 AM – 9:00 PM",
    location: "Matcha Kun Booth",
    badge: "Seasonal",
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1200&auto=format&fit=crop",
    description:
      "Celebrate the season with exclusive ceremonial matcha drinks and limited merchandise.",
  },
  {
    id: 2,
    title: "Matcha Tasting Session",
    date: "Every Saturday",
    time: "2:00 PM",
    location: "Matcha Kun",
    badge: "Workshop",
    image:
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1200&auto=format&fit=crop",
    description:
      "Discover the unique flavor profiles of KAZE, NAMI, and ROKU.",
  },
  {
    id: 3,
    title: "Weekend Matcha Quiz",
    date: "Weekend",
    time: "All Day",
    location: "Online",
    badge: "Game",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    description:
      "Play our interactive quiz and win vouchers or exclusive Matcha Kun merchandise.",
  },
];

export default function EventSection() {
  return (
    <section className="bg-[#F8F7F2] py-24">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-flex rounded-full bg-brand-100 px-4 py-1 text-sm font-semibold text-brand-700">
            EVENTS
          </span>

          <h2 className="mt-4 text-4xl font-bold text-neutral-900 md:text-5xl">
            Experience Matcha Beyond the Cup
          </h2>

          <p className="mt-5 text-lg text-neutral-600">
            Join seasonal launches, tasting sessions, community gatherings,
            and interactive experiences crafted for every matcha lover.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .5,
                delay: index * .1,
              }}
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative h-64">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />

                <span className="absolute left-4 top-4 rounded-full bg-brand-600 px-4 py-1 text-sm font-medium text-white">
                  {event.badge}
                </span>
              </div>

              <div className="space-y-4 p-6">

                <h3 className="text-2xl font-bold">
                  {event.title}
                </h3>

                <p className="text-neutral-600">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-neutral-500">

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {event.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {event.time}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {event.location}
                  </div>

                </div>

                <button className="group mt-4 inline-flex items-center gap-2 font-semibold text-brand-700 transition-colors hover:text-brand-900">
                  Learn More
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: .2 }}
          className="mt-20 rounded-[32px] bg-brand-700 px-10 py-14 text-center text-white"
        >
          <h3 className="text-3xl font-bold">
            Don&apos;t Miss Our Next Event
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-brand-100">
            Stay updated with every seasonal launch, workshop,
            collaboration, and exclusive promotion from Matcha Kun.
          </p>

          <button className="mt-8 rounded-full bg-white px-8 py-3 font-semibold text-brand-700 transition hover:scale-105">
            View All Events
          </button>
        </motion.div>

      </div>
    </section>
  );
}