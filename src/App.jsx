// App.jsx
import { useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { image, title } from "framer-motion/client";

// =======================
//  DATA
// =======================

const profile = {
  name: "Franklyn Aldo Ignatia Lumbantoruan",
  role: "Final-year Information Technology Student",
  tagline:
    "Final-year IT student at Institut Teknologi Del studying information technology with a lot of web development skills. Competent in utilizing Laravel, PHP, JavaScript, CSS, and MySQL.",
  location: "Parapat, North Sumatera, Indonesia",
  email: "franklynsihombing2211@gmail.com",
  phone: "+6285925551916",
  status: "Open to Internship Opportunities",
  links: {
    linkedin:
      "https://www.linkedin.com/in/franklyn-aldo-ignatia-lumbantoruan-563b64341/",
    github: "https://github.com/Franklyn2211",
    instagram: "https://www.instagram.com/frklyn_/",
  },
};

const navSections = [
  { id: "status", label: "Profile" },
  { id: "portfolio", label: "Work" },
  { id: "contact", label: "Contact" },
];

const portfolioTabs = [
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "skills", label: "Skills" },
];

const projects = [
  {
    id: "ami",
    title: "Web-based Internal Quality Audit Information System (AMI)",
    short: "AMI · Internal QA system",
    tagline:
      "Final Year Project · Internal quality audit planning, self-evaluation, and follow-up tracking.",
    role: "Fullstack Developer",
    period: "Aug 2025 – Present",
    description:
      "Internal Quality Audit Information System to support end-to-end AMI workflow, from planning and self-evaluation to verification and follow-up monitoring.",
    tech: ["Laravel", "PHP", "MySQL", "Role-based Access Control"],
    highlights: [
      "Relational schema for standards, indicators, auditors, auditees, and audit results.",
      "Multi-role access (Admin, Auditor, Auditee) dengan tampilan dan hak akses berbeda.",
      "Dokumen dan checklist per siklus audit sehingga alur prosesnya jelas.",
    ],
    image: "/projects/ami-system.png",
    link: "",
  },
  {
    id: "lpk-mori",
    title: "LPK MORI Web-based Information System",
    short: "LPK MORI · Training center",
    tagline:
      "External Project · Platform registrasi dan manajemen pelatihan.",
    role: "Backend Developer",
    period: "Nov 2025 – Present",
    description:
      "Backend untuk platform LPK MORI yang mengurus kursus, peserta, dan alur sertifikasi.",
    tech: ["Laravel", "Inertia", "PostgreSQL", "RESTful API"],
    highlights: [
      "RESTful routes, controllers, dan business logic inti.",
      "Desain schema PostgreSQL dengan indexing dan integritas data.",
      "Integrasi dengan frontend Inertia.",
    ],
    image: "/projects/lpk-mori.png",
    link: "",
  },
  {
    id: "ambarita",
    title: "Ambarita Village Service Application (Admin Backend)",
    short: "Ambarita · Village admin",
    tagline:
      "Second Year Project · Web admin untuk layanan desa dan data penduduk.",
    role: "Backend Developer",
    period: "Jan 2025 – Jul 2025",
    description:
      "Admin/backend untuk aplikasi layanan desa yang berfokus pada data penduduk dan manajemen permohonan layanan.",
    tech: ["Laravel", "PHP", "MySQL"],
    highlights: [
      "CRUD warga, permohonan layanan, dan alur verifikasi.",
      "Autentikasi dan basic access control untuk admin.",
      "Merapikan proses administratif yang sebelumnya manual.",
    ],
    image: "/projects/ambarita-backend.png",
    link: "https://github.com/Franklyn2211/PA-2-Kel9.git",
  },
  {
    id: "rumah-damai",
    title: "Information System of Yayasan Pendidikan Anak Rumah Damai",
    short: "Rumah Damai · Foundation",
    tagline:
      "First Year Project · Public website dan internal dashboard untuk yayasan.",
    role: "Fullstack Developer",
    period: "Feb 2024 – Jun 2024",
    description:
      "Public site dan dashboard internal untuk mendukung operasi dan komunikasi yayasan anak.",
    tech: ["Laravel", "PHP", "JavaScript", "CSS", "MySQL"],
    highlights: [
      "Halaman publik untuk berita, pengumuman, program, dan kegiatan.",
      "Dashboard admin untuk mengelola konten halaman depan.",
      "Dashboard sekretaris untuk donor, relawan, partner, dan data donasi.",
    ],
    image: "/projects/rumah-damai.png",
    link: "https://github.com/Franklyn2211/PA-1-Kel1.git",
  },
  {
    id: "inspirasi-dapur",
    title: "Aplikasi Inspirasi Dapur",
    short: "Inspirasi Dapur · Mobile recipe app",
    tagline:
      "Course Project · Flutter-based recipe and cooking inspiration app for daily meals.",
    role: "Mobile App Developer",
    period: "2024",
    description:
      "Mobile recipe app built with Flutter that helps users find, add, and save cooking ideas. The app focuses on simple search, favorites, and basic authentication so each user can manage their own recipe collection.",
    tech: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore"],
    highlights: [
      "Search and browse recipes so users can quickly find ideas for daily cooking.",
      "Allow users to add their own recipes with ingredients and steps.",
      "Favorite list to save and organize frequently used recipes.",
      "Login, register, and logout flow to keep each user's recipes and favorites private."
    ],
    image: "/projects/inspirasi-dapur.png",
    link: "https://github.com/Franklyn2211/flutter_proyek_kel02.git",
  },
  {
    id: "event-organizer-pbo",
    title: "Desktop Event Organizer Management System (SMEO)",
    short: "PBO · Event Organizer desktop app",
    tagline:
      "Object-oriented desktop application for managing clients, events, and schedules.",
    role: "Desktop App Developer",
    period: "2024 – 2025",
    description:
      "Java-based desktop application (SMEO) for event organizer teams to manage client data, event details, and monthly schedules with a clear dashboard overview.",
    tech: ["Java", "JavaFX", "MySQL", "OOP"],
    highlights: [
      "Login dan register user dengan validasi kredensial ke database.",
      "Dashboard yang menampilkan ringkasan jumlah klien dan event serta status event (aktif/selesai).",
      "Manajemen data klien dan event: tambah, ubah, hapus, dan pencarian data.",
      "Modul schedule untuk melihat jadwal event per hari dalam satu bulan.",
      "Penerapan konsep OOP: abstraction, encapsulation, inheritance, dan polymorphism di controller dan model.",
    ],
    image: "/projects/event-organizer.png", // sesuaikan dengan nama file aset-mu
    link: "https://github.com/Franklyn2211/PBO_EO.git",
  },
];

