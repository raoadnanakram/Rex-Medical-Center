import { Link } from 'react-router-dom';
import { BUSINESS_NAME, ADDRESS, EMAIL, PHONES } from '../data/business';

// Privacy Policy, Terms of Service and Medical Disclaimer (SEO audit issue 11).
// The wording is a general starting draft and must be reviewed by the business before publishing.
const LAST_UPDATED = '25 October 2026';

const content = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Information we collect',
        body: `When you book a consultation or send a message through this website, we collect the details you enter, such as your name, phone number, email address, your child's age, the service you are interested in and any notes you choose to share.`,
      },
      {
        heading: 'How we use it',
        body: `We use this information only to respond to your enquiry, arrange and manage appointments, and provide the services you request. We do not sell your information.`,
      },
      {
        heading: 'Who can see it',
        body: `Your information is available only to ${BUSINESS_NAME} staff who need it to handle your enquiry or care. We may share it where required by law.`,
      },
      {
        heading: 'Messaging apps',
        body: `If you contact us on WhatsApp, your messages are also handled under WhatsApp's own privacy policy.`,
      },
      {
        heading: 'Your choices',
        body: `You can ask us to correct or delete the information you have given us by contacting us using the details below.`,
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      {
        heading: 'Using this website',
        body: `This website provides information about ${BUSINESS_NAME} and lets you request appointments. By using it you agree to these terms.`,
      },
      {
        heading: 'Appointments',
        body: `Submitting a booking form is a request, not a confirmed appointment. Our team will contact you to confirm the date, time and any applicable fees.`,
      },
      {
        heading: 'Accuracy of information',
        body: `We try to keep the information on this website accurate and up to date, but services, timings and team members may change. Please confirm details with us directly.`,
      },
      {
        heading: 'Changes',
        body: `We may update these terms from time to time. The date at the top of this page shows when they were last changed.`,
      },
    ],
  },
  disclaimer: {
    title: 'Medical Disclaimer',
    sections: [
      {
        heading: 'General information only',
        body: `The content on this website is for general information. It is not medical advice, a diagnosis or a treatment plan for any individual child or adult.`,
      },
      {
        heading: 'Always seek a professional assessment',
        body: `Every child is different. Decisions about therapy or treatment should be made after an assessment by a qualified clinician who knows your child's history.`,
      },
      {
        heading: 'Emergencies',
        body: `This website and our contact forms are not monitored for emergencies. If you believe someone needs urgent medical help, contact your nearest hospital or emergency service immediately.`,
      },
    ],
  },
};

export default function LegalPage({ type }) {
  const page = content[type];

  return (
    <main className="bg-slate-50 py-16 px-4">
      <article className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-12">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">{page.title}</h1>
        <p className="text-sm text-slate-500 mb-10">
          {BUSINESS_NAME} &middot; Last updated: {LAST_UPDATED}
        </p>

        {page.sections.map((s) => (
          <section key={s.heading} className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-2">{s.heading}</h2>
            <p className="text-slate-600 leading-relaxed">{s.body}</p>
          </section>
        ))}

        <section className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-2">Contact us</h2>
          <p className="text-slate-600 leading-relaxed">
            {BUSINESS_NAME}, {ADDRESS}
            <br />
            {PHONES.main.label}: <a className="text-[#1c296b] font-semibold" href={PHONES.main.href}>{PHONES.main.display}</a>
            {' '}&middot; Email: <a className="text-[#1c296b] font-semibold" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <p className="mt-6">
            <Link to="/" className="text-sm font-bold text-[#1c296b] hover:text-teal-700">&larr; Back to home</Link>
          </p>
        </section>
      </article>
    </main>
  );
}
