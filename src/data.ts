export const AVAILABLE = false

export type FilterId = 'all' | 'unity' | 'html5' | 'personal' | 'lead' | 'gameplay'
export interface Project {
  slug: string
  title: string
  studio: string
  years?: string
  role: string
  filters: Exclude<FilterId, 'all'>[]
  award?: string
  withheld?: boolean
  image?: string | null
  url?: string
  tagline: string
  bullets: string[]
  stack: string[]
}
export interface CareerRole {
  id: string
  studio: string
  role: string
  location: string
  start: string
  end: string | null
  lane: number
  work: string
  bullets: string[]
}

export const profile = {
  name: 'Don Bolante',
  brand: 'DON BOLANTE',
  brandSuffix: '/ game dev',
  email: 'bolanteoc@gmail.com',
  enquiry: 'mailto:bolanteoc@gmail.com?subject=Project%20enquiry',
  linkedin: 'https://www.linkedin.com/in/donbolante',
  linkedinLabel: 'linkedin.com/in/donbolante',
  phone: '+63 917 836 4093',
  phoneHref: 'tel:+639178364093',
  location: 'Manila, PH — remote worldwide',
  available: 'Open for freelance',
  heroLabel: '// Senior game developer — Manila, UTC+8',
  headline: ['Games,', 'engineered', 'to'],
  highlight: 'ship.',
  introduction: 'Twelve years building games in Unity and HTML5 — from the BFTA-winning Viewfinder to video slots for web and mobile. I take on freelance engineering, pipelines, and full production.',
  primaryCta: 'Start a project',
  secondaryCta: 'See the work',
  specTitle: 'spec.sheet',
  specRevision: 'rev 2026',
  specFootnote: 'Built for the long game.',
  specs: [
    { label: 'CURRENT ROLE', value: 'Senior Frontend Developer', detail: 'Booming Games' },
    { label: 'STUDIO', value: 'Chryse Inc., olisab studio', detail: 'Co-founder' },
    { label: 'STACK', value: 'Unity · C# · TypeScript · Pixi.js' },
    { label: 'PIPELINES', value: 'GitHub Actions · GitLab CI' },
    { label: 'CLIENTS', value: 'Malta · UK · Hong Kong · PH' },
    { label: 'SHIPPING', value: 'Since 2014' },
  ],
  contactHeading: ['Have a game', 'to build?'],
  contactLabel: '// Let’s make it happen',
  contactDescription: 'Tell me what you’re building, where you are in production, and how I can help.',
  contactLabels: { linkedin: 'LinkedIn', phone: 'Phone', based: 'Based' },
  footerNote: 'Slot titles withheld under NDA',
  footerSignature: 'Designed to ship.',
}

export const navigation = [
  { id: 'services', number: '01', title: 'Services', heading: 'From idea to executable.' },
  { id: 'work', number: '02', title: 'Selected work', navTitle: 'Work', heading: 'Games & personal projects' },
  { id: 'timeline', number: '03', title: 'Timeline', heading: '2014 → now' },
  { id: 'skills', number: '04', title: 'Skills', heading: 'Toolchain' },
  { id: 'contact', number: '05', title: 'Contact', heading: 'Have a game to build?' },
]

export const metadata = {
  title: 'Don Bolante — Senior Game Developer',
  description: 'Don Bolante is a senior game developer in Manila. Twelve years shipping Unity and HTML5 games. Freelance engineering, build pipelines, and full game production.',
  socialDescription: 'Games, engineered to ship. Unity, HTML5 and Pixi.js engineering, pipelines, and full game production.',
  url: 'https://dnblnt.github.io',
  socialImage: 'og-image.png',
  jobTitle: 'Senior Game Developer',
}

export const services = [
  { code: 'S/01', icon: 'browser', title: 'HTML5 & Pixi.js games', description: 'TypeScript + Pixi 8 builds that run smoothly on mobile, web, and land-based slot machines.' },
  { code: 'S/02', icon: 'cube', title: 'Unity development', description: 'Gameplay systems, features, tools, and fixes, for new projects or existing codebases.' },
  { code: 'S/03', icon: 'reels', title: 'Slot game development', description: 'Video slots built from the ground up: reels, features and presentation.' },
  { code: 'S/04', icon: 'arrows', title: 'Porting & optimization', description: 'Move games to new platforms and get frame times and load sizes under control.' },
  { code: 'S/05', icon: 'pipeline', title: 'CI/CD & build pipelines', description: 'Automated builds and delivery with GitHub Actions, GitLab CI and Jenkins, including deployments to Vercel.' },
  { code: 'S/06', icon: 'flag', title: 'Full game production', description: 'End-to-end delivery through my studios Chryse and olisab studio, covering engineering, production, and publishing.' },
]

export const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unity', label: 'Unity' },
  { id: 'html5', label: 'HTML5 / Pixi' },
  { id: 'personal', label: 'Personal projects' },
  { id: 'lead', label: 'Lead & production' },
  { id: 'gameplay', label: 'Gameplay' },
]