const certificates = [
  {
    id: "google-data-analytics",
    title: "Google Data Analytics Professional Certificate",
    provider: "Coursera · Google",
    year: "2025",
    description:
      "Program delapan kursus tentang pengumpulan, pembersihan, analisis, dan visualisasi data untuk peran entry-level data analyst.",
    image: "/certificates/Coursera 1QMZ5R58P66Y.pdf",
    isPdf: true,
  },
  {
    id: "ai-engineer-millenial",
    title: "AI Engineer For Milenial",
    provider: "KOMDIGI · Digital Talent Scholarship",
    year: "2025",
    description:
      "Pelatihan singkat tentang penggunaan AI secara produktif, termasuk prinsip prompt yang benar dan cara menghindari kesalahan umum.",
    image: "/certificates/Sertifikat_FRANKLYN ALDO IGNATIA LUMBANTORUAN_AI Engineer For Milenial.pdf",
    link: "",
    isPdf: true,
  },
  {
    id: "domain-id",
    title: "Workshop Pembuatan Platform Digital Dengan Domain .id",
    provider: ".id Academy · PANDI · IT Del",
    year: "2025",
    description:
      "Workshop pengenalan platform digital menggunakan domain .id, branding, dan ekosistem domain Indonesia.",
    image: "/certificates/domain-id-workshop.png",
    link: "",
  },
  {
    id: "konsep-pemrograman",
    title: "Konsep Pemrograman",
    provider: "KOMDIGI · Digital Talent Scholarship",
    year: "2025",
    description:
      "Sertifikat mata kuliah dasar pemrograman tentang konsep fundamental dan problem solving.",
    image: "/certificates/Sertifikat_FRANKLYN ALDO IGNATIA LUMBANTORUAN_Konsep Pemrograman.pdf",
    link: "",
  },
  {
    id: "intro-python",
    title: "Introduction to Python Programming",
    provider: "Coursera · Pennsylvania University",
    year: "2025",
    description: "Kursus yang memberikan pengenalan kepada pemrograman dan bahasa Python.",
    image: "/certificates/Coursera QEV0OLZX4R5H.pdf",
  },
  {
    id: "kader-2024",
    title: "Sertifikat Penghargaan Panitia Kaderisasi 2024",
    provider: "Himpunan Mahasiswa Teknologi Informasi IT Del",
    year: "2024",
    description: "Sertifikat penghargaan sebagai panitia dalam kegiatan Kaderisasi HIMATIF IT Del 2024.",
    image: "/certificates/Franklyn Aldo Ignatia Lumbantoruan.pdf",
  },
  {
    id: "kader-2025",
    title: "Sertifikat Penghargaan Panitia Kaderisasi 2025",
    provider: "Himpunan Mahasiswa Teknologi Informasi IT Del",
    year: "2025",
    description: "Sertifikat penghargaan sebagai panitia dalam kegiatan Kaderisasi HIMATIF IT Del 2025.",
    image: "/certificates/Franklyn Aldo Ignatia Lumbantoruan.png",
  }
];

const skillGroups = [
  {
    id: "backend",
    title: "Backend & API",
    items: [
      "Laravel & PHP untuk aplikasi web berlapis",
      "RESTful API design dan routing yang rapi",
      "Autentikasi, otorisasi, dan role-based access",
    ],
  },
  {
    id: "database",
    title: "Database & Data",
    items: [
      "MySQL & PostgreSQL (schema, indexing, migration)",
      "Relational modelling untuk data akademik & administrasi",
      "Query debugging dan basic performance tuning",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: [
      "HTML, CSS, JavaScript untuk layout yang bersih",
      "Basic React & Inertia untuk view dinamis",
      "Penggunaan komponen UI yang konsisten",
    ],
  },
  {
    id: "workflow",
    title: "Tools & Workflow",
    items: [
      "Git & GitHub untuk kolaborasi",
      "Postman untuk uji API",
      "Dokumentasi dan komunikasi di tim kecil",
    ],
  },
];

// =======================
//  ANIMATION VARIANTS
// =======================

const sectionVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const cardAppear = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

// =======================
//  SMALL COMPONENTS
// =======================

function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-28 space-y-4"
    >
      <div className="flex items-center gap-3 mb-1">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <h2 className="text-[11px] font-mono uppercase tracking-[0.25em] text-rose-300">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>
      {children}
    </motion.section>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-[3px] border border-rose-500/60 bg-rose-600/25 px-2.5 py-1 text-[10px] text-rose-50 font-mono">
      {children}
    </span>
  );
}

