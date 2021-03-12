using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Configuration;
using cosmosweb.Services;
using System.Threading.Tasks;
using cosmosweb.Models;
using System.Collections.Generic;
using System;
using System.Configuration;

namespace cosmosweb.Services
{
    public class EpisodeDatabase: IEpisodeDatabase
    {
        private readonly IConfiguration _config;
        private readonly string databaseId = "cosmosweb";
        private readonly string containerId = "episodes";
        
        private readonly string connectionString;
        private readonly CosmosClient client;
        private readonly Container _container;
        private readonly string _pkValue = "LiveTv";
        private readonly PartitionKey _pk;

        public EpisodeDatabase(IConfiguration config)
        {
            _config = config;

            _pk = new PartitionKey(_pkValue);

            connectionString = _config["EpisodesDB"];

            client = new CosmosClient(connectionString);

            _container = client.GetContainer(databaseId, containerId);
        }

        public async Task<Episode> CreateEpisodeAsync(Episode episode)
        {
            if (episode.Id == null)
                episode.Id = Guid.NewGuid().ToString();

            episode.Show = _pkValue;

            DateTime utcStreamDate = DateTime.Parse(episode.StreamDate);

            episode.StreamDate = TimeZoneInfo.ConvertTimeToUtc(utcStreamDate, TimeZoneInfo.Local).ToString("yyyy-MM-ddTHH:mm:ssZ");

            ItemResponse<Episode> response = await _container.CreateItemAsync<Episode>(episode, _pk);
            return response.Resource;
        }

        public async Task DeleteEpisodeAsync(string id)
        {
            await _container.DeleteItemAsync<Episode>(id, _pk);
        }

        public async Task<Episode> GetEpisodeAsync(string id)
        {
            try
            {
                ItemResponse<Episode> response = await _container.ReadItemAsync<Episode>(id, _pk);
                return response.Resource;
            }
            catch(CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }
        }

        public async Task<IEnumerable<Episode>> QueryEpisodesAsync(string query)
        {
            FeedIterator<Episode> resultSet = _container.GetItemQueryIterator<Episode>(
                query,
                requestOptions: new QueryRequestOptions() { PartitionKey = _pk });

            List<Episode> episodes = new List<Episode>();
            while (resultSet.HasMoreResults)
            {
                FeedResponse<Episode> response = await resultSet.ReadNextAsync();

                foreach (Episode episode in response)
                {
                    episodes.Add(episode);
                }
            }
            return episodes;
        }

        public async Task UpdateEpisodeAsync(Episode episode)
        {
            episode.Show = _pkValue;

            await _container.ReplaceItemAsync<Episode>(episode, episode.Id, _pk);
        }
    }
}
