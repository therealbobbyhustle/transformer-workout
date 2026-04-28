'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-[#0a0a0a] text-white antialiased grain overflow-x-hidden">

      {/* Floating Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl blob-animation" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl blob-animation" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-orange-600/8 rounded-full blur-3xl blob-animation" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-32 left-[15%] w-4 h-4 bg-orange-500/40 rotate-45 float-animation" />
        <div className="absolute top-48 right-[20%] w-6 h-6 border border-orange-500/30 rounded-full float-animation-delayed" />
        <div className="absolute bottom-60 left-[10%] w-3 h-3 bg-purple-500/40 rounded-full float-animation" style={{ animationDelay: '-1s' }} />
        <div className="absolute top-[40%] right-[8%] w-5 h-5 border border-purple-500/30 rotate-12 float-animation-delayed" />
        <div className="absolute bottom-[20%] right-[25%] w-8 h-8 bg-orange-500/20 rounded-lg rotate-12 float-animation" style={{ animationDelay: '-3s' }} />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden flex-shrink-0">
              <Image src="/logo.jpg" alt="Transformer Workout Logo" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div className="font-[family-name:var(--font-barlow-condensed)] text-[1.1rem] md:text-xl font-black tracking-wide uppercase whitespace-nowrap leading-none pt-0.5">
              TRANSFORMER <span className="text-orange-500">WORKOUT</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/login" className="border border-white/20 hover:border-orange-500/50 bg-white/5 hover:bg-white/10 text-white text-[13px] md:text-sm font-bold px-3 py-2 md:px-5 md:py-3 rounded-xl transition-all whitespace-nowrap">
              Log In
            </Link>
            <Link href="/signup" className="cta-btn shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-[13px] md:text-sm font-bold px-4 py-2 md:px-6 md:py-3 rounded-xl neon-border whitespace-nowrap">
              Join the Challenge
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center pt-20 pb-16 relative">
        <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
          <Image src="/hero-bg.png" alt="Fitness Training Background" fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="section-reveal">
              <h1 className="font-[family-name:var(--font-barlow-condensed)] text-7xl md:text-[9rem] font-black uppercase leading-[0.85] mt-12 mb-6 tracking-tight">
                <span className="block text-white">GET FIT</span>
                <span className="block gradient-text">FOR THE</span>
                <span className="block text-white">FAMILY.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-medium mb-6 leading-snug">
                A 21-Day Fitness &amp; Nutrition Reset for busy parents and professionals.
              </p>
              <p className="text-gray-500 text-lg mb-10 max-w-lg leading-relaxed">
                No extreme diets. No gym required. No experience needed. A simple, structured plan built around your real life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/signup" className="cta-btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-5 rounded-xl text-center flex-1 shadow-lg shadow-orange-500/20 text-lg whitespace-nowrap">
                  Start the Challenge &middot; $27
                </Link>
                <Link href="/login" className="group border border-white/20 hover:border-orange-500/50 bg-white/5 hover:bg-white/10 text-gray-100 hover:text-white font-bold text-lg px-10 py-5 rounded-2xl text-center transition-all flex items-center justify-center gap-2">
                  Log In
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <p className="text-gray-500 text-sm mb-8">
                Already have an account?{' '}
                <Link href="/login" className="text-orange-400 hover:text-orange-300 font-semibold">
                  Log in and go to your dashboard.
                </Link>
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span><span className="text-gray-400">Self-Paced Structure</span></div>
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span><span className="text-gray-400">Home or Gym-Friendly</span></div>
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span><span className="text-gray-400">Built for Busy Parents</span></div>
              </div>
            </div>

            {/* Dashboard preview card */}
            <div className="relative section-reveal" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="dashboard-card rounded-3xl border border-white/10 p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Your Journey</p>
                      <p className="font-[family-name:var(--font-barlow-condensed)] font-bold text-2xl uppercase text-white">21-Day Challenge</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Week 2 · Day 9</p>
                      <p className="text-orange-400 font-bold">8 of 21 done</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <svg className="progress-ring w-32 h-32">
                        <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                        <circle cx="64" cy="64" r="56" stroke="url(#gradient)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="352" strokeDashoffset="218" />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#fbbf24" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-[family-name:var(--font-barlow-condensed)] text-4xl font-black text-white">38%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-2xl p-5 mb-4">
                    <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider mb-2">Today&apos;s Mission</p>
                    <p className="font-[family-name:var(--font-barlow-condensed)] font-bold text-2xl uppercase text-white mb-1">Power &amp; Conditioning</p>
                    <p className="text-gray-400 text-sm">30 min · Day 9 · Follow-Along</p>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="day-complete aspect-square rounded-lg flex items-center justify-center text-green-400 text-xs font-bold">✓</div>
                    ))}
                    <div className="day-active aspect-square rounded-lg flex items-center justify-center text-orange-400 text-xs font-bold">9</div>
                    {[10,11,12,13].map((n) => (
                      <div key={n} className="day-locked aspect-square rounded-lg flex items-center justify-center text-gray-600 text-xs">{n}</div>
                    ))}
                    {[14,15,16,17,18,19,20,21].map((n) => (
                      <div key={n} className="day-locked aspect-square rounded-lg flex items-center justify-center text-gray-600 text-xs opacity-50">{n}</div>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-green-500/20 border border-green-500/40 rounded-2xl px-4 py-3 float-animation">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-xl">✓</span>
                    <span className="text-green-300 text-sm font-semibold">8 Day Streak</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-purple-500/20 border border-purple-500/40 rounded-2xl px-4 py-3 float-animation-delayed">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 text-xl">💪</span>
                    <span className="text-purple-300 text-sm font-semibold">240 min trained</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 section-reveal">
            <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">Sound Familiar?</p>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-6xl md:text-8xl font-black uppercase leading-[0.9]">
              YOU&apos;VE BEEN<br /><span className="gradient-text">PUTTING EVERYONE</span><br />ELSE FIRST.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: '⚡', title: 'Running on Empty', body: 'You wake up tired. Push through the day. By the time everyone\'s handled, there\'s nothing left for you.' },
              { icon: '📅', title: 'No Time, No Plan', body: 'You\'ve tried to get back on track. But random workouts and guessing hasn\'t worked. You need a real structure.', offset: true },
              { icon: '🏠', title: 'The House Needs You', body: 'Your family counts on you showing up. You can\'t pour from an empty cup. Your health is the foundation.' },
            ].map(({ icon, title, body, offset }, i) => (
              <div key={i} className={`glass-card glass-card-hover rounded-3xl p-8 transition-all duration-300 section-reveal neon-border${offset ? ' md:translate-y-12' : ''}`} style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/30 to-orange-600/10 flex items-center justify-center mb-6">
                  <span className="text-3xl">{icon}</span>
                </div>
                <h3 className="font-[family-name:var(--font-barlow-condensed)] text-3xl font-black uppercase mb-4">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto text-center section-reveal">
            <div className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10" />
              <div className="relative z-10">
                <p className="font-[family-name:var(--font-barlow-condensed)] text-5xl md:text-7xl font-black uppercase leading-tight text-white mb-6">
                  &ldquo;IF YOUR BODY CRASHES,<br /><span className="gradient-text">YOUR WHOLE HOUSE</span><br />CRASHES.&rdquo;
                </p>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  This is not about vanity. This is about sustainability. Being the version of yourself your family actually needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE PROMISE */}
      <section className="py-24 relative mesh-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="section-reveal">
              <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">The Reset You Need</p>
              <h2 className="font-[family-name:var(--font-barlow-condensed)] text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-8">
                <span className="text-white">21 DAYS TO</span><br />
                <span className="gradient-text">RESET. REBUILD.</span><br />
                <span className="text-white">RECOMMIT.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                This isn&apos;t about transformation photos or chasing a number on the scale. It&apos;s about getting back to a version of yourself that has energy, consistency, and momentum.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                In 21 days, with a plan that fits your actual life, you will feel the difference. Not perfection. Progress.
              </p>
            </div>
            <div className="space-y-4 section-reveal" style={{ animationDelay: '0.2s' }}>
              {[
                { icon: '⚡', title: 'More Energy for What Matters', body: 'Real training that boosts your energy, not drains what little you have left.' },
                { icon: '🎯', title: 'A Structure That Actually Works', body: 'Built around your real week. Not some mythical perfect schedule.' },
                { icon: '🏆', title: 'Momentum You Can Feel', body: 'Every completed day builds on the last. The check marks are real.' },
                { icon: '🏠', title: 'Show Up Stronger at Home', body: 'When you take care of your body, your whole house feels it.' },
              ].map(({ icon, title, body }) => (
                <div key={title} className="glass-card glass-card-hover rounded-2xl p-6 flex items-start gap-5 transition-all duration-300 neon-border">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">{title}</h4>
                    <p className="text-gray-400">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHO IT'S FOR */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="section-reveal">
            <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">This Was Built for You</p>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-6">
              WHO THIS<br /><span className="gradient-text">IS FOR</span>
            </h2>
            <p className="text-gray-400 text-lg mb-16">If any of this sounds like your life, you&apos;re in the right place.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-12 section-reveal" style={{ animationDelay: '0.1s' }}>
            {[
              "You're a mom or dad in your 30s or 40s who's been putting your health on the back burner",
              "You've tried starting a routine before but life always got in the way",
              "You want a real structure, not a random playlist or overwhelming program",
              "You can train at home or at the gym: you just need a plan that works either way",
              "You're not trying to look like a fitness model: you're trying to feel like yourself again",
              "You want to set an example for your kids, not just talk about health, but live it",
            ].map((item) => (
              <div key={item} className="glass-card glass-card-hover rounded-2xl p-6 text-left flex items-start gap-4 transition-all duration-300 neon-border">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-lg">✓</span>
                </div>
                <p className="text-gray-300">{item}</p>
              </div>
            ))}
          </div>
          <div className="glass-card rounded-2xl p-6 text-left border border-white/10 section-reveal">
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-2">This is not for you if&hellip;</p>
            <p className="text-gray-600">You&apos;re looking for a hardcore bodybuilding program, extreme calorie cutting, or a competition-style challenge. This is a grounded, strategic reset, not a spectacle.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHAT YOU GET */}
      <section className="py-24 relative mesh-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 section-reveal">
            <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">Everything Included</p>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-6xl md:text-8xl font-black uppercase leading-[0.9]">
              WHAT YOU<br /><span className="gradient-text">GET</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🎬', title: 'Follow-Along Workouts', body: '21 days of structured video-led sessions. Press play and follow. No guessing, no improvising.' },
              { icon: '✓', title: 'Progress Tracker', body: 'Daily green check marks. Watch your streak build. Feel the momentum compound day after day.' },
              { icon: '🍓', title: 'Nutrition Guidance', body: 'Simple meal guidance. Practical food choices. No calorie counting. No macro obsession.' },
              { icon: '📊', title: 'Self-Paced Dashboard', body: 'Log in, see today\'s mission, press play, get your check. Dead simple.' },
              { icon: '📅', title: 'Weekly Check-Ins', body: 'Structured weekly review points to assess progress and realign before the next week.' },
              { icon: '🏠', title: 'Home & Gym Flexible', body: 'No gym membership required. Designed for living room or weight room — you choose.' },
            ].map(({ icon, title, body }, i) => (
              <div key={title} className="glass-card glass-card-hover rounded-3xl p-8 transition-all duration-300 neon-border section-reveal" style={{ animationDelay: `${0.05 * (i + 1)}s` }}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/30 to-orange-600/10 flex items-center justify-center mb-6 text-2xl">{icon}</div>
                <h3 className="font-[family-name:var(--font-barlow-condensed)] text-2xl font-bold uppercase mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — HOW IT WORKS */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 section-reveal">
            <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">Simple by Design</p>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-6xl md:text-8xl font-black uppercase leading-[0.9]">
              HOW IT<br /><span className="gradient-text">WORKS</span>
            </h2>
            <p className="text-gray-400 text-lg mt-6">Six steps. That&apos;s it.</p>
          </div>
          <div className="space-y-5">
            {[
              { n: '1', title: 'Join the Challenge', body: 'Sign up and get instant access to your dashboard. No waiting. No complicated setup.', color: 'from-orange-500 to-orange-600' },
              { n: '2', title: 'Log In & See Today\'s Plan', body: 'Open your dashboard. Today\'s workout is right there. No searching through a library.', color: 'from-orange-500/80 to-orange-600/80' },
              { n: '3', title: 'Press Play', body: 'Follow the session. The trainer leads you through every rep. You don\'t have to think: just move.', color: 'from-orange-500/70 to-orange-600/70' },
              { n: '4', title: 'Complete the Day', body: 'Finish the session. Mark it done. One day in the books: one step closer.', color: 'from-orange-500/60 to-orange-600/60' },
              { n: '✓', title: 'Get Your Green Check', body: 'Your progress tracker updates. Green check added. The streak is real. The momentum is yours.', color: 'from-green-500 to-green-600', green: true },
              { n: '→', title: 'Keep Moving Forward', body: 'Tomorrow\'s plan is ready when you are. 21 days later, you\'ll have done something real.', color: 'from-orange-500 to-orange-600', orange: true },
            ].map(({ n, title, body, color, green, orange }, i) => (
              <div key={title} className={`glass-card rounded-2xl p-6 flex items-center gap-6 transition-all duration-300 section-reveal neon-border${green ? ' border-green-500/20' : orange ? ' border-orange-500/20' : ''}`} style={{ animationDelay: `${0.05 * (i + 1)}s` }}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 font-[family-name:var(--font-barlow-condensed)] text-[1.75rem] font-black`}>{n}</div>
                <div>
                  <h3 className={`font-[family-name:var(--font-barlow-condensed)] text-2xl font-bold uppercase mb-1${green ? ' text-green-400' : orange ? ' text-orange-400' : ''}`}>{title}</h3>
                  <p className="text-gray-400">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — WEEKLY STRUCTURE */}
      <section className="py-24 relative mesh-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 section-reveal">
            <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">Your 3-Week Roadmap</p>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-6xl md:text-8xl font-black uppercase leading-[0.9]">
              HOW THE 21 DAYS<br /><span className="gradient-text">BREAK DOWN</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { wk: '1', range: 'Days 1–7', title: 'The Reset', body: 'Re-establish your baseline. Wake your body back up. Build the habit of showing up.', highlight: false },
              { wk: '2', range: 'Days 8–14', title: 'The Build', body: 'Intensity increases. Consistency solidifies. You\'ll feel the shift — more energy, better sleep.', highlight: true },
              { wk: '3', range: 'Days 15–21', title: 'Lock It In', body: 'Finish strong. Prove to yourself you can do this. Day 21 means something.', highlight: false },
            ].map(({ wk, range, title, body, highlight }) => (
              <div key={wk} className={`glass-card glass-card-hover rounded-3xl p-8 relative overflow-hidden transition-all duration-300 neon-border section-reveal${highlight ? ' border-orange-500/30' : ''}`}>
                <div className="number-highlight absolute -top-4 -right-2 font-black">{wk}</div>
                <div className="relative z-10">
                  <p className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-2">Week {wk} : {range}</p>
                  <h3 className="font-[family-name:var(--font-barlow-condensed)] text-4xl font-black uppercase mb-4">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="glass-card rounded-3xl overflow-hidden section-reveal">
            <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-b border-white/10 px-8 py-6">
              <h3 className="font-[family-name:var(--font-barlow-condensed)] text-3xl font-bold uppercase">Recommended Weekly Structure</h3>
              <p className="text-gray-400 text-sm mt-1">Repeat across all 3 weeks. Adjust when life happens, but always come back to the plan.</p>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { day: 'Monday', color: 'text-orange-400', label: 'Full-Body Workout', sub: '~25–40 min', icon: '💪', bg: 'bg-orange-500/15' },
                { day: 'Tuesday', color: 'text-blue-400', label: 'Recovery / Core / Walk', sub: 'Active recovery', icon: '🔄', bg: 'bg-blue-500/15' },
                { day: 'Wednesday', color: 'text-orange-400', label: 'Full-Body Workout', sub: '~25–40 min', icon: '💪', bg: 'bg-orange-500/15' },
                { day: 'Thursday', color: 'text-blue-400', label: 'Mobility / Recovery', sub: 'Active recovery', icon: '🧘', bg: 'bg-blue-500/15' },
                { day: 'Friday', color: 'text-orange-400', label: 'Full-Body Workout', sub: '~25–40 min', icon: '💪', bg: 'bg-orange-500/15' },
                { day: 'Saturday', color: 'text-orange-400', label: 'Bonus Workout', sub: '~20–35 min', icon: '🔥', bg: 'bg-orange-500/15' },
                { day: 'Sunday', color: 'text-green-400', label: 'Rest + Weekly Check-In', sub: 'Reflect & recharge', icon: '✓', bg: 'bg-green-500/15' },
              ].map(({ day, color, label, sub, icon, bg }) => (
                <div key={day} className="flex items-center gap-6 px-8 py-5 hover:bg-white/5 transition-colors">
                  <div className="w-36 flex-shrink-0">
                    <span className={`font-[family-name:var(--font-barlow-condensed)] text-[1.1rem] font-bold uppercase ${color}`}>{day}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-semibold">{label}</span>
                    <span className="text-gray-500 text-sm ml-3">{sub}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center text-lg`}>{icon}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — NUTRITION */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 section-reveal">
            <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">Simple Nutrition</p>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-6xl md:text-8xl font-black uppercase leading-[0.9]">
              EAT BETTER.<br /><span className="gradient-text">WITHOUT THE OBSESSION.</span>
            </h2>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Practical guidance that helps busy adults make better food choices, without turning every meal into a math problem.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card rounded-3xl p-8 section-reveal">
              <h3 className="font-[family-name:var(--font-barlow-condensed)] text-3xl font-bold uppercase text-green-400 mb-6">What&apos;s Included</h3>
              <div className="space-y-4">
                {['Simple daily meal guidance — practical suggestions that fit your real life', 'Daily nutrition wins — small choices that add up to real results', 'Better choices without overthinking: no weighing, no logging', 'Practical food suggestions designed for busy working adults', 'Aligned with your training — fuel for the work, not a separate battle'].map((item) => (
                  <div key={item} className="flex items-start gap-4"><span className="text-green-400 text-xl flex-shrink-0">✓</span><p className="text-gray-300">{item}</p></div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-3xl p-8 section-reveal" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-[family-name:var(--font-barlow-condensed)] text-3xl font-bold uppercase text-gray-500 mb-6">What It&apos;s NOT</h3>
              <div className="space-y-4">
                {['Not a calorie-counting program', 'Not a macro tracking app', 'Not a strict elimination diet', 'Not a meal-prep delivery requirement', 'Not another complicated system that makes eating stressful'].map((item) => (
                  <div key={item} className="flex items-start gap-4"><span className="text-gray-600 text-xl flex-shrink-0">✗</span><p className="text-gray-600">{item}</p></div>
                ))}
              </div>
            </div>
          </div>
          <div className="glass-card rounded-3xl p-10 text-center max-w-3xl mx-auto section-reveal">
            <p className="font-[family-name:var(--font-barlow-condensed)] text-4xl md:text-5xl font-black uppercase text-white mb-4">
              Make Better Choices.<br /><span className="gradient-text">Stack Better Days.</span>
            </p>
            <p className="text-gray-400">The goal isn&apos;t perfection. It&apos;s awareness and consistency. Small wins in the kitchen compound just like small wins in the gym.</p>
          </div>
        </div>
      </section>

      {/* SECTION 9 — WHY DIFFERENT */}
      <section className="py-24 relative mesh-gradient">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 section-reveal">
            <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">Not Another Fitness Trend</p>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-6xl md:text-8xl font-black uppercase leading-[0.9]">
              WHY THIS IS<br /><span className="gradient-text">DIFFERENT</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="glass-card rounded-2xl p-6 border border-red-500/20 section-reveal">
              <p className="text-red-400 font-bold text-sm uppercase tracking-wider mb-4">Most Programs</p>
              <ul className="space-y-3 text-gray-500 text-sm">
                {['Random workouts with no real progression', 'Built for gym veterans, not busy parents', 'Extreme diets that aren\'t sustainable', 'Hype-driven, not results-driven', 'No check-in or accountability structure'].map((item) => (
                  <li key={item} className="flex items-start gap-2"><span className="text-red-400">✗</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-green-500/20 section-reveal" style={{ animationDelay: '0.1s' }}>
              <p className="text-green-400 font-bold text-sm uppercase tracking-wider mb-4">Get Fit For The Family</p>
              <ul className="space-y-3 text-gray-300 text-sm">
                {['Strategic 3-phase progression over 21 days', 'Built specifically for busy parents and professionals', 'Practical nutrition — no obsession required', 'Purpose-driven, grounded, and real', 'Weekly check-ins and daily progress tracking'].map((item) => (
                  <li key={item} className="flex items-start gap-2"><span className="text-green-400">✓</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 section-reveal neon-border">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500/30 to-orange-700/30 border-2 border-orange-500/30 flex items-center justify-center flex-shrink-0 text-4xl">👤</div>
            <div>
              <p className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-2">Your Coach</p>
              <h3 className="font-[family-name:var(--font-barlow-condensed)] text-3xl font-black uppercase mb-3">Master Trainer &middot; Transformer Workout</h3>
              <p className="text-gray-400 leading-relaxed">
                This program is built and led by a certified Master Trainer with experience coaching real people: not athletes, not influencers, but working parents who want to reclaim their energy. Family By The Ton.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — PRICING */}
      <section id="pricing" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="section-reveal">
            <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm mb-4">Founding Member Offer</p>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-6">
              GET STARTED<br /><span className="gradient-text">TODAY</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12">One-time investment. Full 21-day access. No subscription required to start.</p>
          </div>
          <div className="glass-card rounded-3xl p-10 md:p-14 relative overflow-hidden section-reveal neon-border border-orange-500/30">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold px-6 py-2 rounded-full uppercase tracking-wide mb-8">
                Founding Member Price
              </div>
              <div className="mb-8">
                <span className="font-[family-name:var(--font-barlow-condensed)] text-8xl font-black text-white">$27</span>
                <span className="text-gray-500 text-xl ml-3">one time</span>
              </div>
              <ul className="text-left space-y-4 mb-10">
                {['21-Day Self-Paced Challenge Access', 'Follow-Along Workout Video Library (21 sessions)', 'Progress Tracker with Green Check System', 'Simple Nutrition Guidance & Daily Win Prompts', 'Weekly Check-In Framework', 'Home or Gym-Friendly Training', 'End-of-Challenge Celebration + Next Step Offer'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300"><span className="text-green-400 text-lg">✓</span>{item}</li>
                ))}
              </ul>
              <Link href="/signup" className="cta-btn flex flex-col items-center justify-center w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xl py-5 rounded-2xl text-center pulse-glow mb-4">
                <span>Join the Challenge &middot; $27</span>
                <span className="text-sm font-extrabold uppercase tracking-widest text-yellow-200 mt-1">Founder&apos;s Price</span>
              </Link>
              <p className="text-gray-500 text-sm">Instant access after checkout &middot; Self-paced &middot; Start when you&apos;re ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11 — FAQ */}
      <section className="py-24 relative">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16 section-reveal">
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-6xl md:text-8xl font-black uppercase leading-[0.9]">
              FREQUENTLY<br /><span className="gradient-text">ASKED</span>
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Is this challenge truly self-paced?', a: 'Yes. There are no live sessions, no countdown timers, and no one waiting on you. You start when you\'re ready, move through the days at your pace, and the dashboard holds your place. Life happens: just come back to the plan.' },
              { q: 'Do I need to already be in shape to start?', a: 'No. This challenge is built for people starting over or starting fresh. Week 1 is designed to ease you in, build the habit, and let your body adjust. You don\'t need to be in shape to start: you need to start to get in shape.' },
              { q: 'Do I need a gym membership?', a: 'No. The workouts are designed for home or gym. You choose. Minimal equipment, maximum effectiveness. The goal is to make it easy to show up, not to create more obstacles.' },
              { q: 'How long are the workouts?', a: 'Most workouts are 25–40 minutes. Recovery and mobility days are lighter, typically 15–25 minutes. Real, effective sessions that respect your time.' },
              { q: 'Is there meal or nutrition guidance included?', a: 'Yes. Simple meal suggestions, daily nutrition wins, and better-choice frameworks. Not calorie counting. Not a macro program. Guidance for busy adults that actually makes sense in real life.' },
              { q: 'What happens after I finish the 21 days?', a: 'You finish. You celebrate. You have a program you can run again, a streak you built, and habits that actually stuck. We\'ll also have an offer for what comes next if you want to keep going.' },
            ].map(({ q, a }) => (
              <div key={q} className="glass-card rounded-2xl overflow-hidden section-reveal">
                <details className="group">
                  <summary className="flex items-center justify-between px-8 py-6 cursor-pointer list-none hover:bg-white/5 transition-colors">
                    <span className="font-bold text-white text-lg">{q}</span>
                    <span className="faq-icon text-orange-500 text-2xl font-light">+</span>
                  </summary>
                  <div className="px-8 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">{a}</div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <Image src="/logo.jpg" alt="Transformer Workout Logo" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div className="font-[family-name:var(--font-barlow-condensed)] text-xl font-black tracking-wide uppercase whitespace-nowrap leading-none pt-0.5">
                TRANSFORMER <span className="text-orange-500">WORKOUT</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-gray-500 hover:text-white text-sm transition-colors">Sign In</Link>
              <Link href="/signup" className="text-gray-500 hover:text-white text-sm transition-colors">Join</Link>
            </div>
            <p className="text-gray-600 text-sm">&copy; 2025 Transformer Workout. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