function Window({ title, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/95 shadow-[0_0_0_1px_rgba(15,23,42,0.9),0_18px_40px_rgba(0,0,0,0.75)] ${className}`}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-slate-950/95 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-rose-500" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-400" />
          <span className="ml-3 text-[11px] font-mono uppercase tracking-[0.2em] text-slate-300">
            {title}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          v1.0 · PIXEL MODE
        </span>
      </div>
      <div className="px-4 py-4 md:px-6 md:py-6">{children}</div>
    </div>
  );
}

// =======================
//  SECTIONS
// =======================

function HeroSection() {
  return (
    <Section id="status" title="Profile">
      <Window title="FRANKLYN.EXE">
        {/* Game-style header bar */}
        <div className="mb-6 flex items-center justify-between border-b-2 border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <motion.div
              className="h-3 w-3 bg-emerald-400 rounded-[2px]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400">PLAYER STATUS: READY</span>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-12 bg-slate-800 border border-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-400"
                animate={{ width: ["60%", "100%", "60%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <span className="text-[9px] font-mono text-slate-500">EXP</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-start">
          {/* Left: avatar + CTA */}
          <motion.div
            className="flex flex-col items-center md:items-start gap-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 220 }}
          >
            <div className="relative">
              {/* Glow */}
              <motion.div
                className="absolute -inset-4 rounded-[24px] bg-gradient-to-tr from-rose-500/60 via-amber-300/40 to-sky-400/50 blur-3xl"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -inset-3 rounded-[24px] bg-gradient-to-bl from-emerald-500/40 via-purple-500/30 to-pink-500/40 blur-2xl"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1.1, 1, 1.1],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              {/* Foto besar - Pixel art style */}
              <motion.div
                className="relative h-44 w-44 md:h-56 md:w-56"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Pixel corners */}
                <div className="absolute -top-1 -left-1 h-4 w-4 border-t-4 border-l-4 border-rose-400" />
                <div className="absolute -top-1 -right-1 h-4 w-4 border-t-4 border-r-4 border-amber-400" />
                <div className="absolute -bottom-1 -left-1 h-4 w-4 border-b-4 border-l-4 border-sky-400" />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b-4 border-r-4 border-emerald-400" />

                <motion.div
                  className="relative h-full w-full border-4 border-slate-700 bg-slate-900 flex items-center justify-center overflow-hidden shadow-[0_0_0_2px_rgba(15,23,42,1),0_0_40px_rgba(244,63,94,0.3)]"
                  style={{ imageRendering: 'pixelated' }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(244,63,94,0.9)" }}
                >
                  <img
                    src="/profile1.jpg"
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                  {/* Scanline effect */}
                  {/* <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none" /> */}
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 2
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Level badge - Game style */}
              <motion.div
                className="absolute -bottom-5 -right-5 px-4 py-2 bg-slate-950 border-4 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.15, borderColor: "rgba(244,63,94,1)" }}
              >
                <div className="flex items-center gap-2">
                  <motion.img
                    src="pixels/avatar-2.png"
                    alt="Pixel avatar"
                    className="h-14 w-14 object-contain"
                    style={{ imageRendering: 'pixelated' }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div>
                    <div className="text-[9px] font-mono text-amber-300 leading-none">LVL</div>
                    <div className="text-lg font-bold font-mono text-amber-300 leading-none">20</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Player name tag - Game style */}
            <div className="w-full">
              <div className="border-4 border-slate-700 bg-slate-950/90 p-4 relative">
                {/* Pixel corner decorations */}
                <div className="absolute -top-1 -left-1 h-2 w-2 bg-rose-400" />
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-amber-400" />
                <div className="absolute -bottom-1 -left-1 h-2 w-2 bg-sky-400" />
                <div className="absolute -bottom-1 -right-1 h-2 w-2 bg-emerald-400" />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-emerald-400 animate-pulse" />
                    <h1 className="text-sm md:text-base font-bold font-mono tracking-wider text-slate-50 uppercase">
                      {profile.name}
                    </h1>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">
                    CLASS: {profile.role}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <motion.div
                      className="h-1.5 w-1.5 bg-emerald-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <p className="text-[9px] text-emerald-300 font-mono uppercase tracking-wider">
                      {profile.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons - Game style */}
            <motion.div
              className="w-full flex flex-col gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <motion.a
                href={`mailto:${profile.email}`}
                className="relative border-4 border-rose-500 bg-rose-600 px-4 py-3 text-center font-mono text-sm font-bold text-white uppercase shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] overflow-hidden group"
                whileHover={{ borderColor: "rgba(251,191,36,1)" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-lg">▶</span> CONTACT ME
                </span>
              </motion.a>

              <div className="grid grid-cols-3 gap-2">
                <motion.a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="border-3 border-slate-600 bg-slate-800 px-3 py-2 text-center font-mono text-[10px] font-bold text-slate-100 uppercase shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:border-rose-400 hover:text-rose-200 active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] transition-colors"
                >
                  GITHUB
                </motion.a>
                <motion.a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="border-3 border-slate-600 bg-slate-800 px-3 py-2 text-center font-mono text-[10px] font-bold text-slate-100 uppercase shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:border-sky-400 hover:text-sky-200 active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] transition-colors"
                >
                  LINKEDIN
                </motion.a>
                <motion.a
                  href={profile.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="border-3 border-slate-600 bg-slate-800 px-3 py-2 text-center font-mono text-[10px] font-bold text-slate-100 uppercase shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:border-pink-400 hover:text-pink-200 active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] transition-colors"
                >
                  INSTAGRAM
                </motion.a>
              </div>

              {/* Download CV Button */}
              <motion.a
                href="/CVResume_Franklyn Aldo Ignatia Lumbantoruan.pdf"
                download="CVResume_Franklyn Aldo Ignatia Lumbantoruan.pdf"
                className="mt-2 border-4 border-amber-400 bg-amber-500 px-4 py-2 text-center font-mono text-[11px] font-bold text-slate-900 uppercase shadow-[4px_4px_0px_0px_rgba(251,191,36,0.7)] hover:bg-amber-400 active:shadow-[2px_2px_0px_0px_rgba(251,191,36,0.7)] active:translate-x-[2px] active:translate-y-[2px] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download CV (PDF)
              </motion.a>
            </motion.div>

            {/* Stats bars - Game style */}
            <div className="w-full space-y-2 hidden md:block">
              {/* HP Bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-rose-400">HP</span>
                  <span className="text-[8px] font-mono text-slate-400">100/100</span>
                </div>
                <div className="h-3 w-full bg-slate-900 border-2 border-slate-700 overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-400"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:4px_100%]" />
                </div>
              </div>

              {/* MP Bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-sky-400">MP</span>
                  <span className="text-[8px] font-mono text-slate-400">85/100</span>
                </div>
                <div className="h-3 w-full bg-slate-900 border-2 border-slate-700 overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky-500 to-sky-400"
                    initial={{ width: "0%" }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:4px_100%]" />
                </div>
              </div>

              {/* EXP Bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-amber-400">EXP</span>
                  <span className="text-[8px] font-mono text-slate-400">750/1000</span>
                </div>
                <div className="h-3 w-full bg-slate-900 border-2 border-slate-700 overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                    animate={{ width: ["0%", "75%"] }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:4px_100%]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: text + stats */}
          <motion.div
            className="space-y-4 text-sm text-slate-300"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.05, type: "spring" }}
          >
            {/* Character Bio Panel */}
            <div className="border-4 border-slate-700 bg-slate-950/95 p-4 relative">
              <div className="absolute -top-2 left-3 bg-slate-950 px-2">
                <span className="text-[9px] font-mono uppercase tracking-wider text-sky-400 font-bold">[ CHARACTER BIO ]</span>
              </div>
              <p className="text-[12px] leading-relaxed mt-1">{profile.tagline}</p>
            </div>

            {/* Stats - Pixel game style */}
            <div className="grid gap-3 sm:grid-cols-3 text-[11px] font-mono">
              {[
                { label: "STR", sublabel: "Focus", value: "Software Engineer · Developer", color: "rose" },
                { label: "INT", sublabel: "Projects", value: `${projects.length} main builds`, color: "sky" },
                { label: "DEX", sublabel: "Location", value: "North Sumatra", color: "amber" },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  className="border-3 border-slate-700 bg-slate-950/90 px-3 py-3 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{
                    y: -4,
                    borderColor: item.color === 'rose' ? 'rgba(244,63,94,1)' : item.color === 'sky' ? 'rgba(56,189,248,1)' : 'rgba(251,191,36,1)',
                    boxShadow: `5px 5px 0px 0px rgba(15,23,42,1)`
                  }}
                >
                  {/* Corner pixels */}
                  <div className={`absolute top-0 left-0 h-1.5 w-1.5 bg-${item.color}-400`} />
                  <div className={`absolute top-0 right-0 h-1.5 w-1.5 bg-${item.color}-400`} />

                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-${item.color}-400 font-bold uppercase tracking-wider text-sm`}>
                      {item.label}
                    </p>
                    <motion.div
                      className={`h-2 w-2 bg-${item.color}-400`}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                    />
                  </div>
                  <p className="text-[8px] text-slate-500 uppercase mb-1">{item.sublabel}</p>
                  <p className="text-[10px] text-slate-200">{item.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Equipment Inventory */}
            <div className="border-4 border-amber-500/50 bg-slate-950/95 p-4 relative">
              <div className="absolute -top-2 left-3 bg-slate-950 px-2">
                <span className="text-[9px] font-mono uppercase tracking-wider text-amber-400 font-bold">[ EQUIPPED SKILLS ]</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[
                  { name: 'Laravel', logo: '/logos/laravel.svg', fallback: 'LRV' },
                  { name: 'PHP', logo: '/logos/php.svg', fallback: 'PHP' },
                  { name: 'MySQL', logo: '/logos/mysql.png', fallback: 'SQL' },
                  { name: 'React', logo: '/logos/react.svg', fallback: 'RCT' },
                  { name: 'Git', logo: '/logos/git.svg', fallback: 'GIT' },
                  { name: 'Postman', logo: '/logos/postman.svg', fallback: 'API' },
                  { name: 'PostgreSQL', logo: '/logos/postgresql.svg', fallback: 'PG' },
                  { name: 'JavaScript', logo: '/logos/javascript.svg', fallback: 'JS' },
                ].map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    className="aspect-square border-3 border-slate-600 bg-slate-900 hover:border-amber-400 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[3px_3px_0px_0px_rgba(251,191,36,0.5)] flex items-center justify-center relative group p-1.5"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.05, type: 'spring' }}
                    whileHover={{ y: -3 }}
                  >
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-3/6 h-3/6 object-contain filter brightness-90 group-hover:brightness-110 transition-all"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="hidden text-[10px] font-bold font-mono text-amber-300">{skill.fallback}</span>
                    <div className="absolute bottom-full mb-1 hidden group-hover:block bg-slate-950 border-2 border-amber-400 px-2 py-1 text-[8px] font-mono whitespace-nowrap z-20">
                      {skill.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievement/Quest Progress */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                className="border-3 border-purple-500/50 bg-slate-950/90 p-3 shadow-[3px_3px_0px_0px_rgba(168,85,247,0.3)] relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ y: -3, borderColor: 'rgba(168,85,247,1)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 border-2 border-purple-400 bg-purple-900/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-purple-300">★</span>
                  </div>
                  <div>
                    <p className="text-[8px] text-purple-400 font-mono uppercase">Achievements</p>
                    <p className="text-lg font-bold font-mono text-purple-300">{certificates.length}</p>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-900 border border-slate-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.3, duration: 1 }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="border-3 border-cyan-500/50 bg-slate-950/90 p-3 shadow-[3px_3px_0px_0px_rgba(34,211,238,0.3)] relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ y: -3, borderColor: 'rgba(34,211,238,1)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 border-2 border-cyan-400 bg-cyan-900/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-cyan-300">▣</span>
                  </div>
                  <div>
                    <p className="text-[8px] text-cyan-400 font-mono uppercase">Projects</p>
                    <p className="text-lg font-bold font-mono text-cyan-300">{projects.length}</p>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-900 border border-slate-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.3, duration: 1 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Quest box */}
            <div className="border-4 border-emerald-500/50 bg-slate-950/90 px-4 py-3 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.3)] relative">
              <div className="absolute -top-2 left-3 bg-slate-950 px-2">
                <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-bold">[ ! ] ACTIVE QUEST</span>
              </div>
              <div className="flex items-start gap-3 mt-1">
                <motion.div
                  className="h-3 w-3 bg-emerald-400 flex-shrink-0 mt-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <p className="text-[11px] font-mono text-slate-300 leading-relaxed">
                  Looking for an internship in{" "}
                  <span className="text-emerald-300 font-bold">software development</span>.
                  Interested in working on real products, improving code quality, and learning from experienced developers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Window>
    </Section>
  );
}

