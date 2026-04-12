"use client";

import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { 
  teacherStatsQueryOptions, 
  teacherCoursesQueryOptions, 
  teacherStudentsQueryOptions, 
  updateProfileMutationOptions,
} from "@/queries"; 
import { User, Course, IProfessionalLMS } from "@/types";
import { useAppStore } from "@/store/useStore";
import { useLocale, useTranslations } from "next-intl";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Users, Settings, LogOut, Search, DollarSign, 
  Moon, Sun, Menu, RefreshCw, GraduationCap, Star, X, CheckCircle, 
  Mail, Image as ImageIcon, Plus, Edit
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { toast } from "react-hot-toast";

// ============================================================
// Main Teacher Dashboard
// ============================================================

export default function TeacherDashboard() {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("dashboard");
  const darkMode = useAppStore((state) => state.darkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teacherId = session?.user?.id as string;

  // --- 1. Queries ---
  const { data: stats, isLoading: statsLoading } = useQuery(teacherStatsQueryOptions(teacherId));
  const { data: myCourses = [], isLoading: coursesLoading } = useQuery(teacherCoursesQueryOptions(teacherId));
  const { data: myStudents = [], isLoading: studentsLoading } = useQuery(teacherStudentsQueryOptions(teacherId));

  // --- 2. Mutations ---


  const profileMutation = useMutation({
    ...updateProfileMutationOptions(teacherId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
      toast.success(t("save_changes"));
    }
  });

  if (statsLoading || coursesLoading || studentsLoading) {
    return <LoadingScreen darkMode={darkMode} t={t} />;
  }

  return (
    <div 
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn(
        "flex min-h-screen transition-colors duration-500 font-sans ",
        darkMode ? "bg-[#0b0f1a] text-slate-200" : "bg-slate-50 text-slate-900",
        locale === "ar" ? "font-ghala" : "font-sans"
      )}
    >
      <TeacherSidebar t={t} activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} darkMode={darkMode} onLogout={() => signOut()} locale={locale} />

      <main className={cn(
        "flex-1 transition-all duration-300 " ,
        locale === "ar" ? "lg:mr-64" : "lg:ml-64"
      )}>
        <DashboardHeader t={t} user={session?.user as User} darkMode={darkMode} toggleDarkMode={toggleDarkMode} setSidebarOpen={setSidebarOpen} locale={locale} />

        <div className="p-4 mx-auto md:p-8 max-w-7xl">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <TeacherOverview stats={stats} courses={myCourses} darkMode={darkMode} openModal={() => setIsModalOpen(true)} locale={locale} t={t} />
              </motion.div>
            )}

            {activeTab === "courses" && (
              <motion.div key="courses" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl italic font-black tracking-tighter uppercase">{t("sidebar.courses")}</h2>
                 
                </div>
                <CoursesManagement courses={myCourses} darkMode={darkMode} locale={locale} />
              </motion.div>
            )}

            {activeTab === "students" && (
              <motion.div key="students" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <StudentsManagement students={myStudents} darkMode={darkMode} t={t} />
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div key="settings" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <ProfileSettings user={session?.user as User} darkMode={darkMode} mutation={profileMutation} t={t} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

 
    </div>
  );
}

// ============================================================
// UI Sub-Components
// ============================================================

function LoadingScreen({ darkMode, t }: any) {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen", darkMode ? "bg-[#0b0f1a]" : "bg-slate-50")}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
        <RefreshCw className="w-12 h-12 text-indigo-600" />
      </motion.div>
      <p className="mt-4 text-sm italic font-black tracking-widest uppercase opacity-50">{t("loading")}</p>
    </div>
  );
}

function TeacherSidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, darkMode, onLogout, t, locale }: any) {
  const menu = [
    { id: 'overview', icon: LayoutDashboard, label: t("sidebar.dashboard") },
    { id: 'courses', icon: BookOpen, label: t("sidebar.courses") },
    { id: 'students', icon: Users, label: t("my_learners") },
    { id: 'settings', icon: Settings, label: t("sidebar.settings") },
  ];

  return (
    <>
      <div className={cn("fixed  inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden", sidebarOpen ? "block" : "hidden")} onClick={() => setSidebarOpen(false)} />
      <aside className={cn(
        "fixed top-0 h-full w-64 z-50 transition-transform duration-500 lg:translate-x-0 border-x",
        locale === "ar" ? (sidebarOpen ? "right-0" : "right-[-100%] lg:right-0") : (sidebarOpen ? "left-0" : "left-[-100%] lg:left-0"),
        darkMode ? "bg-[#0b0f1a] border-slate-800" : "bg-white border-slate-200 shadow-xl"
      )}>
        <div className="flex items-center gap-3 p-8 mb-4">
          <div className="flex items-center justify-center w-10 h-10 text-white bg-indigo-600 shadow-lg rounded-xl shadow-indigo-600/20"><GraduationCap/></div>
          <span className="text-2xl italic font-black tracking-tighter uppercase">ETECH<span className="text-indigo-600">.</span></span>
        </div>
        <nav className="px-4 space-y-2">
          {menu.map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }} className={cn("w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all text-left", activeTab === item.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" : "text-slate-500 hover:bg-slate-500/5 hover:translate-x-2")}>
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-8 left-6 right-6">
          <button onClick={onLogout} className="flex items-center w-full gap-4 px-6 py-4 font-black text-red-500 transition-all hover:bg-red-500/5 rounded-2xl"><LogOut size={20}/> {t("sign_out")}</button>
        </div>
      </aside>
    </>
  );
}

function DashboardHeader({ user, darkMode, toggleDarkMode, setSidebarOpen, t, locale }: any) {
  return (
    <header className={cn("p-6 flex justify-between items-center border-b sticky top-0 z-40 backdrop-blur-xl", darkMode ? "bg-[#0b0f1a]/80 border-slate-800" : "bg-white/80 border-slate-200 shadow-sm")}>
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(true)} className="p-2 lg:hidden hover:bg-slate-500/10 rounded-xl"><Menu/></button>
        <div className="items-center hidden gap-3 px-5 py-3 transition-all border border-transparent md:flex bg-slate-500/5 rounded-2xl focus-within:border-indigo-500/50 w-80">
          <Search size={18} className="text-slate-500" />
          <input type="text" placeholder={t("search_placeholder")} className="w-full text-sm font-bold bg-transparent outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button onClick={toggleDarkMode} className="p-3 transition-all bg-slate-500/5 rounded-xl hover:scale-110">{darkMode ? <Sun className="text-amber-400" /> : <Moon className="text-indigo-600" />}</button>
        <div className={cn("flex items-center gap-3 ps-5 border-s border-slate-500/10")}>
          <div className={cn("hidden sm:block", locale === "ar" ? "text-left" : "text-right")}>
            <p className="text-sm font-black leading-none">{user?.name}</p>
            <p className="text-[10px] text-indigo-500 font-black uppercase mt-1 tracking-widest">{t("instructor")}</p>
          </div>
          <div className="flex items-center justify-center overflow-hidden text-xl font-black text-white bg-indigo-600 shadow-lg w-11 h-11 rounded-2xl shadow-indigo-600/20 ring-2 ring-indigo-500/20">
            {user?.image ? <img src={user.image} className="object-cover w-full h-full" alt="avatar" /> : user?.name?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}

function TeacherOverview({ stats, courses, darkMode, openModal, locale, t }: any) {
  const chartData = stats?.revenueChart || [];
  return (
    <div className="space-y-8">
      <div className="p-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="mb-2 text-4xl italic font-black tracking-tighter uppercase">{t("instructor_dashboard")}.</h1>
          <p className="max-w-md text-lg font-bold opacity-80">
            {locale === "ar" ? `لديك ${courses.length} دورات تعليمية نشطة حالياً.` : `You have ${courses.length} active courses currently.`} 
          </p>
       
        </div>
        <GraduationCap className="absolute transition-transform duration-700 -right-12 -bottom-12 opacity-10 group-hover:scale-110" size={300} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title={t("totalRevenue")} value={`$${stats?.totalRevenue || 0}`} icon={DollarSign} color="text-emerald-400" bg="bg-emerald-400/10" darkMode={darkMode} />
        <MetricCard title={t("activeStudents")} value={stats?.totalStudents || 0} icon={Users} color="text-blue-400" bg="bg-blue-400/10" darkMode={darkMode} />
        <MetricCard title={t("totalCourses")} value={courses.length} icon={BookOpen} color="text-purple-400" bg="bg-purple-400/10" darkMode={darkMode} />
        <MetricCard title={t("avgRating")} value={stats?.avgRating || "0.0"} icon={Star} color="text-amber-400" bg="bg-amber-400/10" darkMode={darkMode} />
      </div>

      <div className={cn("p-8 rounded-[3rem] border", darkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm")}>
        <h3 className="mb-8 text-xl font-black tracking-widest uppercase">{t("revenue_analytics")}</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1e293b" : "#e2e8f0"} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', background: darkMode ? '#1e293b' : '#fff' }} />
              <Area type="monotone" dataKey="rev" stroke="#6366f1" fill="url(#colorRev)" strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color, bg, darkMode }: any) {
  return (
    <div className={cn("p-7 rounded-[2.5rem] border transition-all hover:scale-[1.03]", darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-sm")}>
      <div className={cn("w-14 h-14 rounded-[1.25rem] flex items-center justify-center mb-5 shadow-lg", bg)}>
        <Icon className={cn("w-7 h-7", color)} />
      </div>
      <p className="mb-1 text-3xl font-black tracking-tighter">{value}</p>
      <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{title}</p>
    </div>
  );
}

function CoursesManagement({ courses, darkMode, locale }: any) {
  const t = useTranslations("dashboard");
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {courses.map((course: any) => (
        <div key={course.id} className={cn("p-6 rounded-[2.5rem] border group transition-all", darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-sm")}>
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 overflow-hidden rounded-3xl shrink-0 bg-slate-100">
              <img src={course.image || "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg"} className="object-cover w-full h-full transition-transform group-hover:scale-110" alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-black uppercase text-indigo-500">{course.category ? (typeof course.category === 'string' ? course.category : course.category[locale]) : (locale === 'ar' ? "محتوى تعليمي" : "Educational Content")}</span>
              </div>
              <h3 className="mt-1 text-xl font-black truncate">
                {typeof course.title === "string" 
                  ? course.title 
                  : (course.title as any)?.[locale] || "Untitled"}
              </h3>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 opacity-60"><Users size={14}/><span className="text-xs font-black">{course.enrolledStudents?.length || 0}</span></div>
                {course.price !== undefined && <div className="ml-auto text-lg font-black text-emerald-500">${course.price}</div>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StudentsManagement({ students, darkMode, t }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl italic font-black tracking-tighter uppercase">{t("my_learners")}</h2>
      <div className={cn("overflow-x-auto rounded-[2.5rem] border", darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200")}>
        <table className="w-full text-left">
          <thead className={cn("text-[10px] font-black uppercase tracking-widest", darkMode ? "bg-slate-800" : "bg-slate-50")}>
            <tr>
              <th className="p-6">{t("student_info")}</th>
              <th className="p-6">{t("email_address")}</th>
              <th className="p-6 text-right">{t("connect")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-500/10">
            {students.map((s: User) => (
              <tr key={s.id} className="transition-all hover:bg-indigo-500/5">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 overflow-hidden font-black text-indigo-600 rounded-xl bg-indigo-600/10">
                       {s.image ? <img src={s.image} className="object-cover w-full h-full" alt="" /> : s.name?.charAt(0)}
                    </div>
                    <span className="text-sm font-black">{s.name}</span>
                  </div>
                </td>
                <td className="p-6 text-sm italic font-bold opacity-60">{s.email}</td>
                <td className="p-6 text-right"><button className="p-3 transition-all bg-slate-500/5 rounded-xl text-slate-400 hover:text-indigo-600"><Mail size={18}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProfileSettings({ user, darkMode, mutation, t }: any) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    mutation.mutate({ name: fd.get("name") as string, image: fd.get("image") as string });
  };
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="mb-8 text-3xl italic font-black tracking-tighter text-center uppercase">{t("profile_settings")}</h2>
      <form onSubmit={handleSubmit} className={cn("p-10 rounded-[3rem] border space-y-6", darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-xl")}>
        <InputField label={t("full_name")} name="name" defaultValue={user?.name} icon={<Users size={18}/>} />
        <InputField label={t("profile_image_url")} name="image" defaultValue={user?.image} icon={<ImageIcon size={18}/>} />
        <button type="submit" disabled={mutation.isPending} className="flex items-center justify-center w-full gap-3 py-5 mt-4 font-black text-white transition-all bg-indigo-600 shadow-xl rounded-2xl hover:bg-indigo-700 disabled:opacity-50">
          {mutation.isPending ? <RefreshCw className="animate-spin" /> : <CheckCircle size={20}/>} {t("save_changes")}
        </button>
      </form>
    </div>
  );
}


function InputField({ label, icon, className, ...props }: any) {
  return (
    <div className="w-full space-y-2">
      <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">{label}</label>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-4 text-slate-400">{icon}</div>}
        <input 
          {...props} 
          className={cn(
            "w-full p-4 rounded-2xl bg-slate-500/5 border border-slate-500/10 outline-none focus:border-indigo-500 font-bold text-sm transition-all", 
            icon && "pl-12",
            className
          )} 
        />
      </div>
    </div>
  );
}

function TextAreaField({ label, ...props }: any) {
  return (
    <div className="w-full space-y-2">
      <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">{label}</label>
      <textarea {...props} rows={3} className="w-full p-4 text-sm font-bold transition-all border outline-none resize-none rounded-2xl bg-slate-500/5 border-slate-500/10 focus:border-indigo-500" />
    </div>
  );
}