// Per-page SEO metadata (SEO audit issue 05). Used by the <Seo /> component in the browser
// and by scripts/prerender.mjs at build time, which also builds sitemap.xml from this list.
// Only indexable pages belong here; admin routes are deliberately left out.
// `name` is the short page name used in breadcrumbs.

export const seoRoutes = [
  {
    path: '/',
    name: 'Home',
    title: 'REX Medical Complex | Child Therapy Centre in Lahore',
    description:
      'Speech therapy, ABA therapy, occupational therapy, physiotherapy and play therapy for children in Allama Iqbal Town, Lahore. Book a free consultation.',
  },
  {
    path: '/about',
    name: 'About Us',
    title: 'About Us | REX Medical Complex Lahore',
    description:
      'Learn about REX Medical Complex, a child development and therapy centre in Allama Iqbal Town, Lahore, and the team behind it.',
  },
  {
    path: '/about/our-team',
    name: 'Our Team',
    title: 'Our Team | Therapists & Specialists | REX Medical Complex',
    description:
      'Meet the speech and language pathologists, therapists and consultant specialists at REX Medical Complex, Lahore.',
  },
  {
    path: '/services',
    name: 'Services',
    title: 'Child Therapy Services in Lahore | REX Medical Complex',
    description:
      'Explore speech, ABA, occupational, physiotherapy, play therapy and specialist consultations for children at REX Medical Complex, Lahore.',
  },
  {
    path: '/services/speech-therapy',
    name: 'Speech Therapy',
    title: 'Speech Therapy for Children in Lahore | REX Medical Complex',
    description:
      'Speech and language therapy for speech delay, stammering and communication difficulties in children. Qualified speech pathologists in Lahore.',
  },
  {
    path: '/services/behavior-therapy',
    name: 'ABA Therapy',
    title: 'ABA Therapy in Lahore | REX Medical Complex',
    description:
      'Applied Behavior Analysis (ABA) therapy for children with autism and behavioural challenges at REX Medical Complex, Allama Iqbal Town, Lahore.',
  },
  {
    path: '/services/occupational-therapy',
    name: 'Occupational Therapy',
    title: 'Occupational Therapy for Children in Lahore | REX Medical Complex',
    description:
      'Paediatric occupational therapy and sensory integration to build motor, self-care and sensory-processing skills. Book a free consultation in Lahore.',
  },
  {
    path: '/services/physiotherapy',
    name: 'Physiotherapy',
    title: 'Physiotherapy in Lahore | REX Medical Complex',
    description:
      'Physiotherapy at REX Medical Complex, Lahore, supporting mobility, balance, strength and coordination. Book a consultation with our team.',
  },
  {
    path: '/services/sensory-therapy',
    name: 'Sensory Integration Therapy',
    title: 'Sensory Integration Therapy in Lahore | REX Medical Complex',
    description:
      'Sensory integration therapy for children who over- or under-respond to sound, touch and movement, at REX Medical Complex, Lahore.',
  },
  {
    path: '/services/play-therapy',
    name: 'Play Therapy',
    title: 'Play Therapy for Children in Lahore | REX Medical Complex',
    description:
      'Play therapy that helps children express feelings, build confidence and develop social skills, at REX Medical Complex, Lahore.',
  },
  {
    path: '/services/specialist-consultations',
    name: 'Specialist Consultations',
    title: 'Specialist Doctor Consultations in Lahore | REX Medical Complex',
    description:
      'Consult experienced specialist doctors at REX Medical Complex, Allama Iqbal Town, Lahore. Book your appointment online or on WhatsApp.',
  },
  {
    path: '/conditions',
    name: 'Conditions We Support',
    title: 'Conditions We Support | Autism, ADHD, Speech Delay | REX',
    description:
      'Autism, ADHD, speech delay, stammering and other developmental conditions supported by the therapy team at REX Medical Complex, Lahore.',
  },
  {
    path: '/therapy-tools',
    name: 'Therapy Tools',
    title: 'Speech Therapy Toys, Books & Tools | REX Medical Complex',
    description:
      'Speech therapy toys, books and learning tools chosen by therapists to help children practise communication at home. Delivery across Pakistan.',
  },
  {
    path: '/contact',
    name: 'Contact',
    title: 'Contact REX Medical Complex | Allama Iqbal Town, Lahore',
    description:
      'Call 0324 4409797, WhatsApp 0327 6680954 or visit 91 A, College Block, Allama Iqbal Town, Lahore. Get in touch with REX Medical Complex.',
  },
  {
    path: '/book-a-free-consult',
    name: 'Book a Free Consultation',
    title: 'Book a Free Consultation | REX Medical Complex Lahore',
    description:
      'Book a free consultation with a therapist or specialist at REX Medical Complex, Lahore. Choose a service, date and time online.',
  },
  {
    path: '/donate',
    name: 'Donate',
    title: 'Donate | Support Child Therapy | REX Medical Complex',
    description:
      'Support therapy for children from families in need. Donate to REX Medical Complex by bank transfer or mobile wallet.',
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    title: 'Privacy Policy | REX Medical Complex',
    description: 'How REX Medical Complex collects, uses and protects the information you share through this website.',
  },
  {
    path: '/terms-of-service',
    name: 'Terms of Service',
    title: 'Terms of Service | REX Medical Complex',
    description: 'The terms that apply when you use the REX Medical Complex website and booking forms.',
  },
  {
    path: '/medical-disclaimer',
    name: 'Medical Disclaimer',
    title: 'Medical Disclaimer | REX Medical Complex',
    description: 'Information on this website is general and is not a substitute for an assessment by a qualified clinician.',
  },
];

// Old URLs that moved. The prerender step writes a redirect page at each old path and the
// app redirects them client-side, so existing links and bookmarks keep working.
export const redirects = {
  '/Tools': '/therapy-tools',
  '/donat-now': '/donate',
  '/services/sensorytherapy': '/services/sensory-therapy',
  '/services/playtherapy': '/services/play-therapy',
};

export const ADMIN_META = {
  title: 'Admin | REX Medical Complex',
  description: 'Staff area.',
};

export const NOT_FOUND_META = {
  title: 'Page Not Found | REX Medical Complex',
  description: 'The page you are looking for could not be found.',
};

export function getSeoForPath(pathname) {
  const clean = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';
  return seoRoutes.find((r) => r.path === clean) || null;
}
