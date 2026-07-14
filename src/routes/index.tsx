import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PokemonScrollAnimation } from "@/components/PokemonScrollAnimation";
import repokeLogo from "@/assets/repoke-logo.png";


const EBAY_FEEDBACK = "https://www.ebay.de/fdbk/feedback_profile/repoke";
const GR8_URL = "https://grade.re-poke.de";
const YEAR = new Date().getFullYear();

const REVIEWS = [
  "Schneller Versand und eine tolle Auswahl an Karten.",
  "Sorgfältig verpackt und genau wie beschrieben.",
  "Eine schöne Mischung für Einsteiger und Sammler.",
  "Sehr zuverlässige Abwicklung und schneller Versand.",
  "Die Kartensammlung kam sicher und ordentlich verpackt an.",
  "Tolles Preis-Leistungs-Verhältnis und freundlicher Service.",
  "Eine gelungene Überraschung mit abwechslungsreichen Karten.",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "REPOKE – Pokémon-Sammelkarten für jeden Sammler" },
      {
        name: "description",
        content:
          "REPOKE stellt hochwertige Pokémon-Kartensammlungen zusammen – 50 Karten inklusive V/VMAX bereits ab 12,99 €. Für Einsteiger, Fans und Sammler.",
      },
      { property: "og:title", content: "REPOKE – Pokémon-Sammelkarten für jeden Sammler" },
      {
        property: "og:description",
        content:
          "Sorgfältig zusammengestellte Pokémon-Kartensammlungen. 50 Karten und eine V/VMAX ab 12,99 €.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="bg-background text-foreground">
      <Hero />
      <PokemonScrollAnimation />
      <ProductOffer />
      <Reviews />
      <YoutubeSection />
      <Gr8Section />
      <Footer />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <header
      className="relative isolate overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 10%, color-mix(in oklab, var(--brand-cyan) 22%, transparent), transparent 55%), radial-gradient(ellipse at 85% 90%, color-mix(in oklab, var(--brand-pink) 18%, transparent), transparent 55%), linear-gradient(180deg, var(--brand-deep), var(--brand))",
        color: "white",
      }}
    >
      <div className="mx-auto flex min-h-[92svh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <img
          src={repokeLogo}
          alt="REPOKE – House of Cards"
          className="mb-6 h-auto w-32 drop-shadow-lg sm:w-36"
          width={320}
          height={160}
          loading="eager"
          decoding="async"
        />
        <h1
          className="max-w-5xl font-extrabold leading-[1.02] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
        >
          Die{" "}
          <span style={{ color: "var(--brand-yellow)" }}>beliebtesten Sammelkarten</span>{" "}
          – erreichbar für{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--brand-cyan), var(--brand-pink))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            jeden!
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-white/80 sm:text-lg">
          Entdecke sorgfältig zusammengestellte Pokémon-Kartensammlungen für Einsteiger,
          Fans und Sammler.
        </p>

        <a
          href="#animation"
          className="mt-16 inline-flex flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
          aria-label="Zur Animation scrollen"
        >
          <span>Scrollen</span>
          <span aria-hidden="true" className="repoke-bob text-2xl">
            ↓
          </span>
        </a>
      </div>
    </header>
  );
}

