import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Post } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { avatarColor } from '../lib/avatarColor';
import { DEMO_POST } from '../lib/demoPost';
import { LogOut, Heart, MessageSquare, Send, ChevronRight } from 'lucide-react';

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
  const [quickText, setQuickText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [demoLiked, setDemoLiked] = useState(false);

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

  const toggleLike = async (post: PostWithMeta, e: React.MouseEvent) => {
    e.preventDefault();
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

  const handleQuickPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickText.trim() || !user) return;
    setSubmitting(true);
    const title = quickText.trim().split('\n')[0].slice(0, 80);
    await supabase.from('posts').insert({ author_id: user.id, title, content: quickText.trim() });
    setQuickText('');
    await fetchPosts();
    setSubmitting(false);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diff < 60) return 'Nu';
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}u`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
    return d.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' });
  };

  const demoLikes = DEMO_POST.likes + (demoLiked ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <div className="grain-overlay" aria-hidden="true" />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="tracking-widest font-bold text-[#1D1D1F]" style={{ fontSize: '1.05rem', fontFamily: "'Dyson Sans Modern', sans-serif" }}>
              aipec
            </a>
            <span className="hidden sm:block text-xs font-mono text-[#1D1D1F]/25 tracking-widest">BEDRIJVENFORUM</span>
          </div>
          <div className="flex items-center gap-3">
            {profile && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: avatarColor(profile.company_name) }} />
                <span className="hidden sm:block text-xs text-[#1D1D1F]/45">{profile.company_name}</span>
              </div>
            )}
            <div className="w-px h-4 bg-black/10 hidden sm:block" />
            <button onClick={signOut} className="text-xs text-[#1D1D1F]/35 hover:text-[#1D1D1F] transition flex items-center gap-1.5">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Uitloggen</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20">

        {/* Page title */}
        <div className="pt-8 pb-10">
          <p className="text-xs font-mono text-[#4B9FFF] tracking-widest mb-4">02 / BEDRIJVENFORUM</p>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1D1D1F] leading-[1.05] tracking-tight">Kennis delen</h1>
          <p className="text-4xl sm:text-5xl font-black text-[#1D1D1F]/20 leading-[1.05] tracking-tight">samen groeien.</p>
        </div>

        {/* Quick compose */}
        {profile && (
          <form onSubmit={handleQuickPost} className="bg-white rounded-2xl border border-black/6 p-4 mb-3 shadow-sm">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full shrink-0 mt-2" style={{ background: avatarColor(profile.company_name) }} />
              <div className="flex-1">
                <textarea
                  value={quickText}
                  onChange={e => setQuickText(e.target.value)}
                  rows={quickText ? 3 : 1}
                  placeholder={`Wat wil je delen, ${profile.company_name.split(' ')[0]}?`}
                  className="w-full text-sm text-[#1D1D1F] placeholder:text-[#1D1D1F]/30 bg-transparent resize-none focus:outline-none leading-relaxed"
                />
                {quickText && (
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/6">
                    <span className="text-xs text-[#1D1D1F]/30">{quickText.length} tekens</span>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setQuickText('')} className="text-xs text-[#1D1D1F]/35 hover:text-[#1D1D1F] transition px-3 py-1.5">
                        Annuleer
                      </button>
                      <button
                        type="submit"
                        disabled={submitting || !quickText.trim()}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1D1D1F] text-white text-xs font-semibold rounded-full hover:bg-[#1D1D1F]/80 transition disabled:opacity-40"
                      >
                        <Send className="w-3 h-3" />
                        {submitting ? 'Plaatsen…' : 'Plaatsen'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        )}

        {/* Demo post — pinned */}
        <Link
          to="/forum/demo"
          className="group bg-white rounded-2xl border border-black/6 p-5 hover:border-[#4B9FFF]/25 hover:shadow-sm transition-all block mb-2.5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: avatarColor(DEMO_POST.company) }} />
              <span className="text-xs font-medium text-[#1D1D1F]/60">{DEMO_POST.company}</span>
            </div>
            <span className="text-xs text-[#1D1D1F]/25 font-mono">{DEMO_POST.date}</span>
          </div>
          <p className="text-sm text-[#1D1D1F]/50 leading-relaxed line-clamp-3 mb-4">{DEMO_POST.content}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={e => { e.preventDefault(); setDemoLiked(v => !v); }}
                className={`flex items-center gap-1.5 text-xs transition-colors ${demoLiked ? 'text-[#EF4444]' : 'text-[#1D1D1F]/25 hover:text-[#EF4444]'}`}
              >
                <Heart className={`w-3.5 h-3.5 ${demoLiked ? 'fill-current' : ''}`} />
                {demoLikes}
              </button>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#1D1D1F]/15 group-hover:text-[#4B9FFF]/50 transition-colors" />
          </div>
        </Link>

        {/* Real posts */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-5 h-5 border-2 border-[#4B9FFF] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {posts.map((post) => {
              const company = (post.profiles as any)?.company_name ?? 'Onbekend';
              const color = avatarColor(company);
              return (
                <Link
                  key={post.id}
                  to={`/forum/${post.id}`}
                  className="group bg-white rounded-2xl border border-black/6 p-5 hover:border-[#4B9FFF]/25 hover:shadow-sm transition-all block"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                      <span className="text-xs font-medium text-[#1D1D1F]/60">{company}</span>
                    </div>
                    <span className="text-xs text-[#1D1D1F]/25 font-mono">{formatDate(post.created_at)}</span>
                  </div>
                  <p className="text-sm text-[#1D1D1F]/50 leading-relaxed line-clamp-3 mb-4">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => toggleLike(post, e)}
                        className={`flex items-center gap-1.5 text-xs transition-colors ${post.liked_by_me ? 'text-[#EF4444]' : 'text-[#1D1D1F]/25 hover:text-[#EF4444]'}`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${post.liked_by_me ? 'fill-current' : ''}`} />
                        {post.like_count}
                      </button>
                      <span className="flex items-center gap-1.5 text-xs text-[#1D1D1F]/25">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {post.reply_count}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#1D1D1F]/15 group-hover:text-[#4B9FFF]/50 transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
