import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase, Post, Reply, PollOption } from '../lib/supabase';
import { sanitize } from '../lib/sanitize';
import { useAuth } from '../contexts/AuthContext';
import { DEMO_POST } from '../lib/demoPost';
import { LogOut, Heart, Send, Trash2, Pin, PinOff, Plus, X, BarChart2 } from 'lucide-react';

type ReplyWithProfile = Reply & { profiles?: { company_name: string } };

type PostWithMeta = Post & {
  profiles?: { company_name: string };
  like_count: number;
  liked_by_me: boolean;
  replies: ReplyWithProfile[];
  is_pinned: boolean;
  post_type: 'text' | 'poll';
  poll_options: PollOption[];
  my_vote?: string | null;
  vote_counts?: Record<string, number>;
};

/* ── Scroll-fade hook ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Single post card ── */
function PostCard({
  post, user, profile, onLike, onReply, onDelete, onPin, onVote, onDeleteReply,
}: {
  post: PostWithMeta;
  user: any;
  profile: any;
  onLike: (post: PostWithMeta, e: React.MouseEvent) => void;
  onReply: (postId: string, text: string) => Promise<void>;
  onDelete: (postId: string) => void;
  onPin: (post: PostWithMeta) => void;
  onVote: (postId: string, optionId: string) => void;
  onDeleteReply: (postId: string, replyId: string) => void;
}) {
  const ref = useFadeIn();
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [replyFocused, setReplyFocused] = useState(false);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSubmitting(true);
    await onReply(post.id, replyText.trim());
    setReplyText('');
    setSubmitting(false);
  };

  const company = (post.profiles as any)?.company_name ?? 'Onbekend';
  const totalVotes = post.poll_options?.reduce((sum, opt) => sum + (post.vote_counts?.[opt.id] ?? 0), 0) ?? 0;

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(18px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }} className="relative group/card">
      <div className={`absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#4B9FFF]/8 to-transparent blur-xl pointer-events-none transition-opacity duration-500 ${replyFocused || replyText ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-100'}`} />
    <div
      className="relative bg-white/85 backdrop-blur-sm rounded-2xl border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden"
    >
      {/* Post header */}
      <div className="px-5 pt-5 pb-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {post.is_pinned && <Pin className="w-3 h-3 text-[#4B9FFF]/60" />}
            <span className="text-xs font-semibold text-[#4B9FFF]">{company}</span>
            <span className="text-[#1D1D1F]/15">·</span>
            <span className="text-xs text-[#1D1D1F]/30 font-mono">
              {(() => {
                const d = new Date(post.created_at), now = new Date();
                const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
                if (diff < 60) return 'Nu';
                if (diff < 3600) return `${Math.floor(diff / 60)}m`;
                if (diff < 86400) return `${Math.floor(diff / 3600)}u`;
                if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
                return d.toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' });
              })()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <button
                onClick={() => onPin(post)}
                className="text-[#1D1D1F]/20 hover:text-[#4B9FFF]/60 transition-colors"
                title={post.is_pinned ? 'Losmaken' : 'Vastprikken'}
              >
                {post.is_pinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
              </button>
            )}
            {user?.id === post.author_id && (
              <button
                onClick={() => onDelete(post.id)}
                className="text-[#1D1D1F]/20 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Text post */}
        {post.post_type !== 'poll' && (
          <p className="text-sm text-[#1D1D1F]/80 leading-relaxed mb-4">{post.content}</p>
        )}

        {/* Poll post */}
        {post.post_type === 'poll' && (
          <div className="mb-4">
            <p className="text-sm text-[#1D1D1F]/80 leading-relaxed mb-3">{post.content}</p>
            <div className="flex flex-col gap-2">
              {(post.poll_options ?? []).map(opt => {
                const votes = post.vote_counts?.[opt.id] ?? 0;
                const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
                const voted = post.my_vote === opt.id;
                const hasVoted = !!post.my_vote;
                return (
                  <button
                    key={opt.id}
                    onClick={() => !hasVoted && onVote(post.id, opt.id)}
                    disabled={hasVoted}
                    className={`relative w-full text-left rounded-xl border px-4 py-2.5 overflow-hidden transition-all ${
                      voted
                        ? 'border-[#4B9FFF]/40 bg-[#4B9FFF]/5'
                        : hasVoted
                        ? 'border-black/6 bg-transparent cursor-default'
                        : 'border-black/8 bg-[#F5F5F7] hover:border-[#4B9FFF]/30 hover:bg-[#4B9FFF]/4 cursor-pointer'
                    }`}
                  >
                    {hasVoted && (
                      <div
                        className="absolute inset-y-0 left-0 bg-[#4B9FFF]/8 transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    )}
                    <div className="relative flex items-center justify-between">
                      <span className={`text-xs font-medium ${voted ? 'text-[#4B9FFF]' : 'text-[#1D1D1F]/70'}`}>{opt.text}</span>
                      {hasVoted && <span className="text-xs text-[#1D1D1F]/35 font-mono">{pct}%</span>}
                    </div>
                  </button>
                );
              })}
              {totalVotes > 0 && (
                <p className="text-xs text-[#1D1D1F]/25 font-mono mt-1">{totalVotes} {totalVotes === 1 ? 'stem' : 'stemmen'}</p>
              )}
            </div>
          </div>
        )}

        {/* Like */}
        <button
          onClick={(e) => onLike(post, e)}
          className={`flex items-center gap-1.5 text-xs transition-colors mb-4 ${post.liked_by_me ? 'text-red-400' : 'text-[#1D1D1F]/25 hover:text-red-400'}`}
        >
          <Heart className={`w-3.5 h-3.5 ${post.liked_by_me ? 'fill-current' : ''}`} />
          {post.like_count}
        </button>
      </div>

      {/* Replies — max ~5 zichtbaar, scrollbaar */}
      {post.replies.length > 0 && (
        <div className="border-t border-black/4 overflow-y-auto" style={{ maxHeight: '15rem' }}>
          {post.replies.map(reply => {
            const rc = (reply.profiles as any)?.company_name ?? 'Onbekend';
            const isOwn = user?.id === reply.author_id;
            return (
              <div key={reply.id} className="pl-12 pr-4 py-2.5 border-b border-black/3 last:border-0 flex items-start justify-between gap-2 group/reply">
                <div>
                  <span className="text-[0.68rem] font-semibold text-[#4B9FFF] mr-2">{rc}</span>
                  <span className="text-[0.68rem] text-[#1D1D1F]/55 leading-relaxed">{reply.content}</span>
                </div>
                {isOwn && (
                  <button
                    onClick={() => onDeleteReply(post.id, reply.id)}
                    className="opacity-0 group-hover/reply:opacity-100 transition text-[#1D1D1F]/20 hover:text-red-400 shrink-0 mt-0.5"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Reply form */}
      {profile && (
        <form onSubmit={handleReply} className="border-t border-black/4 px-5 py-3 flex items-center gap-3">
          <input
            type="text"
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            onFocus={() => setReplyFocused(true)}
            onBlur={() => setReplyFocused(false)}
            maxLength={2000}
            placeholder="Reageer…"
            className="flex-1 text-xs text-[#1D1D1F] placeholder:text-[#1D1D1F]/25 bg-transparent focus:outline-none"
          />
          {replyText.trim() && (
            <button type="submit" disabled={submitting} className="text-xs text-[#4B9FFF] font-semibold hover:text-[#4B9FFF]/70 transition disabled:opacity-40">
              {submitting ? '…' : 'Plaatsen'}
            </button>
          )}
        </form>
      )}
    </div>
    </div>
  );
}

/* ── Main ForumPage ── */
export function ForumPage() {
  const { profile, user, signOut } = useAuth();
  const [posts, setPosts] = useState<PostWithMeta[]>([]);
  const [loading, setLoading] = useState(true);

  // Compose state
  const [composeText, setComposeText] = useState('');
  const [composeType, setComposeType] = useState<'text' | 'poll'>('text');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [submitting, setSubmitting] = useState(false);

  // Demo post
  const [demoLiked, setDemoLiked] = useState(false);
  const [demoReplies, setDemoReplies] = useState<{ company: string; text: string }[]>([]);
  const [demoReplyText, setDemoReplyText] = useState('');
  const demoRef = useFadeIn();

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase
      .from('posts')
      .select('*, profiles(company_name)')
      .order('created_at', { ascending: false });

    if (!data) { setLoading(false); return; }

    const enriched = await Promise.all(data.map(async (post) => {
      const [{ count: likeCount }, { data: repliesData }, { data: myLike }, { data: votesData }] = await Promise.all([
        supabase.from('post_likes').select('*', { count: 'exact', head: true }).eq('post_id', post.id),
        supabase.from('replies').select('*, profiles(company_name)').eq('post_id', post.id).order('created_at', { ascending: true }),
        user ? supabase.from('post_likes').select('post_id').eq('post_id', post.id).eq('user_id', user.id).maybeSingle() : Promise.resolve({ data: null }),
        post.post_type === 'poll' ? supabase.from('poll_votes').select('option_id, user_id').eq('post_id', post.id) : Promise.resolve({ data: [] }),
      ]);

      const voteCounts: Record<string, number> = {};
      (votesData ?? []).forEach((v: any) => { voteCounts[v.option_id] = (voteCounts[v.option_id] ?? 0) + 1; });
      const myVote = user ? (votesData ?? []).find((v: any) => v.user_id === user.id)?.option_id ?? null : null;

      return {
        ...post,
        like_count: likeCount ?? 0,
        liked_by_me: !!myLike,
        replies: repliesData ?? [],
        is_pinned: post.is_pinned ?? false,
        post_type: post.post_type ?? 'text',
        poll_options: post.poll_options ?? [],
        vote_counts: voteCounts,
        my_vote: myVote,
      } as PostWithMeta;
    }));

    // Pinned first, then newest
    enriched.sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    setPosts(enriched);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const toggleLike = async (post: PostWithMeta, e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;
    if (post.liked_by_me) {
      await supabase.from('post_likes').delete().eq('post_id', post.id).eq('user_id', user.id);
    } else {
      await supabase.from('post_likes').insert({ post_id: post.id, user_id: user.id });
    }
    setPosts(prev => prev.map(p => p.id === post.id
      ? { ...p, liked_by_me: !p.liked_by_me, like_count: p.like_count + (p.liked_by_me ? -1 : 1) }
      : p));
  };

  const handleReply = async (postId: string, text: string) => {
    if (!user) return;
    const { data, error } = await supabase
      .from('replies')
      .insert({ post_id: postId, author_id: user.id, content: sanitize(text) })
      .select('*, profiles(company_name)')
      .single();
    if (!error && data) {
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, replies: [...p.replies, data] } : p));
    }
  };

  const handleDelete = async (postId: string) => {
    await supabase.from('posts').delete().eq('id', postId);
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const handleDeleteReply = async (postId: string, replyId: string) => {
    await supabase.from('replies').delete().eq('id', replyId);
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, replies: p.replies.filter(r => r.id !== replyId) } : p
    ));
  };

  const handlePin = async (post: PostWithMeta) => {
    const newVal = !post.is_pinned;
    await supabase.from('posts').update({ is_pinned: newVal }).eq('id', post.id);
    setPosts(prev => {
      const updated = prev.map(p => p.id === post.id ? { ...p, is_pinned: newVal } : p);
      return [...updated].sort((a, b) => {
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    });
  };

  const handleVote = async (postId: string, optionId: string) => {
    if (!user) return;
    await supabase.from('poll_votes').insert({ post_id: postId, option_id: optionId, user_id: user.id });
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const newCounts = { ...p.vote_counts, [optionId]: (p.vote_counts?.[optionId] ?? 0) + 1 };
      return { ...p, my_vote: optionId, vote_counts: newCounts };
    }));
  };

  const handleCompose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeText.trim() || !user) return;
    if (composeType === 'poll' && pollOptions.filter(o => o.trim()).length < 2) return;
    setSubmitting(true);

    const title = composeText.trim().split('\n')[0].slice(0, 80);
    const options: PollOption[] = composeType === 'poll'
      ? pollOptions.filter(o => o.trim()).map((text, i) => ({ id: `opt_${i}`, text: text.trim() }))
      : [];

    await supabase.from('posts').insert({
      author_id: user.id,
      title: sanitize(title),
      content: sanitize(composeText.trim()),
      post_type: composeType,
      ...(composeType === 'poll' ? { poll_options: options } : {}),
    });

    setComposeText('');
    setPollOptions(['', '']);
    setComposeType('text');
    await fetchPosts();
    setSubmitting(false);
  };

  const demoLikes = DEMO_POST.likes + (demoLiked ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="grain-overlay" aria-hidden="true" />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="/" className="tracking-widest font-bold text-[#1D1D1F]" style={{ fontSize: '1.05rem', fontFamily: "'Dyson Sans Modern', sans-serif" }}>
            aipec
          </a>
          <div className="flex items-center gap-3">
            {profile && (
              <span className="hidden sm:block text-xs font-semibold text-[#4B9FFF]">{profile.company_name}</span>
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
          <div className="h-px bg-black/8 mb-8" />
          <h1 className="text-4xl sm:text-5xl font-black text-[#1D1D1F] leading-[1.05] tracking-tight">Kennis delen</h1>
          <p className="text-4xl sm:text-5xl font-black text-[#1D1D1F]/15 leading-[1.05] tracking-tight">samen groeien.</p>
        </div>

        {/* Compose */}
        {profile && (
          <form onSubmit={handleCompose} className="bg-white/85 backdrop-blur-sm rounded-2xl border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-5 mb-4">
            {/* Type switcher */}
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => setComposeType('text')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition ${composeType === 'text' ? 'bg-[#1D1D1F] text-white' : 'text-[#1D1D1F]/40 hover:text-[#1D1D1F]'}`}
              >
                <Send className="w-3 h-3" /> Bericht
              </button>
              <button
                type="button"
                onClick={() => setComposeType('poll')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition ${composeType === 'poll' ? 'bg-[#4B9FFF] text-white' : 'text-[#1D1D1F]/40 hover:text-[#1D1D1F]'}`}
              >
                <BarChart2 className="w-3 h-3" /> Poll
              </button>
            </div>

            {/* Textarea */}
            <textarea
              value={composeText}
              onChange={e => setComposeText(e.target.value)}
              rows={3}
              maxLength={5000}
              placeholder={composeType === 'poll' ? 'Stel je vraag…' : 'Deel een gedachte…'}
              className="w-full text-sm text-[#1D1D1F] placeholder:text-[#1D1D1F]/25 bg-[#F7F7F7] rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#4B9FFF]/15 leading-relaxed mb-3"
            />

            {/* Poll options */}
            {composeType === 'poll' && (
              <div className="flex flex-col gap-2 mb-3">
                {pollOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={e => setPollOptions(prev => prev.map((o, j) => j === i ? e.target.value : o))}
                      placeholder={`Keuze ${i + 1}`}
                      className="flex-1 text-xs text-[#1D1D1F] placeholder:text-[#1D1D1F]/25 bg-[#F7F7F7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4B9FFF]/15"
                    />
                    {pollOptions.length > 2 && (
                      <button type="button" onClick={() => setPollOptions(prev => prev.filter((_, j) => j !== i))} className="text-[#1D1D1F]/25 hover:text-red-400 transition">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 4 && (
                  <button type="button" onClick={() => setPollOptions(prev => [...prev, ''])} className="flex items-center gap-1 text-xs text-[#4B9FFF]/60 hover:text-[#4B9FFF] transition">
                    <Plus className="w-3 h-3" /> Keuze toevoegen
                  </button>
                )}
              </div>
            )}

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={submitting || !composeText.trim()}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#1D1D1F] text-white text-xs font-semibold rounded-full hover:bg-[#1D1D1F]/80 transition disabled:opacity-35"
              >
                <Send className="w-3 h-3" />
                {submitting ? 'Plaatsen…' : 'Plaatsen'}
              </button>
            </div>
          </form>
        )}

        {/* Demo post */}
        <div
          ref={demoRef}
          style={{ opacity: 0, transform: 'translateY(18px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
          className="bg-white/85 backdrop-blur-sm rounded-2xl border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-3"
        >
          <div className="px-5 pt-5 pb-0">
            <div className="flex items-center gap-2 mb-3">
              <Pin className="w-3 h-3 text-[#4B9FFF]/50" />
              <span className="text-xs font-semibold text-[#4B9FFF]">{DEMO_POST.company}</span>
              <span className="text-[#1D1D1F]/15">·</span>
              <span className="text-xs text-[#1D1D1F]/30 font-mono">{DEMO_POST.date}</span>
            </div>
            <p className="text-sm text-[#1D1D1F]/80 leading-relaxed mb-4">{DEMO_POST.content}</p>
            <button
              onClick={() => setDemoLiked(v => !v)}
              className={`flex items-center gap-1.5 text-xs transition-colors mb-4 ${demoLiked ? 'text-red-400' : 'text-[#1D1D1F]/25 hover:text-red-400'}`}
            >
              <Heart className={`w-3.5 h-3.5 ${demoLiked ? 'fill-current' : ''}`} />
              {demoLikes}
            </button>
          </div>

          {/* Demo replies */}
          {demoReplies.length > 0 && (
            <div className="border-t border-black/4 overflow-y-auto" style={{ maxHeight: '15rem' }}>
              {demoReplies.map((r, i) => (
                <div key={i} className="px-5 py-3 border-b border-black/3 last:border-0">
                  <span className="text-xs font-semibold text-[#4B9FFF] mr-2">{r.company}</span>
                  <span className="text-xs text-[#1D1D1F]/60">{r.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Demo reply form */}
          {profile && (
            <form
              onSubmit={e => {
                e.preventDefault();
                if (!demoReplyText.trim()) return;
                setDemoReplies(prev => [...prev, { company: profile.company_name, text: demoReplyText.trim() }]);
                setDemoReplyText('');
              }}
              className="border-t border-black/4 px-5 py-3 flex items-center gap-3"
            >
              <input
                type="text"
                value={demoReplyText}
                onChange={e => setDemoReplyText(e.target.value)}
                placeholder="Reageer…"
                className="flex-1 text-xs text-[#1D1D1F] placeholder:text-[#1D1D1F]/25 bg-transparent focus:outline-none"
              />
              {demoReplyText.trim() && (
                <button type="submit" className="text-xs text-[#4B9FFF] font-semibold hover:text-[#4B9FFF]/70 transition">
                  Plaatsen
                </button>
              )}
            </form>
          )}
        </div>

        {/* Real posts */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-5 h-5 border-2 border-[#4B9FFF] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                user={user}
                profile={profile}
                onLike={toggleLike}
                onReply={handleReply}
                onDelete={handleDelete}
                onPin={handlePin}
                onVote={handleVote}
                onDeleteReply={handleDeleteReply}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