/* ---------- PRODUCT OFFER ---------- */
function ProductOffer() {
  const [soldOut, setSoldOut] = useState(false);

  return (
    <section
      aria-labelledby="offer-title"
      className="relative px-6 py-24 text-center sm:py-32"
      style={{ background: "var(--brand-paper)" }}
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Das REPOKE-Angebot
        </p>
        <h2
          id="offer-title"
          className="font-extrabold leading-tight tracking-tight text-foreground"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          50 Karten und eine{" "}
          <span style={{ color: "var(--brand)" }}>V/VMAX</span>
          <br className="hidden sm:block" /> bereits ab{" "}
          <span
            className="inline-block rounded-xl px-3 py-1"
            style={{
              background: "var(--brand-yellow)",
              color: "var(--brand-ink)",
            }}
          >
            12,99 €
          </span>
          !
        </h2>
        <p className="mt-6 text-base text-muted-foreground sm:text-lg">
          Handverlesene Mischung mit Highlight-Karte – ideal als Einstieg, Geschenk oder
          Erweiterung deiner Sammlung.
        </p>

        <div className="mt-10">
          <button
            onClick={() => setSoldOut(true)}
            className="inline-flex min-h-[3.75rem] items-center justify-center rounded-2xl px-10 py-5 text-lg font-extrabold uppercase tracking-wide shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0"
            style={{
              background: "var(--brand-yellow)",
              color: "var(--brand-ink)",
              boxShadow:
                "0 10px 30px -10px color-mix(in oklab, var(--brand-yellow) 60%, transparent)",
            }}
          >
            Jetzt kaufen →
          </button>
        </div>

        {soldOut && (
          <p
            className="mt-5 text-base font-semibold sm:text-lg"
            style={{ color: "var(--brand-pink)" }}
            role="status"
            aria-live="polite"
          >
            Leider ausverkauft :(
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------- REVIEWS ---------- */
function ReviewCard({ text }: { text: string }) {
  return (
    <a
      href={EBAY_FEEDBACK}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full w-72 shrink-0 flex-col justify-between rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:w-80"
      aria-label={`eBay-Bewertung: ${text} (5 von 5 Sternen)`}
    >
      <div>
        <div
          className="text-lg font-bold tracking-wider"
          style={{ color: "var(--brand-yellow)" }}
          aria-hidden="true"
        >
          ★★★★★
        </div>
        <span className="sr-only">5 von 5 Sternen</span>
        <p className="mt-4 text-sm leading-relaxed text-foreground sm:text-base">
          „{text}"
        </p>
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
        5/5 Sterne · eBay
      </p>
    </a>
  );
}

function Reviews() {
  const loop = [...REVIEWS, ...REVIEWS];
  return (
    <section
      aria-labelledby="reviews-title"
      className="overflow-hidden bg-background px-0 py-24 sm:py-32"
    >
      <div className="mx-auto mb-12 max-w-3xl px-6 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Kundenstimmen
        </p>
        <h2
          id="reviews-title"
          className="font-extrabold tracking-tight text-foreground"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          Das sagen unsere Kunden
        </h2>
      </div>

      <div
        className="repoke-marquee group relative w-full"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div
          className="repoke-marquee-track flex w-max gap-5 px-6"
          style={{ touchAction: "pan-x" }}
        >
          {loop.map((text, i) => (
            <ReviewCard key={i} text={text} />
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <a
          href={EBAY_FEEDBACK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold underline-offset-4 hover:underline"
          style={{ color: "var(--brand)" }}
        >
          Alle Bewertungen auf eBay ansehen →
        </a>
      </div>
    </section>
  );
}

/* ---------- YOUTUBE ---------- */
function YoutubeSection() {
  return (
    <section
      aria-labelledby="video-title"
      className="px-6 py-24 sm:py-32"
      style={{ background: "var(--brand-paper)" }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Bewegtbild
          </p>
          <h2
            id="video-title"
            className="font-extrabold tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            REPOKE im Video
          </h2>
        </div>

        <div
          className="relative w-full overflow-hidden rounded-3xl bg-black shadow-2xl"
          style={{
            aspectRatio: "16 / 9",
            boxShadow:
              "0 30px 60px -20px color-mix(in oklab, var(--brand-ink) 40%, transparent)",
          }}
        >
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube-nocookie.com/embed/ppYK2q5QDlc?rel=0"
            title="REPOKE im Video"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- GR8 ---------- */
function Gr8Section() {
  return (
    <section
      aria-labelledby="gr8-title"
      className="repoke-gr8-glow relative overflow-hidden px-6 py-28 text-white sm:py-36"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          className="mb-4 text-xs font-bold uppercase tracking-[0.24em]"
          style={{ color: "var(--brand-yellow)" }}
        >
          GR8 · Professional Grading
        </p>
        <h2
          id="gr8-title"
          className="font-extrabold leading-tight tracking-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Du bist{" "}
          <span style={{ color: "var(--brand-yellow)" }}>
            professioneller Sammler?
          </span>
        </h2>
        <p className="mt-6 text-base text-white/85 sm:text-lg">
          Dann interessiert dich vielleicht <strong>GR8</strong>, der Grading-Service
          von REPOKE.
        </p>
        <p className="mt-3 text-base text-white/70 sm:text-lg">
          Pokémon-Karten professionell einrahmen und bewerten lassen –{" "}
          <span className="font-bold text-white">bereits ab 9,99 €</span>.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
            Schutz
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
            Bewertung
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
            Premiumqualität
          </span>
        </div>

        <div className="mt-10">
          <a
            href={GR8_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[3.5rem] items-center justify-center rounded-2xl border-2 px-9 py-4 text-base font-extrabold uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "var(--brand-yellow)",
              color: "var(--brand-ink)",
              borderColor: "var(--brand-yellow)",
              boxShadow:
                "0 10px 30px -10px color-mix(in oklab, var(--brand-yellow) 55%, transparent)",
            }}
          >
            GR8 entdecken →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer
      className="px-6 py-14"
      style={{ background: "var(--brand-ink)", color: "rgba(255,255,255,0.75)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p
            className="text-2xl font-extrabold tracking-tight text-white"
            aria-label="REPOKE"
          >
            REPOKE
          </p>
          <p className="mt-2 text-sm text-white/60">
            © {YEAR} REPOKE. Alle Rechte vorbehalten.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <a href="#impressum-platzhalter" className="hover:text-white">
            Impressum
          </a>
          <a href="#datenschutz-platzhalter" className="hover:text-white">
            Datenschutz
          </a>
          <a href="#kontakt-platzhalter" className="hover:text-white">
            Kontakt
          </a>
          <a
            href={EBAY_FEEDBACK}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            eBay-Bewertungen
          </a>
          <a
            href="https://www.youtube.com/watch?v=ppYK2q5QDlc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            YouTube
          </a>
          <a
            href={GR8_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            GR8
          </a>
        </nav>
      </div>
    </footer>
  );
}
