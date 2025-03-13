import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './speakers.module.css';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';

// Correct Paths for Social Media Icons
const X_LOGO_LIGHT = '/img/icons/x-logo-black.png';
const X_LOGO_DARK = '/img/icons/x-logo-white.png';
const LINKEDIN_LOGO_LIGHT = '/img/icons/InBug-Black.png';
const LINKEDIN_LOGO_DARK = '/img/icons/InBug-White.png';

// Speaker List with Social Media Links
const SpeakerList = [
  {
    "title": "Kirill Gavrylyuk - Microsoft",
    "name": "Kirill",
    "img": "/img/speakers/Kirill_Gavrylyuk.jpg",
    "intro": "Product Leader with experience of leading and growing multiple large-scale cloud services...",
    "session": {
      "title": "Building Scalable Cloud Services",
      "abstract": "An in-depth session on how to build scalable and reliable cloud services..."
    },
    "x": "https://x.com/kirillg_msft",
    "linkedin": "https://www.linkedin.com/in/kirillgavrylyuk/"
  },
  {
    "title": "Divakar Kumar - FlyersSoft",
    "name": "Divakar",
    "img": "/img/speakers/Divakar_Kumar.jpg",
    "intro": "Technical Architect @FlyersSoft | Microsoft MVP | MCT",
    "session": {
      "title": "Azure Cosmos DB in AI Workflows",
      "abstract": "Explore how Azure Cosmos DB empowers AI workflows with vector storage, semantic layering, and Microsoft Fabric integrations."
    },
    "linkedin": "https://www.linkedin.com/in/divakar-kumar/"
  },
  {
    "title": "Farah Abdou - AI & NLP Engineer",
    "name": "Farah",
    "img": "/img/speakers/Farah_Abdou.jpg",
    "intro": "Machine Learning Engineer and NLP Instructor",
    "session": {
      "title": "Enterprise AI-Powered Predictive Maintenance Platform",
      "abstract": "How Azure Cosmos DB and AI technologies create intelligent, scalable platforms for real-time equipment monitoring."
    },
    "x": "https://x.com/FaraahCodes",
    "linkedin": "https://www.linkedin.com/in/farah-m-abdou-1a8a31222"
  },
  {
    "title": "Kevin Gatimu - Microsoft MVP",
    "name": "Kevin",
    "img": "/img/speakers/Kevin_Gatimu.jpg",
    "intro": "Technical Trainer - Teach2Give, Microsoft MVP (Web & Cosmos DB)",
    "session": {
      "title": "Hybrid Search in Azure Cosmos DB",
      "abstract": "Learn how to build an enterprise knowledge management system using hybrid search with vector search and full-text scoring."
    },
    "x": "https://x.com/_kevincomba",
    "linkedin": "https://www.linkedin.com/in/kevin-comba-gatimu/"
  },
  {
    "title": "Srinivas Reddy Mosali - Visa",
    "name": "Srinivas",
    "img": "/img/speakers/Srinivas_Reddy_Mosali.jpg",
    "intro": "Visa Technology and Operations LLC",
    "session": {
      "title": "Intelligent Resource Optimization",
      "abstract": "Optimizing Azure Cosmos DB for AI workloads, reducing costs while improving performance."
    },
    "linkedin": "https://www.linkedin.com/in/srinivas-reddy-mosali-b9548b141/"
  },
  {
    "title": "Vin Kamat - H&R Block",
    "name": "Vin",
    "img": "/img/speakers/Vin_Kamat.jpg",
    "intro": "Principal Architect, H&R Block",
    "session": {
      "title": "Azure Cosmos DB for AI-Enabled Enterprise Apps",
      "abstract": "Exploring Cosmos DB as a backbone for enterprise-grade AI applications."
    }
  },
  {
    "title": "Mani Jaman - H&R Block",
    "name": "Mani",
    "img": "/img/speakers/Mani_Jaman.jpg",
    "intro": "Principal Architect, H&R Block",
    "session": {
      "title": "Azure Cosmos DB for AI-Enabled Enterprise Apps",
      "abstract": "Exploring Cosmos DB as a backbone for enterprise-grade AI applications."
    },
    "linkedin": "https://www.linkedin.com/in/manijaman"
  },
  {
    "title": "Sudhanshu Khera - Microsoft",
    "name": "Sudhanshu",
    "img": "/img/speakers/Sudhanshu_Khera.jpg",
    "intro": "Senior Product Manager, Microsoft",
    "session": {
      "title": "Enhancing Security in Azure Cosmos DB",
      "abstract": "Best practices for securing Azure Cosmos DB with NSP and Managed Identity."
    }
  },
  {
    "title": "Iria Osara - Microsoft",
    "name": "Iria",
    "img": "/img/speakers/Iria_Osara.jpg",
    "intro": "Program Manager, Microsoft",
    "session": {
      "title": "Enhancing Security in Azure Cosmos DB",
      "abstract": "Best practices for securing Azure Cosmos DB with NSP and Managed Identity."
    },
    "x": "https://www.twitter.com/bigdataprincess",
    "linkedin": "https://www.linkedin.com/in/iriaeno"
  },
  {
    "title": "Justine Cocchi - Microsoft",
    "name": "Justine",
    "img": "/img/speakers/Justine_Cocchi.jpg",
    "intro": "Senior Program Manager, Microsoft",
    "session": {
      "title": "Real-Time Applications with Change Feed",
      "abstract": "Exploring how Azure Cosmos DB’s change feed enables real-time applications."
    },
    "x": "https://twitter.com/justinecocchi"
  },
  {
    "title": "Brian Benz - Microsoft",
    "name": "Brian",
    "img": "/img/speakers/Brian_Benz.jpg",
    "intro": "Java Champion & Cloud Advocate at Microsoft",
    "session": {
      "title": "Real-Time Analytics with Cosmos DB & GPU-Enhanced Apache Spark",
      "abstract": "Leveraging Cosmos DB, Apache Spark, and GPU acceleration for real-time analytics."
    },
    "x": "https://twitter.com/bbenz",
    "linkedin": "https://www.linkedin.com/in/brianbenz/"
  },
  {
    "title": "Cary Chai - Microsoft",
    "name": "Cary",
    "img": "/img/speakers/Cary_Chai.jpg",
    "intro": "Product Manager, Microsoft",
    "session": {
      "title": "Real-Time Analytics with Cosmos DB & GPU-Enhanced Apache Spark",
      "abstract": "Leveraging Cosmos DB, Apache Spark, and GPU acceleration for real-time analytics."
    },
    "linkedin": "https://www.linkedin.com/in/caryzchai/"
  },
  {
    "title": "Alexander Spiridonov - NVIDIA",
    "name": "Alexander",
    "img": "/img/speakers/Alexander_Spiridonov.jpg",
    "intro": "Solutions Architect, NVIDIA",
    "session": {
      "title": "Real-Time Analytics with Cosmos DB & GPU-Enhanced Apache Spark",
      "abstract": "Leveraging Cosmos DB, Apache Spark, and GPU acceleration for real-time analytics."
    }
  },
  {
    "title": "James Codella - Microsoft",
    "name": "James",
    "img": "/img/speakers/James_Codella.jpg",
    "intro": "Principal Product Manager, Azure Cosmos DB",
    "session": {
      "title": "How Microsoft Powers AI Apps with DiskANN",
      "abstract": "Exploring DiskANN’s role in Microsoft’s AI stack and its integration with Cosmos DB."
    },
    "x": "https://twitter.com/jamescodella",
    "linkedin": "https://www.linkedin.com/in/jamescodella/"
  },
  {
    "title": "Simon Kofod - Novo Nordisk",
    "name": "Simon",
    "img": "/img/speakers/Simon_Kofod.jpg",
    "intro": "Lead Software Developer at Novo Nordisk",
    "session": {
      "title": "Reducing Database Costs to $1 with Azure Cosmos DB",
      "abstract": "How to optimize data modeling and leverage serverless Cosmos DB for cost efficiency."
    },
    "linkedin": "https://www.linkedin.com/in/simon-kofod/"
  }
];

