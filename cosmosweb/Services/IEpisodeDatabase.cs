using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cosmosweb.Models;

namespace cosmosweb.Services
{
    public interface IEpisodeDatabase
    {
        Task<IEnumerable<Episode>> QueryEpisodesAsync(string query);
        Task<Episode> GetEpisodeAsync(string id);
        Task<Episode> CreateEpisodeAsync(Episode episode);
        Task UpdateEpisodeAsync(Episode episode);
        Task DeleteEpisodeAsync(string id);
    }
}
