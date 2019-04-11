using Microsoft.AspNetCore.Mvc;
using cosmosweb.Helpers;
using cosmosweb.Models;
using cosmosweb.Services;
using Microsoft.AspNetCore.Authorization;

namespace cosmosweb.Controllers
{
    [AllowAnonymous]
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
