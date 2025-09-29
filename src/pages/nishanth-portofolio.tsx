import React, { useEffect, useRef, useState, type JSX, type PropsWithChildren, type ReactNode } from "react";
import { Code, Workflow  } from "lucide-react";
import { FaAngular, FaNodeJs, FaReact, FaLinkedin  } from "react-icons/fa";
import { IoLogoAndroid, IoLogoIonic, IoLogoJavascript } from "react-icons/io5";
import { BiLogoTypescript, BiLogoPostgresql  } from "react-icons/bi";
import { SiXcode, SiPostman } from "react-icons/si";
import { MdOutlineMailOutline } from "react-icons/md";

/**
 * Nishanth Raghava Aitha – Portfolio (React + Tailwind)
 * Light theme · Subtle scroll reveals · Clean alignment
 * - Violet ↔ Teal brand accents (no dark mode)
 * - Uses a tiny IntersectionObserver-based <Reveal> for fade/slide-in (respects reduced motion)
 */

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

interface CardProps {
  className: string;
  children: ReactNode;
}
interface NavProps {
  href: string;
  children: ReactNode;
}
interface IconProps {
  href: string;
  label: string;
}
interface RevealProp {
  children : ReactNode;
  className?: string;
  delay?: number;
}

const skillIcons: Record<string, JSX.Element> = {
  JavaScript: <IoLogoJavascript />,
  TypeScript: <BiLogoTypescript />,
  Angular: <FaAngular />,
  React: <FaReact  />,
  "React Native": <FaReact  />,
  "Node.js": <FaNodeJs  />,
  "Ionic (Capacitor/Cordova)": <IoLogoIonic  />,
  PostgreSQL: <BiLogoPostgresql  />,
  "API Integration": <Workflow className="w-5 h-5 text-black-600" />,
  Xcode: <SiXcode />,
  "Android Studio": <IoLogoAndroid  />,
  Postman: <SiPostman />,
};

// --- Small utilities ---
const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(" ");

// Reveal: fade + translate in when scrolled into view (no external deps)
const Reveal : React.FC<RevealProp> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // small delay chain
            setTimeout(() => setVisible(true), delay);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "transform transition-all duration-500 ease-out will-change-[opacity,transform]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        className
      )}
    >
      {children}
    </div>
  );
};

const Section : React.FC<SectionProps> = ({ id, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24 py-14 sm:py-16">
    <div className="max-w-6xl mx-auto px-5">
      <header className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-teal-400 inline-block">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-gray-600 text-sm sm:text-base">{subtitle}</p>
        )}
      </header>
      {children}
    </div>
  </section>
);

const Badge : React.FC<PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700">
    {children}
  </span>
);

const Card : React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={cn(
    "rounded-2xl border border-gray-200 bg-white shadow-sm",
    "transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md",
    className
  )}>{children}</div>
);

const NavLink : React.FC<NavProps> = ({ href, children }) => (
  <a
    href={href}
    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline underline-offset-4"
  >
    {children}
  </a>
);

// const Divider = () => <hr className="my-6 border-gray-200" />;

const Pill : React.FC<PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-xl bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
    {children}
  </span>
);

const IconLink : React.FC<IconProps> = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
  >
    {label === 'Email' ? <MdOutlineMailOutline /> : <FaLinkedin />}
    {label}
  </a>
);