export const projects: Project[] = [
  {
    slug: 'viewfinder', title: 'Viewfinder', studio: 'Sad Owl Studios', years: '2022–23', role: 'Senior Unity Developer', filters: ['unity'], award: 'BAFTA winner',
    tagline: 'A new perspective on what’s possible.',
    bullets: ['Features and fixes on the BAFTA-winning puzzle game.', 'Built CI/CD with GitHub Actions, AWS and Slack.', 'Led collaboration with the third-party QA team.'],
    stack: ['Unity', 'C#', 'GitHub Actions', 'AWS'],
  },
  {
    slug: 'slots', title: 'Video Slot Portfolio', studio: "Play'n GO · Booming Games", years: '2023–now', role: 'Frontend → Senior HTML5 Game Developer', filters: ['html5'], withheld: true,
    tagline: 'Built from the ground up. Played worldwide.',
    bullets: ['Multiple video slots built from the ground up for web and mobile.', 'Pixi, React, Vite.', 'Individual titles and assets withheld under NDA.'],
    stack: ['TypeScript', 'Pixi.js', 'Pixi 8', 'HTML5'],
  },
  {
    slug: 'shots-fired', title: 'Shots Fired', studio: 'Chryse', years: '2015–now', role: 'Co-founder, CTO', filters: ['lead'], award: 'Best Overseas Game — China IndiePlay 2017',
    tagline: 'An indie game. A studio built around it.',
    bullets: ['Built game systems across PC, mobile and web.', 'Handled production, operations and publisher communications.', 'Represented the studio at international game shows.'],
    stack: ['PC', 'Mobile', 'Web', 'Production'],
  },
  {
    slug: 'goblin-stone', title: 'Goblin Stone', studio: 'Orc Chop Games', years: '2020–22', role: 'Lead Game Engineer', filters: ['unity', 'lead'],
    tagline: 'Big adventures. Small, green protagonists.',
    bullets: ['Gameplay features and optimization.', 'Built game systems on the existing codebase.', 'CI/CD, analytics, Steam launch.'],
    stack: ['Unity', 'C#', 'Jenkins'],
  },
  {
    slug: 'political-animals', title: 'Political Animals', studio: 'Squeaky Wheel Studio', years: '2016–17', role: 'Contractor Programmer', filters: ['unity', 'gameplay'], award: 'Busan Indie Connect 2016',
    tagline: 'A different kind of political animal.',
    bullets: ['Implemented gameplay, UI, animations, VFX and localization.', 'Built custom editors on MVVM and IoC architecture.', 'Showcased at Busan Indie Connect 2016.'],
    stack: ['Unity', 'C#', 'MVVM', 'IoC'],
  },
  {
    slug: 'academia', title: 'Academia: School Simulator', studio: 'Squeaky Wheel Studio', years: '2016–17', role: 'Contractor Programmer', filters: ['unity', 'gameplay'],
    tagline: 'Systems that make a school come alive.',
    bullets: ['Built gameplay, UI, animations and VFX.', 'Implemented localization and editor tooling.', 'Worked with MVVM and IoC architecture.'],
    stack: ['Unity', 'C#', 'MVVM', 'IoC'],
  },
  {
    slug: 'wild-season', title: 'Wild Season', studio: 'Quickfire Games', years: '2014–15', role: 'Game Developer', filters: ['gameplay'],
    tagline: 'Where the shipping journey started.',
    bullets: ['Implemented gameplay systems, UI and animations.', 'Created VFX and custom editor tools.'],
    stack: ['Gameplay', 'UI', 'VFX', 'Tools'],
  },
  {
    slug: 'rival-ph', title: 'Rival.ph', studio: 'olisab studio', role: 'Developer', filters: ['personal'], image: 'work/rival-ph.png', url: 'https://rival.ph',
    tagline: 'Basketball leagues, from schedules to live scores.',
    bullets: ['Built a basketball league management app with scheduling, live scoring, standings and player profiles.', 'Developed the application with React and Supabase.', 'Automated deployment to Vercel with GitHub Actions.'],
    stack: ['React', 'Supabase', 'GitHub Actions', 'Vercel'],
  },
  {
    slug: 'room-riot', title: 'Room Riot', studio: 'olisab studio', role: 'Developer', filters: ['personal', 'gameplay'], image: 'work/room-riot.png', url: 'https://roomriot.app',
    tagline: 'Filipino party games, straight from your browser.',
    bullets: ['Created a collection of party games inspired by Filipino culture, including trivia, emoji puzzles and crowd voting.', 'Players host rooms in a browser and join from their phones, without installing an app.', 'Built with Cloudflare Durable Objects, Firebase and PostHog.'],
    stack: ['Cloudflare', 'Firebase', 'PostHog'],
  },
  {
    slug: 'kix-dream-soccer', title: 'KiX Dream Soccer', studio: 'KiX Games', years: '2018–20', role: 'Lead Developer', filters: ['unity', 'lead', 'gameplay'], image: null,
    tagline: 'Soccer game development and team leadership.',
    bullets: ['Developed KiX Dream Soccer as Lead Developer at KiX Games.', 'Refactored game systems with MVC.', 'Led, hired and ran the development team.'],
    stack: ['Unity', 'C#', 'MVC', 'Team leadership'],
  },
]

