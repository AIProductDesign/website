import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, Post, Reply } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Send } from 'lucide-react';

export function ForumPostPage() {
  const { id } = useParams<{ id: string }>();
  const { user, profile } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: postData }, { data: repliesData }] = await Promise.all([
        supabase.from('posts').select('*, profiles(company_name)').eq('id', id).single(),
        supabase.from('replies').select('*, profiles(company_name)').eq('post_id', id).order('created_at', { ascending: true }),
      ]);
      setPost(postData ?? null);
      setReplies(repliesData ?? []);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setSubmitting(true);

    const { data, error } = await supabase
      .from('replies')
      .insert({ post_id: id, author_id: user!.id, content: replyContent })
      .select('*, profiles(company_name)')
      .single();

    if (!error && data) {
      setReplies(prev => [...prev, data]);
      setReplyContent('');
    }
    setSubmitting(false);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#4B9FFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1D1D1F]/40 text-sm">
        Bericht niet gevonden.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <header className="bg-white border-b border-black/6 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <a href="/" className="tracking-widest font-bold text-[#1D1D1F]" style={{ fontFamily: "'Dyson Sans Modern', sans-serif" }}>
            aipec
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/forum" className="inline-flex items-center gap-1.5 text-sm text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Terug naar forum
        </Link>

        {/* Post */}
        <div className="bg-white rounded-2xl border border-black/6 p-6 sm:p-8 mb-6">
          <h1 className="text-xl font-semibold text-[#1D1D1F] leading-snug mb-3">{post.title}</h1>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs font-medium text-[#1D1D1F]/40">{(post.profiles as any)?.company_name ?? 'Onbekend'}</span>
            <span className="text-[#1D1D1F]/15">·</span>
            <span className="text-xs text-[#1D1D1F]/30">{formatDate(post.created_at)}</span>
          </div>
          <p className="text-sm text-[#1D1D1F]/70 leading-relaxed whitespace-pre-wrap">{post.content}</p>
        </div>

        {/* Replies */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-[#1D1D1F]/40 uppercase tracking-wider mb-3">
            {replies.length === 0 ? 'Nog geen antwoorden' : `${replies.length} antwoord${replies.length === 1 ? '' : 'en'}`}
          </h2>
          <div className="space-y-3">
            {replies.map(reply => (
              <div key={reply.id} className="bg-white rounded-2xl border border-black/6 p-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-xs font-medium text-[#1D1D1F]/50">{(reply.profiles as any)?.company_name ?? 'Onbekend'}</span>
                  <span className="text-[#1D1D1F]/15">·</span>
                  <span className="text-xs text-[#1D1D1F]/30">{formatDate(reply.created_at)}</span>
                </div>
                <p className="text-sm text-[#1D1D1F]/70 leading-relaxed whitespace-pre-wrap">{reply.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reply form */}
        <div className="bg-white rounded-2xl border border-black/6 p-5 sm:p-6">
          <p className="text-xs font-medium text-[#1D1D1F]/40 mb-3">
            Antwoorden als <span className="text-[#1D1D1F]/70">{profile?.company_name}</span>
          </p>
          <form onSubmit={handleReply} className="space-y-3">
            <textarea
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
              required
              rows={4}
              placeholder="Schrijf een antwoord…"
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] text-sm text-[#1D1D1F] placeholder:text-[#1D1D1F]/30 focus:outline-none focus:ring-2 focus:ring-[#4B9FFF]/40 focus:border-[#4B9FFF] transition resize-none"
            />
            <button
              type="submit"
              disabled={submitting || !replyContent.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1D1D1F] text-white text-sm font-semibold rounded-xl hover:bg-[#1D1D1F]/80 transition disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? 'Versturen…' : 'Antwoord plaatsen'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
