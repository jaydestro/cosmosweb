import React from 'react';
import Layout from '@theme/Layout';
import './Speaker.css';

const Speaker = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const name = searchParams.get('name');
  const title = searchParams.get('title');
  const intro = searchParams.get('intro');
  const sessionTitle = searchParams.get('sessionTitle');
  const sessionAbstract = searchParams.get('sessionAbstract');
  const img = searchParams.get('img');

  return (
    <Layout title={`${name} - Speaker Details`} description={`Details about ${name}'s session at Azure Cosmos DB Conf 2025`}>
      <div className="speaker-detail-container">
        <div className="speaker-card">
          {img && (
            <img src={img} alt={name} className="speaker-img" />
          )}
          <div className="speaker-content">
            <h1>{title}</h1>
            <p>{intro}</p>
            <div className="session-details">
              <h2>Session Details</h2>
              <p><strong>Title:</strong> {sessionTitle}</p>
              <p><strong>Abstract:</strong> {sessionAbstract}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Speaker;
