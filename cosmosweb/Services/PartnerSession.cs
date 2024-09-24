using cosmosweb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cosmosweb.Services
{
    public class PartnerSession
    {
        public PartnerSessionSchedule GetPartnerSessions()
        {
            PartnerTechSession pt1 = new PartnerTechSession() { Date = new DateTime(2024, 06, 27), Title = "Azure Cosmos DB NoSQL and OpenAI: Building Robust Applications with RAG pattern - Completed", EmbedUri = "https://www.youtube.com/embed/E3okcKvpvHo?si=IE-YsGs7UDNFAKU6", WatchUri = "https://www.youtube.com/watch?v=E3okcKvpvHo", Description = "Explore innovative ways to build robust applications using Azure Cosmos DB. Dive into an exciting demo that showcases the use of the Retrieval-Augmented Generation (RAG) pattern for integrating Azure OpenAI services with custom data stored in Azure Cosmos DB NoSQL API.\r\nIn this session, we'll demonstrate how to leverage a vector database within a NoSQL database to store, index, and query embeddings alongside their corresponding original data. This integration offers a streamlined solution, eliminating the need for a separate pure vector database and reducing extra costs associated with data replication.\r\nBy keeping the vector embeddings and original data together, we not only enhance data consistency but also enable seamless multi-modal data operations. This approach ensures superior scale and performance, allowing your applications to harness the full potential of both structured and unstructured data." };
            PartnerTechSession pt2 = new PartnerTechSession() { Date = new DateTime(2024, 07, 25, 09, 00, 00, 00, DateTimeKind.Utc), Title = "Diving Deep into Azure Apache Cassandra Managed Instance: An In-depth Look at Features and Technical Demonstrations", EmbedUri = "https://www.youtube.com/embed/DkkOs8i3vuY?si=787cJEp2yJw9s8C7", WatchUri = "https://www.youtube.com/watch?v=DkkOs8i3vuY", Description = "We will cover the following:\n- Introduction of Apache managed instance Cassandra, what is the offering about, features etc (Dileep).\n- A quick demo on how it will fit in todays AI with vector indexing and search capabilities. Short demo (Dileep).\n- Cassandra migration opportunities (Tomas)" };
            PartnerTechSession pt3 = new PartnerTechSession() { Date = new DateTime(2024, 08, 29, 09, 00, 00, 00, DateTimeKind.Utc), Title = "Boosting Developer Productivity with Azure CosmosDB", EmbedUri = "https://www.youtube.com/embed/sSShPwOPA-M?si=jt8CHLEHZLtN0Nhr", WatchUri = "https://www.youtube.com/watch?v=sSShPwOPA-M", Description = "In this session, we'll explore how developers can boost productivity with Azure CosmosDB's developer productivity features. We'll cover using GitHub Copilot with the Cosmos SDK to build applications, Azure Cosmos DB copilot to assist in writing Cosmos DB queries, creating GraphQL endpoints with simple commands, and utilizing native vector search with the SDK." };
            PartnerTechSession pt4 = new PartnerTechSession() { Date = new DateTime(2024, 09, 26, 09, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Mongo DB Migration", EmbedUri = "none", WatchUri = "none", Description = "In this session we will explore the versatility of migrating data using both ADS-based and Databricks-based solutions, with the flexibility to choose between offline and online migration methods. Whether you're migrating from Native MongoDB, MongoDB Atlas, or AWS DocumentDB, we've got you covered. Plus, discover how seamlessly you can migrate to both vCore and RU MongoDB offerings  in Cosmos DB." };
            PartnerTechSession pt5 = new PartnerTechSession() { Date = new DateTime(2024, 10, 31, 09, 00, 00, 00, DateTimeKind.Utc), Title = "AI Agent with Azure Cosmos DB", EmbedUri = "none", WatchUri = "none", Description = "Demonstration and walkthrough of AI Agent solution focuses on Azure Cosmos DB" };
            PartnerTechSession pt6 = new PartnerTechSession() { Date = new DateTime(2024, 11, 28, 09, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Monitoring", EmbedUri = "none", WatchUri = "none", Description = "In this we will walk you through the monitoring metrics" };
            PartnerTechSession pt7 = new PartnerTechSession() { Date = new DateTime(2024, 12, 26, 09, 00, 00, 00, DateTimeKind.Utc), Title = "Cosmos DB - Cost Optimization", EmbedUri = "none", WatchUri = "none", Description = "In this we will walk you through the cost calculation and optimization strategies across all APIs and Mongo VCore" };
            List <PartnerTechSession> _sessions = new List<PartnerTechSession>();
            _sessions.Add(pt1);
            _sessions.Add(pt2);
            _sessions.Add(pt3);
            _sessions.Add(pt4);
            _sessions.Add(pt5);
            _sessions.Add(pt6);
            _sessions.Add(pt7);
            QnASession qna1 = new QnASession() { Date = new DateTime(2021, 11, 12, 10, 00, 00, 00, DateTimeKind.Utc) };
            QnASession qna2 = new QnASession() { Date = new DateTime(2021, 12, 10, 10, 00, 00, 00, DateTimeKind.Utc) };
            QnASession qna3 = new QnASession() { Date = new DateTime(2022, 01, 14, 10, 00, 00, 00, DateTimeKind.Utc) };
            QnASession qna4 = new QnASession() { Date = new DateTime(2022, 02, 11, 10, 00, 00, 00, DateTimeKind.Utc) };
            QnASession qna5 = new QnASession() { Date = new DateTime(2022, 03, 11, 10, 00, 00, 00, DateTimeKind.Utc) };
            QnASession qna6 = new QnASession() { Date = new DateTime(2022, 04, 8, 10, 00, 00, 00, DateTimeKind.Utc) };
            List<QnASession> _qnaSessions = new List<QnASession>();
            _qnaSessions.Add(qna1);
            _qnaSessions.Add(qna2);
            _qnaSessions.Add(qna3);
            _qnaSessions.Add(qna4);
            _qnaSessions.Add(qna5);
            _qnaSessions.Add(qna6);
            PartnerSessionSchedule schedule = new PartnerSessionSchedule
            {
                partnerSessions = _sessions,
                qnaSessions = _qnaSessions
            };
            return schedule;
        }
    }
}