const Hero = () => (
  <header className="bg-gradient-to-br from-violet-100 via-white to-teal-100">
    <div className="max-w-6xl mx-auto px-5 pt-12 pb-16">
      <nav className="sticky top-0 z-40 -mx-5 mb-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14">
          <a href="#home" className="text-base font-semibold tracking-tight text-gray-900">
            <span className="bg-gradient-to-r from-violet-600 to-teal-600 bg-clip-text text-transparent">Nishanth</span>
            <span className="text-gray-400"> · </span>
            <span className="text-gray-700">Portfolio</span>
          </a>
          <div className="hidden sm:flex items-center gap-1">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#achievements">Achievements</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-8">
        <div className="lg:col-span-3">
          <Pill>Software Engineer · Web & Mobile</Pill>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Nishanth Raghava Aitha
          </h1>
          <p className="mt-3 max-w-2xl text-gray-700">
            I design and build responsive, secure, and scalable applications using Angular, React, and Ionic (Capacitor/Cordova).
            I focus on performance, clean architecture, and delightful user experiences.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-teal-600 hover:from-violet-700 hover:to-teal-700 px-5 py-2.5 text-sm font-semibold text-white"
            >
              View Projects
            </a>
            <IconLink href="mailto:nishanthraghavaaitha@gmail.com" label="Email" />
            <IconLink href="https://www.linkedin.com/in/nishanth-raghava-6b99151b6/" label="LinkedIn" />
            <a
              href="/Nishanth_Raghava_Aitha.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M20 21H4"/></svg>
              Download Resume
            </a>
          </div>
        </div>
        {/* <Reveal className="lg:col-span-2" delay={100}>
          <Card className="p-6">
            <div className="aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-violet-200 to-teal-200 border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 text-violet-600"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
                </div>
                <p className="mt-3 text-sm text-gray-700">Cambridge Technology Enterprises</p>
                <p className="text-xs text-gray-500">Hyderabad, India</p>
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Primary Stack</p>
                <p className="font-medium text-gray-800">Angular · React · Ionic</p>
              </div>
              <div>
                <p className="text-gray-500">Focus</p>
                <p className="font-medium text-gray-800">Performance · UX · Security</p>
              </div>
            </div>
          </Card>
        </Reveal> */}
      </div>
    </div>
  </header>
);

const Skills = () => (
  <Section id="skills" title="Skills" subtitle="Tech I work with regularly">
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {[
        "JavaScript",
        "TypeScript",
        "Angular",
        "React",
        "React Native",
        "Node.js",
        "Ionic (Capacitor/Cordova)",
        "API Integration",
        "Xcode",
        "Android Studio",
        "Postman",
        "PostgreSQL",
      ].map((skill, i) => (
        <Reveal key={skill} delay={i * 50}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center">
                {skillIcons[skill] ?? (
                  <Code className="w-5 h-5 text-violet-600" />
                )}
              </div>
              <p className="text-sm font-medium text-gray-800">{skill}</p>
            </div>
          </Card>
        </Reveal>
      ))}
    </div>
    <Reveal className="mt-5">
      <div className="flex flex-wrap gap-2">
        {["Problem Solving", "Teamwork", "Time Management", "Communication"].map(
          (s) => (
            <Badge key={s}>{s}</Badge>
          )
        )}
      </div>
    </Reveal>
  </Section>
);

