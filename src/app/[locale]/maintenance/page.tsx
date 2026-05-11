interface MaintenancePageProps {
  params: Promise<{ locale: string }>;
}

const content = {
  en: {
    title: "Maintenance Mode",
    description:
      "We are currently performing scheduled maintenance. Please check back shortly.",
  },
  ar: {
    title: "وضع الصيانة",
    description:
      "نقوم حالياً بإجراء صيانة مجدولة للموقع. يرجى المحاولة مرة أخرى بعد قليل.",
  },
};

export default async function MaintenancePage({ params }: MaintenancePageProps) {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const copy = isArabic ? content.ar : content.en;

  return (
    <main className="min-h-screen bg-web-gray text-white flex items-center justify-center px-6">
      <section className="max-w-2xl text-center space-y-5">
        <span className="inline-block rounded-full border border-white/30 px-4 py-1 text-sm text-white/80">
          Strategizers
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {copy.title}
        </h1>
        <p className="text-lg text-white/80 leading-relaxed">{copy.description}</p>
      </section>
    </main>
  );
}
