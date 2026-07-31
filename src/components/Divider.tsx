import { Diamond } from "lucide-react";
import { Marquee } from "./ui";

const ITEMS = [
  "SEMI-TRANSPARENT BLACK CRYSTAL",
  "ENORMOUS ENERGY",
  "CATALYST OF ALL ARTS",
  "PRIMARY FACTOR OF CATASTROPHES",
];

export default function Divider() {
  return (
    <div className="relative border-y border-bone/[0.08] bg-coal/40 py-5 md:py-6">
      <Marquee>
        {ITEMS.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`whitespace-nowrap px-8 font-display text-xl uppercase tracking-wide md:px-12 md:text-3xl ${
                i % 2 === 0 ? "text-bone/85" : "text-stroke"
              }`}
            >
              {item}
            </span>
            <Diamond className="h-3 w-3 shrink-0 fill-ember/80 text-ember" strokeWidth={1} />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