const Experience = () => (
  <Section id="experience" title="Experience" subtitle="Professional journey">
    <div className="relative pl-6">
      <div className="absolute left-2 top-0 h-full w-px bg-gray-200" />
      <ol className="space-y-8">
        {[
          {
            role: "Associate Engineer",
            company: "RP Webapps(Subsidary of Cambridge Technology)",
            period: "Jan 2023 - Present",
            points: [
              "Developed responsive web & mobile apps with Angular/React.",
              "Integrated RESTful APIs and optimized frontend performance.",
              "Collaborated on API integration and UI improvements.",
              "Built cross-platform apps using Ionic(Capictor & Cordova) and React Native.",
              "Ensured accessibility, maintainability, and code quality.",
            ],
          },
        ].map((job, i) => (
          <Reveal key={job.role} delay={i * 80}>
            <li className="relative">
              <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-gradient-to-br from-violet-500 to-teal-500" />
              <Card className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {job.role} · <span className="font-normal text-gray-700">{job.company}</span>
                  </h3>
                  <span className="text-sm text-gray-600">{job.period}</span>
                </div>
                <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </Card>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </Section>
);

const Projects = () => (
  <Section id="projects" title="Projects" subtitle="Selected work across web & mobile">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[
        {
          name: "International Health Dialogue – Mobile Health App",
          desc:
            "Cross-platform consultation app with payments, QR scan, camera, printer; optimized for Android/iOS.",
          tags: ["Ionic", "Capacitor", "Angular", "Payments"],
          link: "https://play.google.com/store/search?q=international+health+dialogue&c=apps",
        },
        {
          name: "Public Services Department – Cross-Platform Complaint System",
          desc:
            "Role-based dashboards, GPS tagging, camera/video capture, streamlined uploads; responsive and performant.",
          tags: ["Angular", "Cordova", "Maps", "GPS"],
          link: "",
        },
        {
          name: "E-Wallet – Secure Digital Payments Platform",
          desc:
            "Cross-platform payment app with OTP login, UAE Pass auth, banking API integrations; security-focused.",
          tags: ["React", "Ionic", "Capacitor", "Security"],
          link: "",
        },
        {
          name: "Mosquito Control – Technician Field Tracking",
          desc:
            "Technician tracking with GPS logging, mobile-first workflows, time tracking, and visual proof via camera.",
          tags: ["Mobile", "GPS", "Forms"],
          link: "",
        },
        {
          name:"NOC Customer & NOC Inspector App",
          desc:"Cross-platform mobile app for NOC customers and inspectors to apply the NOC and track the status using Ionic Capacitor Angular; deployed on Android and iOS",
          tags: ["Angular", "Ionic", "Capacitor", "Security"],
          link:''
        },
        {
          name:"Aber App",
          desc:"Developed a cross-platform mobile application using React Native for Android and iOS, integrating REST APIs for seamless data flow.",
          tags:["React Native"],
          link:''
        }
      ].map((p, i) => (
        <Reveal key={p.name} delay={i * 80}>
          <Card className="overflow-hidden">
            <div className="aspect-[16/9] bg-gradient-to-br from-violet-50 to-teal-50 border-b border-gray-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10 text-gray-400"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="m3 14 4-4 4 4 4-4 4 4"/></svg>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
              <p className="mt-1 text-sm text-gray-700">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              {p.link !== '' && <div className="mt-4">
                <a href={p.link} target="_blank" rel="noreferrer" className="text-sm font-medium text-violet-700 hover:underline">
                  View project ↗
                </a>
              </div>
              } 
            </div>
          </Card>
        </Reveal>
      ))}
    </div>
  </Section>
);

const Education = () => (
  <Section id="education" title="Education">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Reveal>
        <Card className="p-5">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">B.Tech, Computer Science & Engineering</h3>
          <p className="text-sm text-gray-700">B V Raju Institute of Technology, Medak</p>
          <p className="text-sm text-gray-600">2018 – 2022 · GPA 7.14/10</p>
        </Card>
      </Reveal>
      <Reveal delay={80}>
        <Card className="p-5">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">High School (12th) – MPC</h3>
          <p className="text-sm text-gray-700">Abhyaas Junior College, Hyderabad</p>
          <p className="text-sm text-gray-600">2017 – 2018 · 81.3%</p>
        </Card>
      </Reveal>
    </div>
  </Section>
);

const Achievements = () => (
  <Section id="achievements" title="Achievements">
    <Reveal>
      <div className="flex flex-wrap gap-3">
        {["Python Certified – HackerRank", "OOP with Java – Coursera", "Volunteer – Art of Living"].map((a) => (
          <Badge key={a}>{a}</Badge>
        ))}
      </div>
    </Reveal>
  </Section>
);

const Contact = () => (
  <Section id="contact" title="Contact" subtitle="Let’s collaborate on something meaningful">
    <Reveal>
      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Reach me</h3>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:nishanthraghavaaitha@gmail.com" className="text-violet-700 hover:underline">
                  nishanthraghavaaitha@gmail.com
                </a>
              </p>
              <p>
                <span className="font-medium">LinkedIn:</span>{" "}
                <a
                  href="https://www.linkedin.com/in/nishanth-raghava-6b99151b6/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-violet-700 hover:underline"
                >
                  /in/nishanth-raghava-6b99151b6
                </a>
              </p>
              <p><span className="font-medium">Location:</span> Hyderabad, India</p>
            </div>
          </div>
        </div>
      </Card>
    </Reveal>
  </Section>
);

const Footer = () => (
  <footer className="py-10 border-t border-gray-200">
    <div className="max-w-6xl mx-auto px-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Nishanth Raghava Aitha. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <a href="#home" className="hover:underline">Back to top</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function Portfolio() {
  return (
    <main id="home" className="antialiased text-gray-900 bg-white">
      <Hero />
      <Section id="about" title="About" subtitle="A quick snapshot of who I am">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5 md:col-span-2">
              <p className="text-gray-700">
                I’m an engineer focused on crafting clean, performant interfaces and cross‑platform apps. At RP Webapps, I’ve delivered responsive products, integrated secure APIs, and collaborated closely
                with designers and backend teams. I value clarity, maintainability, and thoughtful user experience.
              </p>
            </Card>
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-gray-900">Quick facts</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>Primary: Angular · React</li>
                <li>Strengths: Performance · UX · Security</li>
                <li>Open to: Web & Mobile roles</li>
              </ul>
            </Card>
          </div>
        </Reveal>
      </Section>

      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Achievements />

      {/* Optional Resume anchor for download button */}
      <div id="resume" className="sr-only" />

      <Contact />
      <Footer />
    </main>
  );
}