function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  return (
    <Section id="portfolio" title="Work">
      <Window title="PORTFOLIO.BIN">
        {/* Tabs */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3 mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            {portfolioTabs.map((tab) => (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] transition-colors duration-200 ${activeTab === tab.id
                  ? "text-rose-200"
                  : "text-slate-300 hover:text-rose-400"
                  }`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.08 }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="portfolioTab"
                    className="absolute inset-0 rounded-lg bg-slate-800"
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 22,
                    }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          <motion.p
            className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-500"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {projects.length} Projects · {certificates.length} Certificates
          </motion.p>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((p, idx) => (
                <motion.article
                  key={p.id}
                  variants={cardAppear}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  className="group border-4 border-slate-700 bg-slate-950 overflow-hidden flex flex-col hover:border-rose-500 transition-all duration-300 cursor-pointer shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[8px_8px_0px_0px_rgba(244,63,94,0.5)] relative"
                  whileHover={{ y: -8, x: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: idx * 0.03,
                  }}
                  onClick={() => setSelectedProject(p)}
                >
                  {/* Pixel corners */}
                  <div className="absolute top-0 left-0 h-3 w-3 border-t-4 border-l-4 border-rose-400 z-10" />
                  <div className="absolute top-0 right-0 h-3 w-3 border-t-4 border-r-4 border-amber-400 z-10" />
                  <div className="absolute bottom-0 left-0 h-3 w-3 border-b-4 border-l-4 border-sky-400 z-10" />
                  <div className="absolute bottom-0 right-0 h-3 w-3 border-b-4 border-r-4 border-emerald-400 z-10" />
                  <div className="relative h-40">
                    <motion.img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover cursor-zoom-in group-hover:brightness-110 transition"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.35 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview({
                          src: p.image,
                          title: p.title,
                          subtitle: p.short,
                        });
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                    <div className="absolute left-3 right-3 bottom-3 flex items-end justify-between gap-2">
                      <div className="space-y-1">
                        <Badge>{p.short}</Badge>
                        <p className="text-[10px] font-mono text-slate-300">
                          {p.period}
                        </p>
                      </div>
                      {idx < 2 && (
                        <motion.span
                          className="text-[9px] font-mono uppercase tracking-[0.18em] text-amber-300"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: 0.2 + idx * 0.1,
                            type: "spring",
                          }}
                        >
                          Core Build
                        </motion.span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col p-4 text-sm text-slate-200 space-y-2">
                    <motion.h3
                      className="font-semibold text-slate-50 line-clamp-2"
                      whileHover={{ color: "#f43f5e" }}
                    >
                      {p.title}
                    </motion.h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {p.tagline}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Role: {p.role}
                    </p>
                    <div className="flex flex-col gap-2 pt-2 mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-[3px] border border-slate-700 bg-slate-950/80 px-2 py-0.5 text-[10px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(p);
                          }}
                          className="flex-1 text-[11px] font-mono border border-rose-500 px-3 py-1 rounded-[3px] bg-rose-600/90 text-rose-50 hover:bg-rose-500 transition-colors shadow hover:shadow-rose-500/30"
                          whileTap={{ scale: 0.93 }}
                        >
                          Details
                        </motion.button>
                        {p.link && (
                          <motion.a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 text-[11px] font-mono border border-slate-600 px-3 py-1 rounded-[3px] bg-slate-800 text-slate-100 hover:border-sky-500 hover:text-sky-200 transition-colors flex items-center justify-center gap-1"
                            whileTap={{ scale: 0.93 }}
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            GitHub
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {certificates.map((c, idx) => (
                <motion.article
                  key={c.id}
                  variants={cardAppear}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  className="border-4 border-amber-500/60 bg-slate-950 overflow-hidden flex flex-col hover:border-amber-400 transition-all cursor-pointer shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[8px_8px_0px_0px_rgba(251,191,36,0.5)] relative"
                  whileHover={{ y: -8, rotate: 0 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: idx * 0.03,
                  }}
                  onClick={() => setSelectedCertificate(c)}
                >
                  {/* Achievement star */}
                  <div className="absolute -top-3 -right-3 z-10">
                    <motion.div
                      className="h-8 w-8 bg-amber-400 border-3 border-amber-600 flex items-center justify-center shadow-lg"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <span className="text-amber-900 text-lg font-bold">★</span>
                    </motion.div>
                  </div>
                  <div className="relative h-40 bg-slate-950">
                    {c.isPdf || (typeof c.image === 'string' && c.image.toLowerCase().endsWith('.pdf')) ? (
                      <div
                        className="h-full w-full flex items-center justify-center bg-slate-900 border-b border-slate-800 overflow-hidden cursor-pointer"
                      >
                        <embed
                          src={c.image}
                          type="application/pdf"
                          className="h-full w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute left-3 bottom-3 space-y-1 pointer-events-none">
                          <Badge>{c.provider}</Badge>
                        </div>
                      </div>
                    ) : (
                      <motion.img
                        src={c.image}
                        alt={c.title}
                        className="h-full w-full object-cover cursor-zoom-in hover:brightness-110 transition"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.35 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview({
                            src: c.image,
                            title: c.title,
                            subtitle: c.provider,
                          });
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col p-4 text-sm text-slate-200 space-y-2">
                    <motion.h3
                      className="font-semibold text-slate-50 line-clamp-2"
                      whileHover={{ color: "#38bdf8" }}
                    >
                      {c.title}
                    </motion.h3>
                    <p className="text-[11px] text-slate-400">
                      Year: {c.year}
                    </p>
                    <p className="text-[11px] text-slate-300 line-clamp-3">
                      {c.description}
                    </p>
                    {/* Verification link removed as requested */}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid gap-5 md:grid-cols-2"
            >
              {skillGroups.map((g, idx) => (
                <motion.article
                  key={g.id}
                  variants={cardAppear}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="border-4 border-slate-700 bg-gradient-to-br from-slate-950 to-slate-900 p-5 flex flex-col gap-3 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden"
                  whileHover={{
                    y: -6,
                    borderColor: "rgba(244,63,94,0.8)",
                    boxShadow: "7px 7px 0px 0px rgba(244,63,94,0.3)"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: idx * 0.04,
                  }}
                >
                  {/* Rarity indicator */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400" />

                  {/* Corner decorations */}
                  <div className="absolute top-1 left-1 h-2 w-2 bg-rose-400" />
                  <div className="absolute top-1 right-1 h-2 w-2 bg-amber-400" />
                  <h3 className="text-sm font-semibold text-slate-50">
                    {g.title}
                  </h3>
                  <ul className="space-y-1.5 text-[12px] text-slate-300">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span className="mt-[6px] h-1 w-1 bg-rose-400" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="max-w-2xl w-full rounded-2xl border border-slate-700 bg-slate-950 p-5 text-sm text-slate-200 shadow-2xl shadow-black/80"
                initial={{ scale: 0.9, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 40, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="flex items-start justify-between gap-4 mb-3"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div>
                    <p className="text-[10px] font-mono text-rose-300 uppercase mb-1">
                      Project Detail
                    </p>
                    <h3 className="text-base font-semibold text-slate-50">
                      {selectedProject.title}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {selectedProject.role} · {selectedProject.period}
                    </p>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="text-[11px] font-mono px-3 py-1 border border-slate-600 rounded-[3px] hover:border-rose-500 hover:text-rose-200 transition-colors"
                    whileTap={{ scale: 0.92 }}
                  >
                    Close
                  </motion.button>
                </motion.div>

                <motion.p
                  className="mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  {selectedProject.description}
                </motion.p>

                <div className="mb-3">
                  <p className="text-[10px] font-mono text-rose-300 mb-1 uppercase">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-[3px] border border-slate-700 bg-slate-900 px-2 py-1 text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-mono text-rose-300 mb-1 uppercase">
                    Highlights
                  </p>
                  <ul className="space-y-1.5 text-[13px] text-slate-200">
                    {selectedProject.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-[6px] h-1 w-1 bg-rose-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certificate modal */}
        <AnimatePresence>
          {selectedCertificate && (
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
            >
              <motion.div
                className="max-w-xl w-full rounded-2xl border border-sky-700 bg-slate-950 p-5 text-sm text-slate-200 shadow-2xl shadow-black/80"
                initial={{ scale: 0.9, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 40, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="flex items-start justify-between gap-4 mb-3"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div>
                    <p className="text-[10px] font-mono text-sky-300 uppercase mb-1">
                      Certificate Detail
                    </p>
                    <h3 className="text-base font-semibold text-slate-50">
                      {selectedCertificate.title}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {selectedCertificate.provider} ·{" "}
                      {selectedCertificate.year}
                    </p>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => setSelectedCertificate(null)}
                    className="text-[11px] font-mono px-3 py-1 border border-slate-600 rounded-[3px] hover:border-sky-500 hover:text-sky-200 transition-colors"
                    whileTap={{ scale: 0.92 }}
                  >
                    Close
                  </motion.button>
                </motion.div>

                <motion.p
                  className="mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  {selectedCertificate.description}
                </motion.p>

                <div className="mb-3">
                  <p className="text-[10px] font-mono text-sky-300 mb-1 uppercase">
                    Certificate Preview
                  </p>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-2 flex items-center justify-center">
                    {(() => {
                      const pdfSrc = selectedCertificate.image?.endsWith('.pdf')
                        ? selectedCertificate.image
                        : selectedCertificate.link?.endsWith('.pdf')
                          ? selectedCertificate.link
                          : null;
                      if (selectedCertificate.isPdf || pdfSrc) {
                        return (
                          <embed
                            src={pdfSrc || selectedCertificate.image}
                            type="application/pdf"
                            className="w-full h-96 rounded-lg"
                          />
                        );
                      }
                      return (
                        <img
                          src={selectedCertificate.image}
                          alt={selectedCertificate.title}
                          className="max-h-64 w-auto object-contain mx-auto"
                        />
                      );
                    })()}
                  </div>
                </div>

                {/* Verification link removed as requested */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image preview modal */}
        <AnimatePresence>
          {imagePreview && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setImagePreview(null)}
            >
              <motion.div
                className="max-w-3xl w-full rounded-2xl border border-slate-700 bg-slate-950/95 p-4 md:p-5 shadow-2xl shadow-black/80"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[10px] font-mono text-rose-300 uppercase mb-1">
                      Image Preview
                    </p>
                    <h3 className="text-sm font-semibold text-slate-50">
                      {imagePreview.title}
                    </h3>
                    {imagePreview.subtitle && (
                      <p className="text-[11px] text-slate-400">
                        {imagePreview.subtitle}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="text-[11px] font-mono px-3 py-1 border border-slate-600 rounded-[3px] hover:border-rose-500 hover:text-rose-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
                <div className="max-h-[70vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900">
                  <img
                    src={imagePreview.src}
                    alt={imagePreview.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Window>
    </Section>
  );
}

function ContactSection() {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <Section id="contact" title="Contact">
      <Window title="CONTACT.LOG">
        {/* NPC Interaction Style */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          {/* Left: NPC Character */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {/* NPC Dialog Box */}
            <div className="border-4 border-slate-700 bg-slate-950/95 p-5 relative">
              <div className="absolute -top-3 left-4 bg-slate-950 px-3 py-1 border-3 border-slate-700">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">[ NPC DIALOG ]</span>
              </div>

              {/* NPC Avatar */}
              <div className="flex gap-4 mb-4 mt-2">
                <motion.div
                  className="w-20 h-20 border-4 border-emerald-400 bg-slate-900 flex items-center justify-center flex-shrink-0"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">F</div>
                    <div className="text-[8px] font-mono text-emerald-300">DEV</div>
                  </div>
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 bg-emerald-400 animate-pulse" />
                    <p className="text-sm font-bold font-mono text-emerald-400">FRANKLYN_NPC</p>
                  </div>
                  <motion.div
                    className="text-[11px] leading-relaxed text-slate-300 font-mono space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="border-l-2 border-emerald-400 pl-3">
                      "Hi, I'm Franklyn, an IT student focusing on web and backend development."
                    </p>
                    <p className="border-l-2 border-sky-400 pl-3">
                      "I work on backend systems, build and maintain APIs, and manage databases using Laravel, PHP, and SQL."
                    </p>
                    <p className="border-l-2 border-rose-400 pl-3">
                      "I'm looking for an internship where I can contribute to real projects and keep learning from the team."
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Dialog choices - Contact options */}
              <div className="space-y-2">
                <p className="text-[9px] font-mono text-slate-500 uppercase mb-3">➤ Choose your action:</p>

                <motion.a
                  href={`mailto:${profile.email}`}
                  className="block border-4 border-rose-500 bg-rose-600 px-4 py-3 text-center font-mono text-sm font-bold text-white uppercase shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(244,63,94,0.5)] active:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] group relative overflow-hidden"
                  whileHover={{ borderColor: "rgba(251,191,36,1)" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>[@]</span> Contact via Email
                  </span>
                </motion.a>

                <div className="grid grid-cols-2 gap-2">
                  <motion.a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="border-3 border-slate-600 bg-slate-800 px-3 py-2.5 text-center font-mono text-[10px] font-bold text-slate-100 uppercase shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:border-purple-400 hover:text-purple-200 hover:shadow-[4px_4px_0px_0px_rgba(168,85,247,0.5)] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
                    whileHover={{ y: -2 }}
                  >
                    <span className="block mb-1">[GIT]</span> GitHub
                  </motion.a>
                  <motion.a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="border-3 border-slate-600 bg-slate-800 px-3 py-2.5 text-center font-mono text-[10px] font-bold text-slate-100 uppercase shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:border-sky-400 hover:text-sky-200 hover:shadow-[4px_4px_0px_0px_rgba(56,189,248,0.5)] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
                    whileHover={{ y: -2 }}
                  >
                    <span className="block mb-1">[IN]</span> LinkedIn
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Character Info Card */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Info Card */}
            <div className="border-4 border-amber-500/60 bg-slate-950/95 p-4 relative shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
              <div className="absolute -top-3 left-4 bg-slate-950 px-3 py-1 border-3 border-amber-500">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">[ INFO CARD ]</span>
              </div>

              {/* Stat items */}
              <div className="space-y-3 mt-3">
                {[
                  {
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>,
                    label: 'Email',
                    value: profile.email,
                    color: 'rose'
                  },
                  {
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>,
                    label: 'Phone',
                    value: profile.phone,
                    color: 'emerald'
                  },
                  {
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>,
                    label: 'Location',
                    value: profile.location,
                    color: 'sky'
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    className="border-2 border-slate-700 bg-slate-900/80 p-3 hover:border-amber-400 transition-all cursor-pointer group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    whileHover={{ x: -3 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-amber-400 flex-shrink-0">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] font-mono text-slate-500 uppercase mb-1">{item.label}</p>
                        <p className="text-[10px] font-mono text-slate-200 break-all leading-relaxed">{item.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links as Item Cards */}
            <div className="grid grid-cols-2 gap-3">
              <motion.a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="border-4 border-purple-500/50 bg-slate-950 p-4 text-center shadow-[4px_4px_0px_0px_rgba(168,85,247,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(168,85,247,0.5)] hover:border-purple-400 transition-all group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <svg className="w-10 h-10 mx-auto mb-2 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <p className="text-[9px] font-mono text-purple-400 uppercase">Repository</p>
                <p className="text-xs font-bold font-mono text-purple-300">GitHub</p>
              </motion.a>

              <motion.a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="border-4 border-sky-500/50 bg-slate-950 p-4 text-center shadow-[4px_4px_0px_0px_rgba(56,189,248,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(56,189,248,0.5)] hover:border-sky-400 transition-all group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <svg className="w-10 h-10 mx-auto mb-2 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <p className="text-[9px] font-mono text-sky-400 uppercase">Network</p>
                <p className="text-xs font-bold font-mono text-sky-300">LinkedIn</p>
              </motion.a>
            </div>

            {/* Status indicator */}
            <motion.div
              className="border-3 border-emerald-500 bg-emerald-950/30 px-4 py-3 relative"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(16,185,129,0.4)',
                  '0 0 20px 0 rgba(16,185,129,0.4)',
                  '0 0 0 0 rgba(16,185,129,0.4)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="h-3 w-3 bg-emerald-400"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className="flex-1">
                  <p className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">Status: Open for internship</p>
                  <p className="text-[10px] font-mono text-slate-300">Open to new projects and collaboration.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Window>
    </Section>
  );
}

// =======================
//  MAIN APP
// =======================

function App() {
  const { scrollYProgress } = useScroll();
  const scrollScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState("status");

  const handleNavClick = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-40 bg-slate-950/50 backdrop-blur-sm">
        <motion.div
          style={{ scaleX: scrollScaleX }}
          className="h-full origin-left bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>

      {/* Pixel-ish background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.22),transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.96),rgba(15,23,42,1))]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMDMsMjEwLDIyMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-25" />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: i % 3 === 0 ? '#f87171' : i % 3 === 1 ? '#fbbf24' : '#38bdf8',
              boxShadow: `0 0 ${8 + Math.random() * 12}px currentColor`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          />
        ))}

        {/* Original pixel squares */}
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={`square-${i}`}
            className="absolute h-2 w-2 bg-rose-400 rounded-[2px]"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              boxShadow: '0 0 10px rgba(248,113,113,0.8)'
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16 pt-10 md:pt-12 space-y-10">
        {/* HUD */}
        <motion.header
          className="rounded-full border border-slate-800 bg-slate-950/95 px-4 py-3 shadow-[0_0_0_1px_rgba(15,23,42,1),0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 220 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="h-7 w-7 rounded-[6px] bg-gradient-to-br from-rose-500 to-amber-300 shadow-[0_0_18px_rgba(248,113,113,0.9)]"
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">
                Franklyn · Portfolio
              </span>
              <span className="text-[11px] font-mono text-slate-300">
                Lv. 20 · Web Dev
              </span>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {navSections.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] border rounded-[4px] transition-all ${activeSection === item.id
                  ? "bg-rose-600 text-rose-50 border-rose-400 shadow-[0_0_0_1px_rgba(248,113,113,0.7)]"
                  : "bg-slate-900/80 text-slate-300 border-slate-700 hover:border-rose-400/70 hover:text-rose-200"
                  }`}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>
        </motion.header>

        <HeroSection />
        <PortfolioSection />
        <ContactSection />

        <footer className="pt-6 text-[10px] text-slate-500 border-t border-slate-800 mt-6 text-center">
          <p>
            &copy; Copyright 2025 Franklyn. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Floating avatar pixel */}
      <motion.div
        className="fixed bottom-6 left-6 hidden md:flex items-center z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="relative"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-2 rounded-[14px] bg-gradient-to-tr from-rose-500/50 via-amber-300/40 to-sky-400/50 blur-xl"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="relative h-20 w-20 rounded-[10px] border-2 border-rose-500/60 bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center shadow-[0_0_0_1px_rgba(15,23,42,1),0_15px_40px_rgba(0,0,0,0.9)] cursor-pointer"
            whileHover={{
              scale: 1.15,
              rotate: [0, -5, 5, 0],
              borderColor: "rgba(244,63,94,1)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const el = document.getElementById("status");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            <motion.img
              src="pixels/avatar-2.png"
              alt="Pixel avatar"
              className="h-16 w-16 object-contain"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
