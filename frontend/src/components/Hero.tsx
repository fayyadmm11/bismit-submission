const Hero = () => {
  return (
    <section
      id="beranda"
      className="relative pt-20 pb-32 flex items-center justify-center overflow-hidden"
    >
      {/* Background Decorative Blob */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-gradient-to-br from-blue-600/20 to-rose-600/20 blur-[100px] rounded-full z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Selamat Datang di <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-rose-500 bg-clip-text text-transparent">
            Bem Connect
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-300 mx-auto mb-10 leading-relaxed">
          Platform khusus untuk ngepost hal hal seru di BEM seperti kegiatan,
          pengumuman, sampai momen kebersamaan. Terhubung lebih dekat,
          berkolaborasi lebih cepat!
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            Mulai Eksplorasi
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-rose-500 hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 rounded-full font-semibold transition-all">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
