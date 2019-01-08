using Microsoft.AspNetCore.Mvc;
using cosmosweb.Helpers;
using cosmosweb.Models;
using cosmosweb.Services;

namespace cosmosweb.Controllers
{
    public class HomeController : Controller
    {
        [Route("")]
        //[Route("cosmos")]
        public IActionResult Index()
        {
            return View();
        }

        [SitemapExclude]
        [Route("error")]
        public IActionResult Error()
        {
            return View();
        }

        [SitemapExclude]
        [Route("sitemap.xml")]
        [Produces("text/xml")]
        public Sitemap SitemapGet([FromServices]SitemapService sitemapService)
        {
            return sitemapService.Sitemap;
        }
    }
}
