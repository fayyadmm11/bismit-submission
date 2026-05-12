interface FeatureItem {
  title: string;
  description: string;
  accentColor: string;
  image: string; // Tambahan properti untuk path gambar
}

const featuresData: FeatureItem[] = [
  {
    title: "Cepat & Responsif",
    description:
      "Akses tanpa lemot dari perangkat apa saja. UX yang mulus bikin scrolling informasi BEM jadi makin nyaman.",
    accentColor: "from-blue-500 to-cyan-400",
    image: "/features/fast.jpg", // Ganti dengan path gambarmu
  },
  {
    title: "Terkoneksi Antar Teman",
    description:
      "Jangan sampai kudet! Diskusikan proker, ngobrol santai, dan bangun relasi dengan anggota BEM lainnya.",
    accentColor: "from-purple-500 to-pink-500",
    image: "/features/connection.jpg", // Ganti dengan path gambarmu
  },
  {
    title: "Sharing KJ & Tugas",
    description:
      "Saling bantu masalah akademik. Sharing Kunci Jawaban (KJ) kuis atau referensi tugas makin seru dan terpusat!",
    accentColor: "from-rose-500 to-orange-400",
    image: "/features/sharing.jpg", // Ganti dengan path gambarmu
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
              // Card container: overflow-hidden untuk memotong gambar yang di-scale, hapus -translate-y
              // Beri min-height agar card tidak kempes karena teksnya absolute
              className="relative min-h-[250px] rounded-2xl border border-slate-700 overflow-hidden group cursor-pointer"
            >
              {/* Layer 1: Gambar Background */}
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Layer 2: Overlay Penggelapan */}
              {/* Awalnya transparan/sedikit gelap, menjadi sangat gelap (bg-slate-900/80) saat di-hover */}
              <div className="absolute inset-0 bg-slate-900/20 transition-colors duration-500 group-hover:bg-slate-900/85 z-10" />

              {/* Top Accent Line (Opsional: Tetap saya pertahankan jika kamu suka detail ini) */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.accentColor} z-20`}
              />

              {/* Layer 3: Teks Konten */}
              {/* opacity-0 membuat teks hilang, group-hover:opacity-100 memunculkan teks. 
                  Ada efek sedikit naik dari bawah (translate-y-4 ke translate-y-0) */}
              <div className="absolute inset-0 z-20 p-8 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
