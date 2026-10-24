// src/data/teamData.js
import AftabImg from '../assets/Aftab.jpg';
import kashifImg from '../assets/Kashif.jpg';
import naveedImg from '../assets/Naveed.jpg';
import AsiaImg from '../assets/Asia.jpg';
import AyazImg from '../assets/Ayaz.jpg';
import DrImg from '../assets/Dr.png';
import contactDr from '../assets/Abdulrehman.jpeg';
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
    bio: "As a Speech Pathologist and CEO of REX Medical Complex, I am honored to lead an organization that is dedicated to providing free rehabilitation services to deserving individuals. Our mission is to empower those in need, regardless of their financial means, with the tools and support necessary to overcome their challenges."
  },
  {
    id: 2,
    name: "Ms. Asia Gillani",
    designation: "Chief Operating Officer | Consultant Speech and Language Pathologist",
    category: "SPEECH & LANGUAGE THERAPY",
    image: AsiaImg, // Aapki local image assign ki gayi hai
    qualification: "MS. Speech & Language Pathology . Certified Audiometrist (GTCTD)",
    experience: "5+ Years",
    specialization: "Behavior Modification & Skill Acquisition",
    expertise: [
      "Autism Support",
      "Child Psychology",
      "Behavioral Intervention",
      "Social Development"
    ],
    bio: "As the Chief Operating Officer of REX Medical Complex, I am responsible for ensuring that our organization runs smoothly and efficiently, allowing us to provide the best possible care to our clients"
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
    experience: "8+ Years",
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
    experience: "3+ Years",
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
    id: 6,
    name: "Dr. Abbas Aftab",
    designation: "Consultant Medical Physician & Neurologist",
    category: "Specialist Consultations", // Physician/neurologist, listed under Specialist Consultation on the booking page
    image: AftabImg, // Aapki local image
    qualification: "M.B.B.S, F.C.P.S. (Medicine)",
    experience: "15+ Years",
    specialization: "Neurology & Internal Medicine",
    expertise: [
      "Consultant Medical Physician",
      "Neurological Care",
      "General Hospital Lahore",
      "Family Medicine"
    ],
    bio: "Dr. Abbas Aftab is an experienced Consultant Medical Physician and Neurologist at General Hospital Lahore, specializing in comprehensive medical care, neurological diagnostics, and expert patient management."
  },
  {
    id: 7, // Aap apni zaroorat ke mutabiq ID set kar sakte hain
    name: "Dr. Abdur Rehman",
    designation: "Clinical Nutritionist & Specialist",
    category: "Nutrition & Wellness", // Aap category apne hisaab se rakh sakte hain
    image: contactDr,
    qualification: "PhD Nutrition, B.S. Natural Sciences",
    experience: "10+ Years",
    specialization: "Therapeutic Nutrition & Child Growth Support",
    expertise: [
      "Clinical Nutrition",
      "Therapeutic Diet Plans",
      "Child Growth & Vitality",
      "Natural Healing Support"
    ],
    bio: "Dr. Abdur Rehman brings over 10+ years of dedicated clinical experience with a PhD in Nutrition and a B.S. in Natural Sciences. His inspiring professional journey is driven by a deep passion for transforming lives through therapeutic nutrition. He empowers families with customized dietary strategies, helping children and individuals unlock their true growth, vitality, and healing potential for a healthier tomorrow."
  }
  ];