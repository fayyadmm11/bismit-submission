import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PostList from '../components/Timeline/PostList'

const TimelinePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Navbar />

      <main className="flex-grow max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Timeline</h1>
          <p className="text-slate-400">
            Lihat update terbaru dari teman-teman BEM kamu.
          </p>
        </div>

        <PostList />
      </main>

      <Footer />
    </div>
  )
}

export default TimelinePage
