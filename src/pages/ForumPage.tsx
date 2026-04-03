import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Post } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PenLine, MessageSquare, LogOut, ChevronRight } from 'lucide-react';

export function ForumPage() {
  const { profile, signOut } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*, profiles(company_name)')
        .order('created_at', { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header */}
      <header className="bg-white border-b border-black/6 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="/" className="tracking-widest font-bold text-[#1D1D1F]" style={{ fontFamily: "'Dyson Sans Modern', sans-serif" }}>
            aipec
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#1D1D1F]/40 hidden sm:block">{profile?.company_name}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 text-xs text-[#1D1D1F]/50 hover:text-[#1D1D1F] transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Title row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Bedrijvenplatform</h1>
            <p className="text-sm text-[#1D1D1F]/40 mt-0.5">Deel kennis en ervaringen met andere deelnemers</p>
          </div>
          <Link
            to="/forum/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#1D1D1F] text-white text-sm font-semibold rounded-xl hover:bg-[#1D1D1F]/80 transition"
          >
            <PenLine className="w-3.5 h-3.5" />
            Nieuw bericht
          </Link>
        </div>

        {/* Posts */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#4B9FFF] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-[#1D1D1F]/30 text-sm">
            Nog geen berichten. Wees de eerste!
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <Link
                key={post.id}
                to={`/forum/${post.id}`}
                className="block bg-white rounded-2xl border border-black/6 p-5 hover:border-[#4B9FFF]/40 hover:shadow-sm transition group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-[#1D1D1F] text-base leading-snug group-hover:text-[#4B9FFF] transition truncate">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#1D1D1F]/50 mt-1 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#1D1D1F]/20 group-hover:text-[#4B9FFF]/60 shrink-0 mt-0.5 transition" />
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs font-medium text-[#1D1D1F]/40">
                    {(post.profiles as any)?.company_name ?? 'Onbekend'}
                  </span>
                  <span className="text-[#1D1D1F]/15">·</span>
                  <span className="text-xs text-[#1D1D1F]/30">{formatDate(post.created_at)}</span>
                  <MessageSquare className="w-3 h-3 text-[#1D1D1F]/20 ml-auto" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
