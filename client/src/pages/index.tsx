import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const title = "Azure Cosmos DB Samples Gallery";
const description = "Your best source for patterns and content for Azure Cosmos DB";
const subtitle = "Featured Resources";
const developerCommunityData = [
  {
    name: 'Discover Templates',
    imageUrl: 'https://loremflickr.com/200/200', // Random image
    link: 'https://azure.microsoft.com/en-us/services/cosmos-db/',
  },
  {
    name: 'Learn more about Azure Cosmos DB',
    imageUrl: 'https://loremflickr.com/200/201', // Random image
    link: 'https://azure.microsoft.com/en-us/services/cosmos-db/',
  },
  {
    name: 'Azure Cosmos DB community',
    imageUrl: 'https://loremflickr.com/200/202', // Random image
    link: 'https://azure.microsoft.com/en-us/services/cosmos-db/',
  } 
];



const DeveloperCard = ({ name, imageUrl, link }) => {
  return (
    <div className="developer-card">
      <img src={imageUrl} alt={name} className="developer-card-image" />
      <h3>{name}</h3>
      <a href={link} target="_blank" rel="noopener noreferrer" className="developer-card-link">
        Learn More <span className="arrow">→</span>
      </a>
    </div>
  );
};


export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDarkMode(theme === 'dark');
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(newTheme === 'dark');
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Welcome to the Azure Cosmos DB Conf 2025 site">
      <main className={styles.mainContainer}>
        <div className={styles.coverPageContainer}>
          <img
            src={isDarkMode ? useBaseUrl("/img/backgroundDark.png") : useBaseUrl("/img/backgroundLight.png")}
            className={styles.cover}
            onError={({ currentTarget }) => { currentTarget.style.display = "none"; }}
            alt=""
          />
        </div>
        <div className={styles.content}>
          <div className={styles.textContainer}>
            <h2>Azure Cosmos DB</h2>
            <p>Your best source for patterns and content for Azure Cosmos DB</p>
          </div>
        
          {/* <div className={styles.videoContainer}>
            <iframe
              className={styles.iframe}
              src="https://www.youtube.com/embed/9z3PiHSCcYs?si=F1yKpoiOQnzb4o-K"
              title="Azure Developer CLI: GitHub to cloud in minutes - Universe 2022"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div> */}
        </div>
        <div className="developer-cards">
          {developerCommunityData.map((developer, index) => (
            <DeveloperCard key={index} {...developer} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