// Dynamically split speakers into two columns
const leftSpeakers = SpeakerList.filter((_, index) => index % 2 === 0);
const rightSpeakers = SpeakerList.filter((_, index) => index % 2 !== 0);

// Define TypeScript Props
interface FeatureProps {
  img: string;
  title: string;
  name: string;
  intro: string;
  session: { title: string; abstract: string };
  x?: string;
  linkedin?: string;
}

// Speaker card component
function Feature({ img, title, name, intro, session, x, linkedin }: FeatureProps) {
  const { colorMode } = useColorMode(); // ✅ Detect theme mode
  const isDarkMode = colorMode === 'dark';

  return (
    <div className={clsx(styles.featureCard)}>
      {/* Image Section */}
      <div className={clsx(styles.featureImgContainer)}>
        <img className={styles.featureImg} alt={title} src={img} />
      </div>

      {/* Content & Link Wrapper */}
      <div className={clsx(styles.featureContent)}>
        <Link 
          to={`/speakers/speaker?name=${encodeURIComponent(name)}&title=${encodeURIComponent(title)}&intro=${encodeURIComponent(intro)}&sessionTitle=${encodeURIComponent(session.title)}&sessionAbstract=${encodeURIComponent(session.abstract)}&img=${encodeURIComponent(img)}`}
          className={styles.featureLink}
        >
          <h3 className={styles.featureTitle}>{title}</h3>
          <p className={styles.featureIntro}>{intro}</p>
        </Link>

        {/* Social Media Icons (Now Using Correct Theme-Based Icons) */}
        {(x || linkedin) && (
          <div className={styles.socialIcons}>
            {x && (
              <a href={x} target="_blank" rel="noopener noreferrer">
                <img className={styles.socialIcon} src={isDarkMode ? X_LOGO_DARK : X_LOGO_LIGHT} alt="X Logo" />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <img className={styles.socialIcon} src={isDarkMode ? LINKEDIN_LOGO_DARK : LINKEDIN_LOGO_LIGHT} alt="LinkedIn Logo" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Speakers Page
export default function Speakers() {
  return (
    <Layout description="Welcome to the Azure Cosmos DB Conf 2025 site">
      <main>
        <section className={styles.speakerSection}>
          <div className={styles.speakerContainer}>

            {/* Centered Heading */}
            <h2 className={styles.speakerHeading}>
              Hear from the Azure Cosmos DB team, your favorite community members, and fresh faces.
            </h2>

            {/* 2-column responsive grid */}
            <div className={styles.speakerGrid}>
              <div className={styles.speakerColumn}>
                {leftSpeakers.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
              <div className={styles.speakerColumn}>
                {rightSpeakers.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
    </Layout>
  );
}
