using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using cosmosweb.Models;
using cosmosweb.Services;


namespace cosmosweb.Controllers
{
    public class EpisodesController : Controller
    {
        private readonly IEpisodeDatabase _episodeDatabase;

        public EpisodesController(IEpisodeDatabase episodeDatabase)
        {
            _episodeDatabase = episodeDatabase;
        }

        [ActionName("Index")]
        public async Task<IActionResult> Index()
        {
            string streamDate = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

            return View(await _episodeDatabase.QueryEpisodesAsync($"SELECT * FROM c WHERE c.streamDate >= '{streamDate}' ORDER BY c.streamDate"));
        }

        public async Task<IActionResult> Details(string? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Episode episode = await _episodeDatabase.GetEpisodeAsync(id);

            if (episode == null)
            {
                return NotFound();
            }

            return View(episode);
        }

        [ActionName("Create")]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost, ActionName("Create")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateAsync([Bind("Title,StreamDate,Description,YouTubeVideoId")] Episode episode)
        {
            if (ModelState.IsValid)
            {
                episode.EmbedUri = $"https://www.youtube.com/embed/{episode.YouTubeVideoId}";
                episode.WatchUri = $"https://youtu.be/{episode.YouTubeVideoId}";

                await _episodeDatabase.CreateEpisodeAsync(episode);

                return RedirectToAction(nameof(Index));
            }
            return View(episode);
        }

        [ActionName("Edit")]
        public async Task<IActionResult> EditAsync(string? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Episode episode = await _episodeDatabase.GetEpisodeAsync(id);

            if (episode == null)
            {
                return NotFound();
            }
            return View(episode);
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost, ActionName("Edit")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("Id,Title,StreamDate,Description,YouTubeVideoId")] Episode episode)
        {
            if (id != episode.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                episode.EmbedUri = $"https://www.youtube.com/embed/{episode.YouTubeVideoId}";
                episode.WatchUri = $"https://youtu.be/{episode.YouTubeVideoId}";

                await _episodeDatabase.UpdateEpisodeAsync(episode);
                
                return RedirectToAction(nameof(Index));
            }
            return View(episode);
        }


        [ActionName("Delete")]
        public async Task<IActionResult> Delete(string? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            Episode episode = await _episodeDatabase.GetEpisodeAsync(id);
            if (episode == null)
            {
                return NotFound();
            }

            return View(episode);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            await _episodeDatabase.DeleteEpisodeAsync(id);

            return RedirectToAction(nameof(Index));
        }
    }
}
