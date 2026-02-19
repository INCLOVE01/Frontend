import { supabase } from "@/lib/supabase";
import AdminPostRow from "./admin-post-rows";
import { Heart, MessageSquare, UserX, ShieldCheck } from "lucide-react";

export default async function AdminWallPage() {
  const [{ data: posts }, { data: stats }] = await Promise.all([
    supabase.from('posts').select('*').order('created_at', { ascending: false }),
    supabase.rpc('get_admin_dashboard_stats')
  ]);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Wall Moderation</h1>
        <p className="text-slate-500">Live community oversight and analytics.</p>
      </header>

      {/* SUMMARY TAB / STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Heart className="text-rose-500" size={20} />} 
          label="Total Loves" 
          value={stats?.total_likes || 0} 
        />
        <StatCard 
          icon={<MessageSquare className="text-blue-500" size={20} />} 
          label="Active Thoughts" 
          value={stats?.active_posts || 0} 
        />
        <StatCard 
          icon={<UserX className="text-amber-500" size={20} />} 
          label="Banned Users" 
          value={stats?.banned_users || 0} 
        />
        <StatCard 
          icon={<ShieldCheck className="text-emerald-500" size={20} />} 
          label="Moderated" 
          value={stats?.moderated_posts || 0} 
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Live Feed <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">Real-time</span>
        </h2>
        <div className="grid gap-4">
          {posts?.map((post) => (
            <AdminPostRow key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}