const featuresData = [
  {
    title: "Cepat & Responsif",
    description:
      "Akses tanpa lemot dari perangkat apa saja. UX yang mulus bikin scrolling informasi BEM jadi makin nyaman.",
    icon: "⚡",
    accentColor: "from-blue-500 to-cyan-400",
  },
  {
    title: "Terkoneksi Antar Teman",
    description:
      "Jangan sampai kudet! Diskusikan proker, ngobrol santai, dan bangun relasi dengan anggota BEM lainnya.",
    icon: "🤝",
    accentColor: "from-purple-500 to-pink-500",
  },
  {
    title: "Sharing KJ & Tugas",
    description:
      "Saling bantu masalah akademik. Sharing Kunci Jawaban (KJ) kuis atau referensi tugas makin seru dan terpusat!",
    icon: "📚",
    accentColor: "from-rose-500 to-orange-400",
  },
];

const Features = () => {
  return (
    <section id="fitur" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Kenapa Memilih <span className="text-blue-400">Bem Connect?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Kami merancang platform ini khusus untuk menjawab kebutuhan anak BEM
            agar lebih produktif dan interaktif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl hover:-translate-y-5 transition-transform duration-300 relative overflow-hidden group"
            >
              {/* Top Accent Line */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.accentColor}`}
              ></div>

              <div className="text-4xl mb-6 bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center border border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
