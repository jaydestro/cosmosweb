// src/pages/developer-community.js

import React from 'react';
import Layout from '@theme/Layout';
import './community.css'; // Ensure you have styles.css imported

const developerCommunityData = [
  {
    name: 'John Doe',
    imageUrl: 'https://loremflickr.com/200/200', // Random image
    link: 'https://azure.microsoft.com/en-us/services/cosmos-db/',
  },
  {
    name: 'Jane Smith',
    imageUrl: 'https://loremflickr.com/200/201', // Random image
    link: 'https://azure.microsoft.com/en-us/services/cosmos-db/',
  },
  {
    name: 'Alice Johnson',
    imageUrl: 'https://loremflickr.com/200/202', // Random image
    link: 'https://azure.microsoft.com/en-us/services/cosmos-db/',
  },
  {
    name: 'Bob Brown',
    imageUrl: 'https://loremflickr.com/200/203', // Random image
    link: 'https://azure.microsoft.com/en-us/services/cosmos-db/',
  },
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

export default function DeveloperCommunity() {
  return (
    <Layout title="Developer Community for Azure Cosmos DB" description="Join the Azure Cosmos DB Developer Community">
      <div className="container">
        <h1 className="title">Azure Cosmos DB Developer Community</h1>
        <div className="developer-cards">
          {developerCommunityData.map((developer, index) => (
            <DeveloperCard key={index} {...developer} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
