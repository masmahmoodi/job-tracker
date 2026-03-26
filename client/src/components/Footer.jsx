export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 py-8 text-sm text-stone-400">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold uppercase tracking-[0.3em] text-amber-200/70">
            Sharks Job Tracker
          </p>
          <p className="mt-1 text-stone-500">
            Built to present a serious, polished job search workflow.
          </p>
        </div>
        <p className="text-stone-500">
          Keep your pipeline sharp. Move fast. Track everything.
        </p>
      </div>
    </footer>
  );
}
