import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, Post, Reply } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { avatarColor } from '../lib/avatarColor';
import { ArrowLeft, Send, Heart, LogOut } from 'lucide-react';

type PostWithMeta = Post & {
  profiles?: { company_name: string };
  like_count?: number;
  liked_by_me?: boolean;
};

type ReplyWithProfile = Reply & {
  profiles?: { company_name: string };
};

export function ForumPostPage() {
  const { id } = useParams<{ id: string }>();
  const { user, profile, signOut } = useAuth();
  const [post, setPost] = useState<PostWithMeta | null>(null);
  const [replies, setReplies] = useState<ReplyWithProfile[]>([]);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: postData }, { data: repliesData }, { count: likeCount }, { data: myLike }] = await Promise.all([
        supabase.from('posts').select('*, profiles(company_name)').eq('id', id).single(),
        supabase.from('replies').select('*, profiles(company_name)').eq('post_id', id).order('created_at', { ascending: true }),
        supabase.from('post_likes').select('*', { count: 'exact', head: true }).eq('post_id', id),
        user ? supabase.from('post_likes').select('post_id').eq('post_id', id).eq('user_id', user.id).single() : Promise.resolve({ data: null }),
      ]);
      setPost(postData ? { ...postData, like_count: likeCount ?? 0, liked_by_me: !!myLike } : null);
      setReplies(repliesData ?? []);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const toggleLike = async () => {
    if (!post || !user) return;
    if (post.liked_by_me) {
      await supabase.from('post_likes').delete().eq('post_id', post.id).eq('user_id', user.id);
    } else {
      await supabase.from('post_likes').insert({ post_id: post.id, user_id: user.id });
    }
    setPost(p => p ? { ...p, liked_by_me: !p.liked_by_me, like_count: (p.like_count ?? 0) + (p.liked_by_me ? -1 : 1) } : p);
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from('replies')
      .insert({ post_id: id, author_id: user!.id, content: replyContent })
      .select('*, profiles(company_name)')
      .single();
    if (!error && data) { setReplies(prev => [...prev, data]); setReplyContent(''); }
    setSubmitting(false);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
      <div className="w-5 h-5 border-2 border-[#4B9FFF] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] text-[#1D1D1F]/30 text-sm font-mono">
      Bericht niet gevonden.
    </div>
  );

  const postCompany = (post.profiles as any)?.company_name ?? 'Onbekend';

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
        <Link to="/forum" className="inline-flex items-center gap-1.5 text-xs text-[#1D1D1F]/35 hover:text-[#1D1D1F] transition mb-10">
          <ArrowLeft className="w-3.5 h-3.5" />
          Terug naar forum
        </Link>

        {/* Post */}
        <div className="bg-white rounded-2xl border border-black/6 p-6 sm:p-8 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: avatarColor(postCompany) }} />
            <span className="text-xs font-semibold text-[#1D1D1F]">{postCompany}</span>
            <span className="text-[#1D1D1F]/15">·</span>
            <span className="text-xs text-[#1D1D1F]/35">{formatDate(post.created_at)}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1D1D1F] leading-tight tracking-tight mb-4">{post.title}</h1>
          <p className="text-sm text-[#4A4A4F] leading-relaxed whitespace-pre-wrap mb-6">{post.content}</p>
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1.5 text-xs transition ${post.liked_by_me ? 'text-[#EF4444]' : 'text-[#1D1D1F]/30 hover:text-[#EF4444]'}`}
          >
            <Heart className={`w-3.5 h-3.5 ${post.liked_by_me ? 'fill-current' : ''}`} />
            {post.like_count} {post.like_count === 1 ? 'like' : 'likes'}
          </button>
        </div>

        {/* Replies */}
        {replies.map((reply) => {
          const rc = (reply.profiles as any)?.company_name ?? 'Onbekend';
          return (
            <div key={reply.id} className="bg-white rounded-2xl border border-black/6 p-5 sm:p-6 mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: avatarColor(rc) }} />
                <span className="text-xs font-semibold text-[#1D1D1F]">{rc}</span>
                <span className="text-[#1D1D1F]/15">·</span>
                <span className="text-xs text-[#1D1D1F]/35">{formatDate(reply.created_at)}</span>
              </div>
              <p className="text-sm text-[#4A4A4F] leading-relaxed whitespace-pre-wrap">{reply.content}</p>
            </div>
          );
        })}

        {/* Reply form */}
        {profile && (
          <div className="bg-white rounded-2xl border border-black/6 p-5 sm:p-6 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: avatarColor(profile.company_name) }} />
              <span className="text-xs text-[#1D1D1F]/40">{profile.company_name}</span>
            </div>
            <form onSubmit={handleReply}>
              <textarea
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                required
                rows={3}
                placeholder="Schrijf een antwoord…"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/8 bg-[#F5F5F7] text-sm text-[#1D1D1F] placeholder:text-[#1D1D1F]/25 focus:outline-none focus:ring-2 focus:ring-[#4B9FFF]/30 focus:border-[#4B9FFF] transition resize-none mb-3"
              />
              <button
                type="submit"
                disabled={submitting || !replyContent.trim()}
                className="flex items-center gap-2 px-5 py-2 bg-[#1D1D1F] text-white text-xs font-semibold rounded-full hover:bg-[#1D1D1F]/80 transition disabled:opacity-40"
              >
                <Send className="w-3 h-3" />
                {submitting ? 'Versturen…' : 'Plaatsen'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
