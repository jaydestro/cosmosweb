import React from 'react';
import Layout from '@theme/Layout';
import resourcesData from './resources.json';
import styles from './resources.module.css';

interface Resource {
  title: string;
  url: string;
  description: string;
}

const Resources: React.FC = () => {
  return (
    <Layout title="Resources" description="Useful links and calls to action">
      <div className={styles.container}>
        <h1 className={styles.title}>
          <img
            src="/img/planet-1.png"
            alt="Planet"
            className={styles.icon}
          />
          Resources
        </h1>

        <div className={styles.card}>
          {/* Summary text moved inside the same card as the links */}
          <p className={styles.summary}>
          Want to learn more about Azure Cosmos DB? Check out this curated list of resources including documentation, tutorials, recordings, developer guides, and more.
          </p>
          
          <ul className={styles.simpleList}>
            {resourcesData.map((res: Resource, idx: number) => (
              <li key={idx} className={styles.listItem}>
                <div className={styles.linkRow}>
                  <img
                    src="/img/planet-1.png"
                    alt="Planet icon"
                    className={styles.bulletIcon}
                  />
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {res.title}
                  </a>
                </div>
                <p className={styles.description}>{res.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
