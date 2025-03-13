import React from 'react';
import Layout from '@theme/Layout';
import ListRowCard from '@site/src/components/ListRowCard';

const ItemList = [
    {
      title: 'Azure Cosmos DB Conf 2025 Keynote',
      img: require('@site/static/img/speakers/Kirill_Gavrylyuk.jpg'),
      link: "Kirill",
      description: (
        <>
          Hear the latest and greatest from the **Azure Cosmos DB team**, including **new features, customer success stories, and a glimpse into the future**.
        </>
      ),
    },
    {
      title: 'How Microsoft Powers Planet-Scale AI Apps with DiskANN',
      img: require('@site/static/img/speakers/James_Codella.jpg'),
      link: "James",
      description: (
        <>
        A deep dive into **DiskANN**, the vector search system powering **Bing, M365, and Windows Copilot**. Learn how it enables **high-performance, scalable AI applications** with **Azure Cosmos DB**.
        </>
      ),
    },
    {
      title: 'OmniRAG - The Right Way to Do Retrieval-Augmented Generation with Azure Cosmos DB',
      img: require('@site/static/img/speakers/Aleksey_Savateyev.jpg'),
      link: "Aleksey",
      description: (
        <>
        Learn about **OmniRAG**, an advanced **retrieval-augmented generation (RAG) model** that dynamically selects data sources based on user intent. See **CosmosAIGraph in action** with live demos.
        </>
      ),
    },
    {
      title: 'Enhancing Security in Azure Cosmos DB: Best Practices',
      img: require('@site/static/img/speakers/Sudhanshu_Khera.jpg'),
      link: "Sudhanshu",
      description: (
        <>
        Strengthen your **Azure Cosmos DB security** with **Network Security Perimeter (NSP) and Managed Identity**. Watch a **live demo on disabling local authentication and migrating to Entra ID**.
        </>
      ),
    },
    {
      title: 'Building an Enterprise Knowledge Management System using Hybrid Search in Azure Cosmos DB',
      img: require('@site/static/img/speakers/Kevin_Gatimu.jpg'),
      link: "Kevin",
      description: (
        <>
        Learn how **hybrid search with vector search + BM25 scoring** improves **Enterprise Knowledge Management**. See how **Nest.js + Azure Cosmos DB enable powerful semantic search**.
        </>
      ),
    },
    {
      title: 'Reducing Database Costs to $1 with Data Modeling, Azure Web PubSub, and the Cosmos Serverless Plan',
      img: require('@site/static/img/speakers/Simon_Kofod.jpg'),
      link: "Simon",
      description: (
        <>
        Discover how a **team reduced database costs from $280/month to $1/month** while **boosting performance** using **Azure Cosmos DB’s serverless model**.
        </>
      ),
    },
    {
      title: 'Real-World Examples of Real-Time Applications Using Change Feed',
      img: require('@site/static/img/speakers/Justine_Cocchi.jpg'),
      link: "Justine",
      description: (
        <>
        See how **Azure Cosmos DB’s change feed** enables **real-time applications** in gaming, retail, and e-commerce. Learn how to **implement these patterns in your workloads**.
        </>
      ),
    },
    {
      title: 'Turning Data Into Generative Chaos',
      img: require('@site/static/img/speakers/Olena_Borzenko.jpg'),
      link: "Olena",
      description: (
        <>
        What if a database could **inspire creativity?** See how **Azure Cosmos DB, OpenAI, and Semantic Kernel** generate **AI-driven art and algorithmic visuals**.
        </>
      ),
    },
    {
      title: 'Unlocking the Power of Vector Search in DocumentDB',
      img: require('@site/static/img/speakers/Patty_Chow.jpg'),
      link: "Patty",
      description: (
        <>
        Vector search is now available in **DocumentDB, Azure Cosmos DB’s MongoDB-compatible vCore offering**. See how it **enhances AI-powered search and analytics**.
        </>
      ),
    },
    {
      title: 'Building a Centralized Product Data Hub with Azure Cosmos DB at QVC',
      img: require('@site/static/img/speakers/Senthil_Chandrasuriyan.jpg'),
      link: "Senthil",
      description: (
        <>
        Learn how **QVC centralizes product, pricing, and inventory data** using **Azure Cosmos DB’s global distribution, multi-region writes, and change feed**.
        </>
      ),
    },
    {
      title: 'Azure Cosmos DB as the Backbone for AI-Enabled Enterprise Applications',
      img: require('@site/static/img/speakers/Vin_Kamat.jpg'),
      link: "Vin",
      description: (
        <>
        **Vin Kamat & Mani Jaman (H&R Block)** share how **Azure Cosmos DB powers AI-driven applications**, including a **chat analytics agent that processes customer conversations for insights**.
        </>
      ),
    },
    {
      title: 'Accelerating Real-Time Analytics with Cosmos DB and GPU-Enhanced Serverless Apache Spark',
      img: require('@site/static/img/speakers/Brian_Benz.jpg'),
      link: "Brian",
      description: (
        <>
        **Brian Benz & Gary Chai (Microsoft)** showcase how **Apache Spark with GPU acceleration** boosts **real-time analytics on streaming data** stored in **Azure Cosmos DB**.
        </>
      ),
    }
];

export default function Sprints() {
  return (
    <Layout
      title="#AzureCosmosDBConf 2025"
      description="Learn Azure Cosmos DB, one topic at a time!">
      <main>
        <div className="container">
          <br />
          <ListRowCard itemList={ItemList} />
        </div>
      </main>
    </Layout>
  );
}