export const timeline = {
  start: '2014-01', end: '2027-01', initial: '2022-10',
  description: 'Twelve years, a few time zones, and a lot of shipped code.',
  hint: 'Drag to explore · ← → month · Shift + arrow year',
  accessibleLabel: 'Explore Don Bolante’s career by month',
  activeRolesLabel: 'ACTIVE ROLES',
  nowLabel: 'NOW',
  emptyHeading: 'Between chapters.',
  emptyDescription: 'Explore the timeline to see the roles and projects along the way.',
  play: 'Play career', pause: 'Pause',
  months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
}

export const career: CareerRole[] = [
  { id: 'quickfire', studio: 'Quickfire Games', role: 'Game Developer', location: 'Manila', start: '2014-01', end: '2015-11', lane: 1, work: 'Wild Season', bullets: ['Gameplay, UI and animations.', 'VFX and custom editor tools.'] },
  { id: 'chryse', studio: 'Chryse', role: 'Co-founder, CTO', location: 'Manila', start: '2015-12', end: null, lane: 0, work: 'Shots Fired', bullets: ['Game systems across PC, mobile and web.', 'Production, operations and publisher communications.', 'Represented the studio at international game shows.'] },
  { id: 'squeaky', studio: 'Squeaky Wheel', role: 'Contractor Programmer', location: 'Manila', start: '2016-03', end: '2017-06', lane: 1, work: 'Political Animals · Academia: School Simulator', bullets: ['Gameplay, UI, animations, VFX and localization.', 'Custom editor tools with MVVM and IoC.'] },
  { id: 'kix', studio: 'KiX Games', role: 'Lead Developer', location: 'Hong Kong (remote)', start: '2018-07', end: '2020-04', lane: 1, work: 'KiX Dream Soccer · KiX Magic Soccer', bullets: ['Refactored game systems with MVC.', 'Led, hired and ran the development team.'] },
  { id: 'orc-chop', studio: 'Orc Chop Games', role: 'Lead Game Engineer', location: 'Manila', start: '2020-07', end: '2022-07', lane: 1, work: 'Goblin Stone', bullets: ['Jenkins CI/CD and game systems on an existing codebase.', 'Managed an external development team in Beijing.'] },
  { id: 'sad-owl', studio: 'Sad Owl Studios', role: 'Senior Unity Developer', location: 'UK (remote)', start: '2022-07', end: '2023-11', lane: 1, work: 'Viewfinder', bullets: ['Features and fixes on the BAFTA-winning puzzle game.', 'GitHub Actions, AWS and Slack CI/CD.', 'Led collaboration with third-party QA.'] },
  { id: 'play-n-go', studio: "Play'n GO", role: 'Frontend Developer', location: 'Manila', start: '2023-07', end: '2025-09', lane: 2, work: 'Video slot games', bullets: ['Built multiple video slots from the ground up.', 'Shipped browser games for web and mobile.'] },
  { id: 'booming', studio: 'Booming Games', role: 'Senior HTML5 Game Developer', location: 'Malta (remote)', start: '2025-09', end: null, lane: 1, work: 'Video slot games', bullets: ['Currently shipping games on Pixi 8.', 'TypeScript and Pixi.js engineering for web and mobile.'] },
]

export const skillGroups = [
  { code: 'T/01', title: 'Engines & frameworks', skills: ['Unity', 'Godot', 'Pixi.js', 'React', 'Cocos2d', 'Flambe', '2DKit', 'XNA'] },
  { code: 'T/02', title: 'Languages', skills: ['C#', 'TypeScript', 'JavaScript', 'HTML5', 'CSS', 'PHP'] },
  { code: 'T/03', title: 'Backend & ops', skills: ['AWS', 'Jenkins', 'GitHub Actions', 'GitLab CI', 'Supabase', 'Vercel', 'Cloudflare', 'Firebase', 'PostHog', 'UPM', 'PlayFab', 'Photon'] },
  { code: 'T/04', title: 'Practice', skills: ['MVC', 'MVVM', 'IoC', 'Agile', 'Scrum', 'LiveOps', 'CI/CD'] },
]

export const ui = {
  skipLink: 'Skip to content', navigation: 'Main navigation',
  workNote: 'Games I’ve helped bring to life, alongside personal projects from olisab studio.',
  caseStudy: 'Case study', previous: 'Previous project', next: 'Next project', close: 'Close case study',
  view: 'VIEW', open: '— OPEN', imageLabel: 'PROJECT IMAGE', ndaLabel: 'TITLES UNDER NDA',
  studio: 'Studio', role: 'Role', years: 'Years',
  visitProject: 'Visit project',
  copyEmail: 'Copy email', copied: 'Copied ✓', copyFailed: 'Select email',
  filterLabel: 'Filter projects', projectsLabel: 'projects', technologyLabel: 'Project technologies', artworkLabel: 'game artwork', viewAction: 'View', closeAction: 'Close', caseStudyLabel: 'case study', profileLabel: 'Professional profile', homeLabel: 'home',
  copyright: '© 2026 Don Bolante',
}
