/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  User, 
  FileText, 
  Mic, 
  BookOpen, 
  Search, 
  ArrowRight, 
  Mail, 
  ExternalLink,
  ChevronDown,
  Layout,
  Layers,
  Wind
} from 'lucide-react';

// --- Components for Background Effects ---

const ImmersionWave = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <motion.div
        animate={{
          x: mousePos.x / 15,
          y: mousePos.y / 15,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ 
              scale: [1, 2, 3], 
              opacity: [0.5, 0.2, 0],
              borderWidth: [2, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy w-[400px] h-[400px]"
          />
        ))}
      </motion.div>
    </div>
  );
};

const DigitalNoiseGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-full h-px bg-navy/20 absolute top-1/4"
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="w-full h-px bg-navy/20 absolute top-3/4"
        />
      </div>
    </div>
  );
};

const LeafyLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0 800C200 700 300 400 600 500C900 600 1100 200 1440 0"
          stroke="#0A192F"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 5, ease: "easeInOut" }}
        />
        <motion.path
          d="M1440 800C1200 600 900 700 600 400C300 100 100 300 0 0"
          stroke="#0A192F"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 7, ease: "easeInOut", delay: 1 }}
        />
      </svg>
    </div>
  );
};

const SoundwaveBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 flex items-end justify-center pb-20 gap-1 px-4">
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            height: [
              Math.random() * 20 + 20,
              Math.random() * 100 + 40,
              Math.random() * 20 + 20,
            ]
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-1 bg-navy rounded-full"
        />
      ))}
    </div>
  );
};

