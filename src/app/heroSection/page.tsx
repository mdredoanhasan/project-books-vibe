import Image from "next/image";
import Link from "next/link";
import banner from "@/assets/hero_img.jpg";

const HeroSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top,_#f8fafc,_#eef2ff_35%,_#f8fafc_100%)] shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
        <div className="grid items-center gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-12">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Curated reads
            </span>

            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Books to freshen up your bookshelf
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Discover unforgettable stories, timeless classics, and hidden
                gems chosen for curious readers who love a good next chapter.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/Books">
                <button className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                  View the list
                </button>
              </Link>
              <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                Explore genres
              </button>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <div>
                <p className="text-2xl font-bold text-slate-900">50+</p>
                <p className="text-sm text-slate-500">Featured books</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">4.8/5</p>
                <p className="text-sm text-slate-500">Reader rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">12k</p>
                <p className="text-sm text-slate-500">Readers</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 h-24 w-24 rounded-full bg-emerald-200/80 blur-2xl" />
            <div className="absolute -right-4 bottom-8 h-28 w-28 rounded-full bg-violet-200/80 blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
              <div className="relative overflow-hidden rounded-[20px] bg-slate-200">
                <Image
                  src={banner}
                  alt="Books"
                  width={700}
                  height={700}
                  className="h-[420px] w-full object-cover sm:h-[500px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
