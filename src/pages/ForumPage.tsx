import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Post } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { avatarColor } from '../lib/avatarColor';
import { PenLine, LogOut, Heart, MessageSquare } from 'lucide-react';

type PostWithMeta = Post & {
  profiles?: { company_name: string };
  like_count?: number;
  reply_count?: number;
  liked_by_me?: boolean;
};

export function ForumPage() {
  const { profile, user, signOut } = useAuth();
  const [posts, setPosts] = useState<PostWithMeta[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*, profiles(company_name)')
      .order('created_at', { ascending: false });

    if (!data) { setLoading(false); return; }

    const enriched = await Promise.all(data.map(async (post) => {
      const [{ count: likeCount }, { count: replyCount }, { data: myLike }] = await Promise.all([
        supabase.from('post_likes').select('*', { count: 'exact', head: true }).eq('post_id', post.id),
        supabase.from('replies').select('*', { count: 'exact', head: true }).eq('post_id', post.id),
        user ? supabase.from('post_likes').select('post_id').eq('post_id', post.id).eq('user_id', user.id).single() : Promise.resolve({ data: null }),
      ]);
      return { ...post, like_count: likeCount ?? 0, reply_count: replyCount ?? 0, liked_by_me: !!myLike };
    }));

    setPosts(enriched);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const toggleLike = async (post: PostWithMeta) => {
    if (!user) return;
    if (post.liked_by_me) {
      await supabase.from('post_likes').delete().eq('post_id', post.id).eq('user_id', user.id);
    } else {
      await supabase.from('post_likes').insert({ post_id: post.id, user_id: user.id });
    }
    setPosts(prev => prev.map(p => p.id === post.id
      ? { ...p, liked_by_me: !p.liked_by_me, like_count: (p.like_count ?? 0) + (p.liked_by_me ? -1 : 1) }
      : p
    ));
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' });

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <div className="grain-overlay" aria-hidden="true" />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/6">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 h-14 flex items-center justify-between">
          <a href="/" className="tracking-widest font-bold text-[#1D1D1F]" style={{ fontSize: '1.1rem', fontFamily: "'Dyson Sans Modern', sans-serif" }}>
            aipec
          </a>
          <div className="flex items-center gap-4">
            {profile && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: avatarColor(profile.company_name) }} />
                <span className="text-xs text-[#1D1D1F]/50">{profile.company_name}</span>
              </div>
            )}
            <button onClick={signOut} className="flex items-center gap-1.5 text-xs text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition">
              <LogOut className="w-3.5 h-3.5" />
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 pt-28 pb-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-mono text-[#4B9FFF] tracking-widest mb-3">02 / BEDRIJVENPLATFORM</p>
            <h1 className="text-4xl sm:text-5xl font-black text-[#1D1D1F] leading-[1.05] tracking-tight">Kennis delen</h1>
            <p className="text-4xl sm:text-5xl font-black text-[#1D1D1F]/25 leading-[1.05] tracking-tight">samen groeien.</p>
          </div>
          <Link
            to="/forum/new"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#1D1D1F] text-white text-sm font-semibold rounded-full hover:bg-[#1D1D1F]/80 transition"
          >
            <PenLine className="w-3.5 h-3.5" />
            Nieuw bericht
          </Link>
        </div>

        <div className="h-px bg-black/8 mb-10" />

        <Link to="/forum/new" className="sm:hidden flex items-center justify-center gap-2 w-full mb-8 py-2.5 bg-[#1D1D1F] text-white text-sm font-semibold rounded-full">
          <PenLine className="w-3.5 h-3.5" />
          Nieuw bericht
        </Link>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-5 h-5 border-2 border-[#4B9FFF] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-[#1D1D1F]/25 text-sm font-mono tracking-wide">
            Nog geen berichten — wees de eerste.
          </div>
        ) : (
          <div className="flex flex-col">
            {posts.map((post, i) => {
              const company = (post.profiles as any)?.company_name ?? 'Onbekend';
              return (
                <div key={post.id} className={`flex gap-4 py-7 ${i > 0 ? 'border-t border-black/6' : ''}`}>
                  <div className="w-2 h-2 rounded-full shrink-0 mt-2" style={{ background: avatarColor(company) }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-[#1D1D1F]">{company}</span>
                      <span className="text-[#1D1D1F]/15">·</span>
                      <span className="text-xs text-[#1D1D1F]/35">{formatDate(post.created_at)}</span>
                    </div>
                    <Link to={`/forum/${post.id}`} className="group block">
                      <h2 className="text-base font-semibold text-[#1D1D1F] group-hover:text-[#4B9FFF] transition leading-snug mb-1">{post.title}</h2>
                      <p className="text-sm text-[#1D1D1F]/45 leading-relaxed line-clamp-2">{post.content}</p>
                    </Link>
                    <div className="flex items-center gap-5 mt-3">
                      <button
                        onClick={() => toggleLike(post)}
                        className={`flex items-center gap-1.5 text-xs transition ${post.liked_by_me ? 'text-[#EF4444]' : 'text-[#1D1D1F]/30 hover:text-[#EF4444]'}`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${post.liked_by_me ? 'fill-current' : ''}`} />
                        {post.like_count}
                      </button>
                      <Link to={`/forum/${post.id}`} className="flex items-center gap-1.5 text-xs text-[#1D1D1F]/30 hover:text-[#1D1D1F]/60 transition">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {post.reply_count}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
