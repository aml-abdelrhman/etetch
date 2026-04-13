"use client";

import { useState, useMemo, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userQueryOptions,
  updateProgressMutationOptions,
  updateProfileMutationOptions,
} from "@/queries";
import { useAppStore } from "@/store/useStore";
import { useLocale, useTranslations } from "next-intl";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // مستورد للتنقل
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  LogOut,
  Trophy,
  Clock,
  Award,
  ChevronRight,
  Moon,
  Sun,
  Menu,
  RefreshCw,
  Camera,
  Search,
  CheckCircle2,
  Zap,
  Settings,
  Calendar as CalendarIcon,
  Mail,
  Heart,
  Activity,
  Droplets,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Link } from "@/i18n/routing";

export default function StudentDashboard() {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("dashboard");
  const darkMode = useAppStore((state) => state.darkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const {
    data: studentProfile,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    ...userQueryOptions(session?.user?.id),
    enabled: !!session?.user?.id,
  });

  const updateProgressMutation = useMutation({
    ...updateProgressMutationOptions(),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user", session?.user?.id] }),
  });

  const updateProfileMutation = useMutation({
    ...updateProfileMutationOptions(session?.user?.id || ""),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user", session?.user?.id] }),
  });

  const stats = useMemo(
    () => ({
      totalCourses: studentProfile?.enrolledCourses?.length || 0,
      completedCourses:
        studentProfile?.enrolledCourses?.filter(
          (c: any) => (c.progress || 0) === 100,
        ).length || 0,
      totalHours: Number(studentProfile?.totalLearningHours?.toFixed(1)) || 0,
      certificates: studentProfile?.certificates?.length || 0,
      streak: studentProfile?.streak || 0,
    }),
    [studentProfile],
  );

  // منطق اختيار الكورس الحالي للزر
  const lastActiveCourse = useMemo(() => {
    if (!studentProfile?.enrolledCourses?.length) return null;

    return (
      studentProfile.enrolledCourses.find(
        (c: any) => c.progress > 0 && c.progress < 100,
      ) || studentProfile.enrolledCourses[0]
    );
  }, [studentProfile]); // تأكد إن الـ dependency هو studentProfile

  const handleResume = () => {
    if (lastActiveCourse) {
      router.push(`/courses/${lastActiveCourse.id}`);
    } else {
      router.push("/courses");
    }
  };

  const handleUpdateProgress = (courseId: string) => {
    if (!studentProfile) return;
    const course = studentProfile.enrolledCourses?.find(
      (c: any) => c.id === courseId,
    );
    const newProgress = Math.min((course?.progress || 0) + 10, 100);
    updateProgressMutation.mutate({
      userId: studentProfile.id,
      courseId,
      progress: newProgress,
      additionalHours: 0.5,
    });
  };

  if (isLoading) return <LoadingScreen t={t} />;
  if (isError || !studentProfile)
    return <ErrorScreen refetch={refetch} t={t} />;

  return (
    <div
      className={cn(
        "flex min-h-screen transition-all duration-500 font-sans",
        darkMode ? "bg-[#050505] text-white" : "bg-[#f4f7fe] text-slate-900",
      )}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        t={t}
        darkMode={darkMode}
        locale={locale}
      />

      <main
        className={cn(
          "flex-1 transition-all duration-300",
          locale === "ar" ? "lg:mr-72" : "lg:ml-72",
        )}
      >
        <Header
          user={studentProfile}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          t={t}
        />

        <div className="p-6 mx-auto lg:p-10 max-w-7xl">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <OverviewSection
                  user={studentProfile}
                  stats={stats}
                  t={t}
                  onResume={handleResume}
                  darkMode={darkMode}
                  locale={locale}
                />
              </motion.div>
            )}

            {activeTab === "courses" && (
              <motion.div
                key="courses"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <MyCoursesSection
                  user={studentProfile}
                  t={t}
                  darkMode={darkMode}
                  locale={locale}
                  onAction={handleUpdateProgress}
                  isUpdating={updateProgressMutation.isPending}
                />
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <AnalyticsSection
                  user={studentProfile}
                  darkMode={darkMode}
                  t={t}
                  locale={locale}
                />
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ProfileSection
                  user={studentProfile}
                  darkMode={darkMode}
                  isUpdating={updateProfileMutation.isPending}
                  onSave={(data: any) => updateProfileMutation.mutate(data)}
                  t={t}
                  locale={locale}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- قسم الإحصائيات مع الرسمين البيانيين ---
function AnalyticsSection({ user, darkMode, t, locale }: any) {
  // داتا الكورسات للـ Bar Chart
  const hasCourses = user.enrolledCourses && user.enrolledCourses.length > 0;

  const courseData = hasCourses
    ? user.enrolledCourses.map((c: any) => ({
        name: c.title?.[locale]?.substring(0, 10) + "...",
        progress: c.progress,
      }))
    : [];

  const hasActivity = user.weeklyActivity?.some((day: any) => day.hours > 0);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* الرسم البياني الأول: نشاط الأسبوع */}
      <div
        className={cn(
          "p-10 rounded-[3rem] border",
          darkMode
            ? "bg-white/5 border-white/5"
            : "bg-white border-slate-100 shadow-xl shadow-indigo-500/5",
        )}
      >
        <h3 className="mb-8 text-2xl font-black">
          {t("analytics.weeklyProgress")}
        </h3>
        {!hasActivity ? (
          <div className="flex flex-col items-center justify-center h-[350px] opacity-40 text-center">
            <Activity size={48} className="mb-4" />
            <p className="text-sm font-bold">{t("no_activity_yet")}</p>
          </div>
        ) : (
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={user.weeklyActivity}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.05}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: "bold" }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "20px",
                    border: "none",
                    background: darkMode ? "#1a1b23" : "#fff",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#6366f1"
                  strokeWidth={4}
                  fill="url(#colorHours)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* الرسم البياني الثاني: تقدم الكورسات */}
      <div
        className={cn(
          "p-10 rounded-[3rem] border",
          darkMode
            ? "bg-white/5 border-white/5"
            : "bg-white border-slate-100 shadow-xl shadow-indigo-500/5",
        )}
      >
        <h3 className="mb-8 text-2xl font-black">{t("courseProgress")}</h3>
        {!hasCourses ? (
          <div className="flex flex-col items-center justify-center h-[350px] opacity-40 text-center">
            <Trophy size={48} className="mb-4" />
            <p className="text-sm font-bold">{t("no_progress_yet")}</p>
          </div>
        ) : (
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.05}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fontWeight: "bold" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                  unit="%"
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "20px",
                    border: "none",
                    background: darkMode ? "#1a1b23" : "#fff",
                  }}
                />
                <Bar dataKey="progress" radius={[10, 10, 10, 10]} barSize={30}>
                  {courseData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#6366f1" : "#a855f7"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

// --- قسم الـ Overview مع الزر الجديد ---
function OverviewSection({ user, stats, t, onResume, darkMode }: any) {
  return (
    <div className="space-y-10">
      <div className="relative p-10 rounded-[3rem] bg-indigo-600 overflow-hidden text-white shadow-2xl shadow-indigo-500/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-24 blur-[100px]" />
        <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="space-y-5 text-center md:text-left rtl:md:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-widest">
              <Zap size={14} className="text-yellow-300 fill-yellow-300" />{" "}
              {stats.streak} {t("streak")}
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-6xl">
              {t("welcome")}, <br />{" "}
              <span className="text-indigo-200">{user.name.split(" ")[0]}</span>
            </h1>
          </div>
          <button
            onClick={onResume}
            className="relative px-10 py-5 bg-white text-indigo-600 rounded-[1.5rem] font-black shadow-xl hover:scale-105 active:scale-95 transition-all text-lg group"
          >
            {t("resume_btn")}
            <span className="absolute inset-0 rounded-[1.5rem] ring-4 ring-white/30 animate-ping group-hover:hidden" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label={t("enrolled")}
          value={stats.totalCourses}
          color="indigo"
          darkMode={darkMode}
        />
        <StatCard
          icon={Clock}
          label={t("hours")}
          value={`${stats.totalHours}h`}
          color="orange"
          darkMode={darkMode}
        />
        <StatCard
          icon={Trophy}
          label={t("completed")}
          value={stats.completedCourses}
          color="emerald"
          darkMode={darkMode}
        />
        <StatCard
          icon={Award}
          label={t("certificates")}
          value={stats.certificates}
          color="purple"
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

// --- باقي المكونات المساعدة ---
function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  locale,
  t,
}: any) {
  const menu = [
    { id: "overview", icon: LayoutDashboard, label: t("overview") },
    { id: "courses", icon: BookOpen, label: t("my_courses") },
    { id: "analytics", icon: BarChart3, label: t("analytics_tab") },
    { id: "settings", icon: Settings, label: t("settings") },
  ];
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden",
          sidebarOpen ? "visible" : "invisible",
        )}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={cn(
          "fixed top-0 bottom-0 z-[60] w-72 transition-all duration-500 lg:translate-x-0 border-r",
          darkMode
            ? "bg-[#050505] border-white/5"
            : "bg-white border-slate-100",
          locale === "ar"
            ? sidebarOpen
              ? "right-0"
              : "right-[-100%] lg:right-0"
            : sidebarOpen
              ? "left-0"
              : "left-[-100%] lg:left-0",
        )}
      >
        <div className="p-12 text-3xl italic font-black">
          ETECH<span className="text-indigo-600">.</span>
        </div>
        <nav className="px-6 space-y-3">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all",
                activeTab === item.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "opacity-40 hover:bg-indigo-500/5",
              )}
            >
              <item.icon size={20} />{" "}
              <span className="text-[11px] tracking-widest uppercase">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
        <button
          onClick={() => signOut()}
          className="absolute flex items-center gap-3 px-8 py-5 font-black text-red-500 transition-colors bottom-10 inset-x-6 bg-red-500/5 rounded-2xl hover:bg-red-500/10"
        >
          <LogOut size={20} />{" "}
          <span className="text-[10px] tracking-widest uppercase">
            {t("sign_out")}
          </span>
        </button>
      </aside>
    </>
  );
}