const ConnectivityNetwork = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [Math.random() * 100, Math.random() * 100 + 50, Math.random() * 100],
            y: [Math.random() * 100, Math.random() * 100 + 50, Math.random() * 100],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-2 h-2 bg-navy rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const Sidebar = ({ onHome, onNavClick, activeId }: { onHome: () => void; onNavClick: (id: string) => void; activeId: string }) => (
  <aside className="w-[280px] bg-navy text-white p-10 flex flex-col justify-between z-10 hidden lg:flex shrink-0 h-full overflow-hidden">
    <div>
      <div className="profile-section mb-14">
        <div className="text-[10px] tracking-[0.2em] opacity-60 mb-2 uppercase font-mono">HANSUNG UNIV. 2392077</div>
        <div className="text-2xl font-bold mb-1">박수연</div>
        <div className="text-sm italic text-slate">Content Planner</div>
      </div>

      <nav>
        <ul className="space-y-6">
          {[
            { id: '01', title: 'ABOUT ME', target: 'ch1' },
            { id: '02', title: 'MEDIA & CULTURE', target: 'ch2' },
            { id: '03', title: 'STORYTELLING', target: 'ch3' },
            { id: '04', title: 'RE:SONANCE', target: 'ch4' },
            { id: '05', title: 'VISION & ROADMAP', target: 'ch5' },
          ].map((item) => (
            <li 
              key={item.id} 
              onClick={() => onNavClick(item.target)}
              className={`text-[13px] tracking-widest cursor-pointer transition-all flex items-center gap-3 ${activeId === item.target ? 'opacity-100 font-bold' : 'opacity-50 hover:opacity-100'}`}
            >
              {activeId === item.target && <div className="w-5 h-px bg-white" />}
              {item.id} {item.title}
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <div className="space-y-6">
      <button 
        onClick={onHome}
        className="flex items-center gap-2 text-[11px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
      >
        <Layout size={14} /> Back to Entry
      </button>
      <div className="text-[10px] opacity-40 leading-relaxed font-mono">
        © 2024 PORTFOLIO<br />ALL RIGHTS RESERVED
      </div>
    </div>
  </aside>
);

const SectionHeader = ({ num, title, subtitle, titleClass, subtitleClass }: { num: string; title: string; subtitle?: string; titleClass?: string; subtitleClass?: string }) => (
  <div className="mb-10 text-left">
    <div className="text-xs font-bold text-accent-blue mb-2 uppercase tracking-widest">CHAPTER {num}</div>
    <h2 className={`font-extrabold leading-[1.1] tracking-tighter ${titleClass || 'text-5xl md:text-6xl'}`}>
      {title}
      {subtitle && <><br /><span className={`text-slate font-light ${subtitleClass || ''}`}>{subtitle}</span></>}
    </h2>
  </div>
);

// --- Page Components ---

const WhoIAm = () => (
  <section id="ch1" className="scroll-section flex items-center justify-center px-10 relative bg-white">
    <ImmersionWave />
    <div className="max-w-4xl z-10 w-full px-10 flex flex-col items-start relative">
      <SectionHeader num="01" title="About Me" />
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-left max-w-2xl space-y-8"
      >
        <div className="space-y-2">
          <h3 className="text-navy font-bold text-sm tracking-wider uppercase">성격 및 강점</h3>
          <p className="text-slate text-base md:text-lg leading-relaxed">
            무엇이든 한 번 시작하면 끝을 보는 끈기와 빈틈없는 꼼꼼함이 최대 강점입니다. 팀 프로젝트 시 개인의 과제보다 팀의 목표를 우선시하며 책임감을 가지고 임합니다.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-navy font-bold text-sm tracking-wider uppercase">가치관</h3>
          <p className="text-slate text-base md:text-lg leading-relaxed">
            '현재 내가 할 수 있는 역할에 충실하자'는 태도로 상위권 성적을 유지해 왔으며, 어려움 앞에서도 '지금 내 현재에 최선을 다하자'는 다짐으로 스스로를 다잡습니다.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-navy font-bold text-sm tracking-wider uppercase">예술적 몰입</h3>
          <p className="text-slate text-base md:text-lg leading-relaxed">
            소설, 영화, 게임 등 미디어 콘텐츠 전반에 깊은 관심을 가지고 있으며, 예술적 몰입도가 높고 감정은 섬세하게 표현하는 능력을 갖추고 있습니다.
          </p>
        </div>
      </motion.div>
      
      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: [0.2, 0.4, 0.2], filter: 'blur(2px)' }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -bottom-32 left-10 pointer-events-none"
      >
        <p className="text-slate text-[10px] tracking-[0.3em] uppercase italic">
          ( Keep scrolling to explore more )
        </p>
      </motion.div>
    </div>
  </section>
);

const MediaAnalysis = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="ch2" ref={containerRef} className="scroll-section flex items-center justify-center px-10 relative bg-bg-light">
      <DigitalNoiseGrid />
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl z-10 items-center w-full px-10">
        <motion.div style={{ y: y1 }} className="space-y-6">
          <SectionHeader num="02" title="MEDIA" subtitle="& CULTURE" />
          <p className="text-slate text-[15px] md:text-base leading-relaxed max-w-md">
            유아기부터 현재까지의 미디어 경험이 자아 인식에 미친 영향을 마셜 맥루한과 스튜어트 홀의 이론을 빌려 비판적으로 분석했습니다. 미디어가 단순한 도구를 넘어 인간의 사고방식과 사회 질서를 재편한다는 점을 학습했습니다.
          </p>
        </motion.div>
        
        <motion.div style={{ y: y2 }} className="bg-white p-10 border border-navy/5 shadow-2xl rounded-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-navy">
              <Search size={24} />
              <h3 className="font-bold text-sm uppercase tracking-widest">트렌드 분석 (틱톡 성공 요인)</h3>
            </div>
            <p className="text-sm text-slate leading-relaxed">
              숏폼 플랫폼인 '틱톡'의 성공 원인을 낮은 진입장벽과 추천 피드 알고리즘, 챌린지 마케팅 등 내·외적 요인으로 나누어 데이터 기반의 분석을 수행했습니다.
            </p>
            <div className="h-px bg-navy/10 my-6" />
            <div className="flex flex-wrap gap-2">
              {['매체 이론', '수용자 분석', '시장 트렌드', '플랫폼 구조'].map(tag => (
                <span key={tag} className="px-3 py-1 border border-navy/10 text-navy text-[10px] uppercase font-mono tracking-widest">{tag}</span>
              ))}
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-bold text-navy opacity-40">Document Preview</span>
                <a 
                  href="/2392077 박수연 문콘 ‘틱톡’의__성공-원인-분석.pdf" 
                  target="_blank"
                  className="text-[10px] uppercase tracking-widest font-bold text-accent-blue hover:underline flex items-center gap-1"
                >
                  <ExternalLink size={10} /> Full Screen
                </a>
              </div>
              <div className="relative w-full aspect-[4/5] bg-gray-100 border border-navy/10 rounded-sm overflow-hidden shadow-inner group">
                {/* 
                    MANDATORY: 사용자는 반드시 프로젝트 루트의 'public' 폴더 안에 
                    '2392077 박수연 문콘 ‘틱톡’의__성공-원인-분석.pdf'를 저장해야 함 
                */}
                <iframe 
                  src="/2392077 박수연 문콘 ‘틱톡’의__성공-원인-분석.pdf" 
                  type="application/pdf"
                  className="w-full h-full border-none"
                  title="TikTok Analysis Case Study"
                />
                <div className="absolute inset-0 pointer-events-none border border-navy/5 group-hover:border-navy/20 transition-colors" />
              </div>
              <p className="text-[10px] text-slate mt-2 text-center italic">
                브라우저에서 PDF를 볼 수 없는 경우 <a href="/2392077 박수연 문콘 ‘틱톡’의__성공-원인-분석.pdf" target="_blank" className="text-accent-blue underline font-bold">[여기에서 다운로드]</a> 하세요
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LiteratureStorytelling = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section id="ch3" ref={containerRef} className="scroll-section flex items-center justify-center px-10 relative bg-white overflow-hidden">
      <LeafyLines />
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-7xl z-10 items-center w-full px-10">
        <motion.div style={{ y: y1 }} className="space-y-8 text-left">
          <SectionHeader 
            num="03" 
            title="STORYTELLING" 
            subtitle="식물적 상상력" 
            titleClass="text-4xl md:text-5xl" 
            subtitleClass="text-2xl md:text-3xl"
          />
          <p className="text-[15px] md:text-lg text-slate max-w-2xl leading-relaxed">
            한강 작가의 <strong>「내 여자의 열매」</strong>를 에코페미니즘 관점에서 분석하며, 사회적 폭력과 소통 부재 속에서 고통받는 화자의 심리를 '식물적 상상력'이라는 키워드로 풀어냈습니다.
          </p>
          <div className="pt-6 border-t border-navy/5">
            <h4 className="text-navy font-bold text-xs tracking-widest uppercase mb-3">스토리텔링 실습</h4>
            <p className="text-slate text-sm leading-relaxed max-w-xl">
              붕괴 사고라는 비극적 사건을 배경으로 선생과 제자의 만남을 다룬 소설을 창작하며, 인물 중심의 서사 구조와 정서적 공감대를 형성하는 법을 익혔습니다.
            </p>
          </div>
          <div className="pt-4 flex gap-8 text-navy/10">
            <BookOpen size={48} strokeWidth={0.5} />
            <Wind size={48} strokeWidth={0.5} />
          </div>
        </motion.div>

        <motion.div style={{ y: y2 }} className="bg-white p-8 md:p-12 border border-navy/5 shadow-2xl rounded-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3 text-navy">
                <FileText size={20} className="text-accent-blue" />
                <h3 className="font-bold text-sm uppercase tracking-widest leading-tight">분석 리포트 및 창작물</h3>
              </div>
              <a 
                href="/2392077 박수연 「내 여자의 열매」 발표.pdf" 
                target="_blank"
                className="text-[10px] uppercase tracking-widest font-bold text-accent-blue hover:underline flex items-center gap-1 shrink-0"
              >
                <ExternalLink size={10} /> Full Screen
              </a>
            </div>
            
            <div className="relative w-full aspect-[4/5] bg-gray-100 border border-navy/10 rounded-sm overflow-hidden shadow-inner group">
              {/* 
                  MANDATORY: 사용자는 반드시 프로젝트 루트의 'public' 폴더 안에 
                  '2392077 박수연 「내 여자의 열매」 발표.pdf'를 저장해야 함 
              */}
              <iframe 
                src="/2392077 박수연 「내 여자의 열매」 발표.pdf" 
                type="application/pdf"
                className="w-full h-full border-none"
                title="Storytelling Analysis PDF"
              />
              <div className="absolute inset-0 pointer-events-none border border-navy/5 group-hover:border-navy/20 transition-colors" />
            </div>
            
            <p className="text-[10px] text-slate mt-2 text-center italic leading-tight">
              브라우저에서 PDF를 볼 수 없는 경우 <a href="/2392077 박수연 「내 여자의 열매」 발표.pdf" target="_blank" className="text-accent-blue underline font-bold">[PDF 보기 버튼]</a> 을 클릭하세요
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ResonanceProject = () => (
  <section id="ch4" className="scroll-section flex items-center justify-center px-10 relative bg-bg-light overflow-hidden">
    <SoundwaveBackground />
    <div className="absolute inset-0 opacity-5 grid-overlay" />
    <div className="max-w-5xl z-10 grid md:grid-cols-2 gap-16 items-center w-full px-10 text-navy">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="space-y-8"
      >
        <div>
          <SectionHeader num="04" title="RE:SONANCE" subtitle="도시의 공명" />
          <h4 className="text-navy font-bold text-xs tracking-widest uppercase mb-3">공연/전시 기획</h4>
          <p className="text-[15px] md:text-base text-slate leading-relaxed mb-6 max-w-md">
            도시의 사라져가는 흔적을 음악과 소리로 기록하는 'RE:SONANCE' 프로젝트를 기획했습니다. 로컬 아카이빙과 예술적 퍼포먼스를 결합하여 지역 공동체의 이야기를 재생산하는 모델을 구상했습니다.
          </p>
        </div>

        <div>
          <h4 className="text-navy font-bold text-xs tracking-widest uppercase mb-3">협업 및 실행 계획</h4>
          <p className="text-sm text-slate leading-relaxed mb-8 max-w-md">
            예술감독, 프로덕션 디렉터, 음향 디자이너 등 각 파트별 역할 분담과 제작 일정, 홍보 마케팅 전략을 포함한 구체적인 실행 계획안을 작성했습니다.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 border border-navy/10 px-4 py-2 text-[10px] uppercase tracking-widest font-bold bg-white">
            <Mic size={14} className="text-accent-blue" /> Sound Collection
          </div>
          <div className="flex items-center gap-2 border border-navy/10 px-4 py-2 text-[10px] uppercase tracking-widest font-bold bg-white">
            <Layers size={14} className="text-accent-blue" /> Digital Archive
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-navy/5"
        >
          <a 
            href="/공연엔터테인먼트의실재_A조_발표파일.pdf" 
            target="_blank"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-navy text-white font-bold text-sm tracking-[0.15em] uppercase transition-all hover:bg-accent-blue shadow-2xl shadow-navy/20"
          >
            <FileText size={18} />
            기획서 PDF 보기
            <div className="w-2 h-2 bg-accent-blue rounded-full shadow-[0_0_8px_var(--color-accent-blue)]" />
          </a>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative aspect-[4/5] md:aspect-square bg-white border border-navy/5 shadow-2xl p-2"
      >
        <div className="w-full h-full relative overflow-hidden">
          <img 
            src="/공연예술.png" 
            alt="RE:SONANCE Project Performance" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-navy/10 mix-blend-multiply" />
        </div>
      </motion.div>
    </div>
  </section>
);

const VisionFuture = () => (
  <section id="ch5" className="scroll-section flex items-center justify-center px-10 relative bg-white">
    <ConnectivityNetwork />
    <div className="max-w-6xl z-10 w-full px-10">
      <div className="mb-16">
        <SectionHeader num="05" title="VISION" subtitle="& ROADMAP" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "체계적 분석",
            desc: "시장과 수용자의 니즈를 정확히 데이터로 파악하고, 트렌드를 선도하는 전략적 기획을 수립합니다.",
            icon: Search
          },
          {
            title: "서사적 조율",
            desc: "콘텐츠 내부의 서사가 유기적으로 작동하도록 조율하며, 감동을 주는 스토리텔링을 구현합니다.",
            icon: BookOpen
          },
          {
            title: "미래 지향",
            desc: "시나리오 작가와 행정 전문가의 역량을 결합하여, 지속 가능한 콘텐츠 생태계를 꿈꿉니다.",
            icon: User
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 border border-navy/5 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <item.icon className="mb-6 text-accent-blue opacity-50 group-hover:opacity-100 transition-opacity" size={24} />
            <h3 className="font-bold text-lg mb-4 tracking-tighter uppercase">{item.title}</h3>
            <p className="text-slate text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main Application ---

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [activeId, setActiveId] = useState('ch1');
  
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  };

  useEffect(() => {
    if (!isStarted) return;
    
    const sections = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isStarted]);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-bg-light">
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate/10"
          >
            <div className="absolute inset-0 grid-overlay opacity-30" />
            
            <motion.div
              layoutId="profile-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white border border-black/5 p-12 text-center shadow-[0_40px_100px_rgba(0,0,0,0.1)] rounded-[2px] w-[360px] relative z-10"
            >
              <div className="w-[140px] h-[180px] bg-slate/10 mx-auto mb-8 rounded overflow-hidden relative group cursor-pointer" onClick={() => setIsStarted(true)}>
                <img 
                  src="https://picsum.photos/seed/suyeon/300/400" 
                  alt="박수연" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 active:scale-95"
                />
                <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ArrowRight className="text-white" size={32} />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <h3 className="text-xl font-bold tracking-tight text-navy">한성대학교 박수연</h3>
                <p className="text-xs text-slate tracking-widest uppercase">2392077 | 콘텐츠 플래너</p>
              </div>

              <button 
                onClick={() => setIsStarted(true)}
                className="text-[11px] uppercase tracking-[0.2em] text-accent-blue border-b border-accent-blue pb-1 font-bold hover:gap-4 transition-all"
              >
                Enter Journey
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full flex"
          >
            <Sidebar 
              onHome={() => setIsStarted(false)} 
              onNavClick={handleNavClick}
              activeId={activeId}
            />

            <main className="flex-1 relative bg-bg-light flex flex-col">
              <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
              
              <div className="scroll-container flex-1">
                <WhoIAm />
                <MediaAnalysis />
                <LiteratureStorytelling />
                <ResonanceProject />
                <VisionFuture />
                
                {/* Footer Section */}
                <footer className="scroll-section flex flex-col items-center justify-center bg-navy text-white/40 font-mono text-[10px] px-10">
                  <div className="max-w-4xl w-full mb-12 border-t border-white/10 pt-12 flex justify-between items-center opacity-60">
                    <p>© 2024 PORTFOLIO - HANSUNG UNIV. PARK SUYEON</p>
                    <div className="flex gap-8">
                      <p>PSY0102@EXAMPLE.COM</p>
                      <p>ALL RIGHTS RESERVED</p>
                    </div>
                  </div>
                  <p className="tracking-[0.5em] uppercase opacity-20 text-center">Inspired by Sound, Driven by Story, Crafted by Reason.</p>
                </footer>
              </div>

              {/* Scroll Indicator */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 right-10 z-40 flex flex-col items-center gap-2 opacity-30 pointer-events-none"
              >
                <div className="w-px h-10 bg-navy" />
                <p className="font-mono text-[9px] uppercase tracking-widest text-navy vertical-text">Scroll</p>
              </motion.div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
