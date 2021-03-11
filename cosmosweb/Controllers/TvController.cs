using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using cosmosweb.Models;
using cosmosweb.Services;
using System;
using System.Threading.Tasks;

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
        public IActionResult Index()
        {
            return View("Index");
        }

        [Route("tv2")]
        public async Task<IActionResult> Tv2()
        {
            string streamDate = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

            return View(await _episodeDatabase.QueryEpisodesAsync($"SELECT Top 1 * FROM c WHERE c.streamDate >= '{streamDate}' ORDER BY c.streamDate"));
        }

        [Route("tv2/UpcomingEpisodes")]
        public async Task<PartialViewResult> UpcomingEpisodes()
        {
            string streamDate = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

            return PartialView(await _episodeDatabase.QueryEpisodesAsync($"SELECT * FROM c WHERE c.streamDate >= '{streamDate}' ORDER BY c.streamDate OFFSET 1 LIMIT 10"));
        }

        public async Task<PartialViewResult> PastEpisodes()
        {
            string streamDate = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

            return PartialView(await _episodeDatabase.QueryEpisodesAsync($"SELECT Top 10 * FROM c WHERE c.streamDate >= '{streamDate}' ORDER BY c.streamDate DESC"));
        }
    }
}
