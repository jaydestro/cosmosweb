using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using cosmosweb.Models;
using cosmosweb.Services;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace cosmosweb.Controllers
{
    [AllowAnonymous]
    public class TvController : Controller
    {
        private readonly IEpisodeDatabase _episodeDatabase;

        public TvController(IEpisodeDatabase episodeDatabase)
        {
            _episodeDatabase = episodeDatabase;
        }

        [Route("tv")]
        public async Task<IActionResult> Index()
        {
            //return View("Index");
            string todaysDate = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

            Tv tv = new Tv();

            IEnumerable<Episode> nextEpisode = await _episodeDatabase.QueryEpisodesAsync($"SELECT Top 1 * FROM c WHERE c.streamDate >= '{todaysDate}' ORDER BY c.streamDate");

            foreach (Episode episode in nextEpisode)
            {
                tv.NextEpisode = episode;
            }

            IEnumerable<Episode> upcomingEpisodes = await _episodeDatabase.QueryEpisodesAsync($"SELECT * FROM c WHERE c.streamDate >= '{todaysDate}' ORDER BY c.streamDate OFFSET 1 LIMIT 10");

            tv.UpcomingEpisodes = upcomingEpisodes;

            IEnumerable<Episode> pastEpisodes = await _episodeDatabase.QueryEpisodesAsync($"SELECT Top 10 * FROM c WHERE c.streamDate <= '{todaysDate}' ORDER BY c.streamDate DESC");

            tv.PastEpisodes = pastEpisodes;

            return View(tv);
        }

        [Route("tv3")]
        public async Task<IActionResult> Tv3()
        {
            string streamDate = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

            Tv tv = new Tv();

            IEnumerable<Episode> nextEpisode = await _episodeDatabase.QueryEpisodesAsync($"SELECT Top 1 * FROM c WHERE c.streamDate >= '{streamDate}' ORDER BY c.streamDate");

            foreach(Episode episode in nextEpisode)
            {
                tv.NextEpisode = episode;
            }

            IEnumerable<Episode> upcomingEpisodes = await _episodeDatabase.QueryEpisodesAsync($"SELECT * FROM c WHERE c.streamDate >= '{streamDate}' ORDER BY c.streamDate OFFSET 1 LIMIT 10");

            tv.UpcomingEpisodes = upcomingEpisodes;

            IEnumerable<Episode> pastEpisodes = await _episodeDatabase.QueryEpisodesAsync($"SELECT Top 10 * FROM c WHERE c.streamDate >= '{streamDate}' ORDER BY c.streamDate DESC");

            tv.PastEpisodes = pastEpisodes;

            return View(tv);
        }
    }
}
