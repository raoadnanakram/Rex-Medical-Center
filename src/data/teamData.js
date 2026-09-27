// src/data/teamData.js
import AftabImg from '../assets/Aftab.jpg';
import kashifImg from '../assets/Kashif.jpg';
import naveedImg from '../assets/Naveed.jpg';
import AsiaImg from '../assets/Asia.jpg';
import AyazImg from '../assets/Ayaz.jpg';
import DrImg from '../assets/Dr.PNG';

export const teamMembers = [
  {
    id: 1,
    name: "Naveed Ahmed Aftab Bhutta",
    designation: "CEO |Consultant Speech and Language Pathologist",
    category: "SPEECH & LANGUAGE THERAPY",
    image: naveedImg, // Aapki local image assign ki gayi hai
    qualification: "MS. Speech and Language Pathology | Certified Audiometrist (GTCTD)",
    experience: "8+ Years",
    specialization: "Autism & Behavioral Support",
    expertise: [
      "Autism Support",
      "Child Psychology",
      "Behavioral Intervention",
      "Social Development"
    ],
    bio: "As a Speech Pathologist and CEO of Rex Medical Centre, I am honored to lead an organization that is dedicated to providing free rehabilitation services to deserving individuals. Our mission is to empower those in need, regardless of their financial means, with the tools and support necessary to overcome their challenges."
  },
  {
    id: 2,
    name: "Ms. Asia Gillani",
    designation: "Chief Operating Officer | Consultant Speech and Language Pathologist",
    category: "SPEECH & LANGUAGE THERAPY",
    image: AsiaImg, // Aapki local image assign ki gayi hai
    qualification: "MS. Speech & Language Pathology . Certified Audiometrist (GTCTD)",
    experience: "6+ Years",
    specialization: "Behavior Modification & Skill Acquisition",
    expertise: [
      "Autism Support",
      "Child Psychology",
      "Behavioral Intervention",
      "Social Development"
    ],
    bio: "As the Chief Operating Officer of Rex Medical Centre, I am responsible for ensuring that our organization runs smoothly and efficiently, allowing us to provide the best possible care to our clients"
  },
  {
  id: 3, // Aap apnay sequence ke mutabiq ID change kar saktay hain
  name: "Dr. Kashif Faraz Ahmed",
  designation: "Clinical Psychologist & Life Coach",
  category: "Psychology",
  image: kashifImg, // Make sure to import KashifImg at the top of your file
  qualification: "Ph.D. in Clinical Psychology",
  experience: "15+ Years",
  specialization: "Mental Health Counseling & Life Coaching",
  expertise: [
    "Psychological Counseling",
    "Motivational Speaking",
    "Cognitive Behavioral Therapy (CBT)",
    "Behavioral Modification"
  ],
  bio: "Dr. Kashif Faraz Ahmed is a renowned clinical psychologist, academic, and life coach known for his transformative 'Kashifiyat' series, dedicated to enhancing mental well-being and personal development."
},
{
    id: 4,
    name: "Dr. Muhammad Ayzed",
    designation: "Consultant Surgeon & Specialist",
    category: "Physiotherapy", // Ya aap apni marzi ki category rakh sakte hain
    image: AyazImg,
    qualification: "M.B.B.S, F.C.P.S. (Surgery) | Fellow FCPS HPB/Liver Transplant Surgery",
    experience: "10+ Years",
    specialization: "HPB & Liver Transplant Surgery",
    expertise: [
      "HPB Surgery",
      "Liver Transplant Surgery",
      "Advanced Surgical Care",
      "Clinical Consultation"
    ],
    bio: "Dr. Muhammad Ayzed is an expert surgeon and Fellow FCPS in HPB/Liver Transplant Surgery, currently serving at Sheikh Zayed Hospital, Lahore, bringing extensive clinical expertise and advanced surgical care to patients."
  },
    {
    id: 2,
    name: "Hafiz M. Tahir Zia",
    designation: "Consultant Speech & Language Pathologist",
    category: "ABA Therapy", // Ya aap apni marzi ki category rakh sakte hain (jaise agar alag category ho)
    image: DrImg,
    qualification: "MS. Speech & Language Pathology | PGD Speech (GTCTD)",
    experience: "7+ Years",
    specialization: "Speech & Language Disorders",
    expertise: [
      "Speech Therapy",
      "Language Pathology",
      "Communication Disorders",
      "Articulation & Fluency"
    ],
    bio: "Hafiz M. Tahir Zia is an experienced Consultant Speech & Language Pathologist holding an MS in Speech & Language Pathology and PGD Speech (GTCTD). He is dedicated to helping individuals overcome communication challenges and develop clear, confident speech skills."
  },
  {
    id: 5,
    name: "Dr. Muhammad Arqam",
    designation: "Pediatric Physiotherapist",
    category: "Physiotherapy",
    image: AyazImg, // Aapki local image assign ki gayi hai
    qualification: "Doctor of Physical Therapy (DPT)",
    experience: "6+ Years",
    specialization: "Gross Motor Development & Balance",
    expertise: [
      "Neuromuscular Rehabilitation",
      "Gait & Balance Training",
      "Posture Correction",
      "Gross Motor Skills"
    ],
    bio: "Dr. Muhammad Arqam focuses on enhancing physical strength, posture, coordination, and mobility in children with developmental and neurological conditions."
  },
{
    id: 6,
    name: "Dr. Abbas Aftab",
    designation: "Consultant Medical Physician & Neurologist",
    category: "Physiotherapy", // Aap apni zaroorat ke mutabiq category change kar sakte hain
    image: DrImg, // Aapki local image
    qualification: "M.B.B.S, F.C.P.S. (Medicine)",
    experience: "8+ Years",
    specialization: "Neurology & Internal Medicine",
    expertise: [
      "Consultant Medical Physician",
      "Neurological Care",
      "General Hospital Lahore",
      "Family Medicine"
    ],
    bio: "Dr. Abbas Aftab is an experienced Consultant Medical Physician and Neurologist at General Hospital Lahore[cite: 1], specializing in comprehensive medical care, neurological diagnostics, and expert patient management."
  }
];