function Header({ user, darkMode, toggleDarkMode, setSidebarOpen, t }: any) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between px-8 py-4 backdrop-blur-xl border-b",
        darkMode
          ? "bg-black/40 border-white/5"
          : "bg-white/80 border-slate-200",
      )}
    >
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-2 transition-transform lg:hidden active:scale-90"
      >
        <Menu size={24} />
      </button>
      <div className="relative hidden md:block w-80 ps-4">
        <Search
          className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400"
          size={18}
        />
        <input
          placeholder={t("search_placeholder")}
          className={cn(
            "w-full pl-12 pr-4 py-2.5 rounded-2xl text-sm outline-none border transition-all",
            darkMode
              ? "bg-white/5 border-white/10 focus:border-indigo-500/50"
              : "bg-slate-100 border-transparent focus:bg-white focus:ring-4 ring-indigo-500/5",
          )}
        />
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500 hover:scale-110 transition-transform shadow-lg shadow-indigo-500/5"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="flex items-center gap-3 ps-4 border-s border-slate-500/10">
          <div className="hidden text-end sm:block">
            <p className="text-sm font-black tracking-tight">{user?.name}</p>
            <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">
              {t("student_status")}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 p-[2px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full rounded-[14px] bg-white dark:bg-black overflow-hidden">
              <img
                src={
                  user?.image ||
                  `https://ui-avatars.com/api/?name=${user?.name}`
                }
                className="object-cover w-full h-full"
                alt="user"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatCard({ icon: Icon, label, value, darkMode }: any) {
  return (
    <div
      className={cn(
        "p-8 rounded-[2.5rem] border",
        darkMode ? "bg-white/5 border-white/5" : "bg-white border-slate-100",
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-6 text-indigo-500 rounded-xl bg-indigo-500/10">
        <Icon size={24} />
      </div>
      <p className="mb-1 text-3xl font-black">{value}</p>
      <p className="text-[10px] font-black uppercase opacity-40">{label}</p>
    </div>
  );
}

function MyCoursesSection({
  user,
  t,
  darkMode,
  locale,
  onAction,
  isUpdating,
}: any) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black tracking-tighter">
          {t("my_courses")}
        </h2>
        {(user?.enrolledCourses?.length ?? 0) > 0 && (
          <span className="px-4 py-1 text-xs font-bold text-indigo-500 rounded-full bg-indigo-500/10">
            {user.enrolledCourses.length} {t("courses_count")}
          </span>
        )}
      </div>

      {!user?.enrolledCourses || user.enrolledCourses.length === 0 ? (
        <div
          className={cn(
            "p-20 text-center rounded-[3rem] border border-dashed",
            darkMode ? "border-white/10" : "border-slate-200",
          )}
        >
          <BookOpen className="mx-auto mb-6 opacity-20" size={64} />
          <h3 className="mb-2 text-xl font-bold">{t("no_courses_yet")}</h3>
          <p className="mb-8 opacity-50">{t("no_courses_subtitle")}</p>
          <Link href="/courses">
            <button className="px-8 py-4 font-black text-white transition-all bg-indigo-600 shadow-xl rounded-2xl hover:bg-indigo-700 shadow-indigo-600/20">
              {t("explore_courses")}
            </button>
          </Link>{" "}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {user.enrolledCourses.map((course: any) => (
            <div
              key={course.id}
              className={cn(
                "group p-5 rounded-[2.5rem] border transition-all hover:-translate-y-2",
                darkMode
                  ? "bg-[#0f1117] border-white/5"
                  : "bg-white border-slate-100",
              )}
            >
              <div className="relative h-48 w-full mb-6 overflow-hidden rounded-[2rem]">
                <img
                  src={course.image}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  alt="course"
                />
              </div>
              <h4 className="px-1 mb-3 text-xl font-black line-clamp-1">
                {course.title?.[locale]}
              </h4>
              <div className="flex items-center gap-3 px-1 mb-6">
                <img
                  src={course.teacherImage}
                  className="w-8 h-8 rounded-full"
                  alt="teacher"
                />
                <span className="text-xs font-bold opacity-50">
                  {course.teacher?.[locale]}
                </span>
              </div>
              <div className="px-1 mb-8 space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
                  <span>{t("progress")}</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
                  <div
                    className="h-full transition-all duration-1000 bg-indigo-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => onAction(course.id)}
                className="w-full py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 active:scale-95 transition-all"
              >
                {isUpdating ? (
                  <RefreshCw size={16} className="mx-auto animate-spin" />
                ) : (
                  t("continue")
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- قسم تعديل الملف الشخصي ---
function ProfileSection({
  user,
  darkMode,
  isUpdating,
  onSave,
  t,
  locale,
}: any) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    bio: user.bio || "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUpdate = () => onSave(formData);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-8">
        <div
          className={cn(
            "p-10 rounded-[3rem] border relative overflow-hidden",
            darkMode
              ? "bg-white/5 border-white/5"
              : "bg-white border-slate-100 shadow-xl shadow-indigo-500/5",
          )}
        >
          <div className="flex flex-col items-center gap-8 mb-12 md:flex-row">
            <div
              className="relative group"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-indigo-500 ring-8 ring-indigo-500/10 transition-transform group-hover:scale-95 cursor-pointer">
                <img
                  src={
                    user.image ||
                    `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff&size=300`
                  }
                  className="object-cover w-full h-full"
                  alt="avatar"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity cursor-pointer">
                <Camera className="text-white" size={32} />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
              />
            </div>
            <div className="space-y-2 text-center md:text-left rtl:md:text-right">
              <h2 className="text-4xl font-black tracking-tight">
                {user.name}
              </h2>
              <p className="text-indigo-500 font-bold uppercase text-[10px] tracking-[0.3em]">
                {t("student_status")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label={t("full_name")}
              value={formData.name}
              onChange={(val: any) => setFormData({ ...formData, name: val })}
              darkMode={darkMode}
            />
            <InputField
              label={t("email")}
              value={formData.email}
              onChange={(val: any) => setFormData({ ...formData, email: val })}
              darkMode={darkMode}
            />
          </div>
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="mt-10 flex items-center justify-center w-full gap-4 py-6 text-[11px] font-black tracking-[0.3em] text-white uppercase transition-all bg-indigo-600 shadow-2xl rounded-2xl shadow-indigo-600/30 hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
          >
            {isUpdating ? (
              <RefreshCw className="animate-spin" size={20} />
            ) : (
              <CheckCircle2 size={20} />
            )}
            {t("save_changes")}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <HealthStatCard
            icon={Heart}
            label={t("stats.pace")}
            value="80%"
            unit={t("stats.unit_pace")}
            color="rose"
            darkMode={darkMode}
          />
          <HealthStatCard
            icon={Activity}
            label={t("stats.memory")}
            value="4.75"
            unit={t("stats.unit_memory")}
            color="sky"
            darkMode={darkMode}
          />
          <HealthStatCard
            icon={Droplets}
            label={t("stats.focus")}
            value="5"
            unit={t("stats.unit_focus")}
            color="indigo"
            darkMode={darkMode}
          />
        </div>
      </div>
      <div className="space-y-8 lg:col-span-4">
        <div
          className={cn(
            "p-8 rounded-[2.5rem] border",
            darkMode
              ? "bg-white/5 border-white/5"
              : "bg-white border-slate-100 shadow-sm",
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-black tracking-tight">
              {t("upcoming_deadlines")}
            </h4>
            <CalendarIcon size={20} className="text-indigo-500 opacity-50" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2 text-[10px] font-black uppercase opacity-40">
              <span>
                {new Date().toLocaleString(locale, {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-black opacity-30">
              {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded-lg text-[10px] font-black transition-colors",
                    i + 1 === 18
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40"
                      : "hover:bg-indigo-500/10",
                  )}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={cn(
            "p-8 rounded-[2.5rem] border",
            darkMode
              ? "bg-white/5 border-white/5"
              : "bg-white border-slate-100",
          )}
        >
          <h4 className="mb-6 text-lg font-black">{t("last_certificates")}</h4>
          <div className="space-y-5">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center gap-4 group">
                <div className="flex items-center justify-center w-12 h-12 text-indigo-500 transition-all rounded-2xl bg-indigo-500/10 group-hover:bg-indigo-500 group-hover:text-white">
                  <Award size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black leading-tight">
                    Advanced React Patterns
                  </p>
                  <p className="text-[10px] opacity-40 font-bold">
                    Jan 20, 2026
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, darkMode }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black tracking-widest uppercase opacity-40 ml-1">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full p-5 rounded-2xl border outline-none focus:ring-4 ring-indigo-500/10 transition-all font-bold",
          darkMode
            ? "bg-black/40 border-white/10"
            : "bg-slate-50 border-slate-200",
        )}
      />
    </div>
  );
}

function HealthStatCard({
  icon: Icon,
  label,
  value,
  unit,
  color,
  darkMode,
}: any) {
  const colorMap: any = {
    rose: "text-rose-500 bg-rose-500/10 border-rose-500/10",
    sky: "text-sky-500 bg-sky-500/10 border-sky-500/10",
    indigo: "text-indigo-500 bg-indigo-500/10 border-indigo-500/10",
  };
  return (
    <div
      className={cn(
        "p-6 rounded-[2rem] border flex flex-col gap-4 transition-transform hover:scale-105",
        darkMode
          ? "bg-white/5 border-white/5"
          : "bg-white border-slate-100 shadow-lg shadow-slate-200/50",
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center border",
          colorMap[color],
        )}
      >
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase opacity-40 mb-1">
          {label}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black">{value}</span>
          <span className="text-[10px] opacity-40 font-bold">{unit}</span>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen({ t }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="w-12 h-12 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
      <p className="text-xs font-black tracking-widest uppercase">
        {t("loading")}
      </p>
    </div>
  );
}

function ErrorScreen({ refetch, t }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-2xl font-black tracking-tighter text-red-500 uppercase">
        {t("connection_failed")}
      </p>
      <button
        onClick={() => refetch()}
        className="px-10 py-4 font-black text-white transition-all bg-indigo-600 shadow-xl rounded-2xl shadow-indigo-500/40 hover:scale-105 active:scale-95"
      >
        {t("retry_now")}
      </button>
    </div>
  );
}
