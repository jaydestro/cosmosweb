using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace cosmosweb.Controllers
{
    [AllowAnonymous]
    public class LearnController : Controller
    {
         public IActionResult Index()
        {
            return View();
        }

        [Route ("compete")]
        [Route ("compare")]
        [Route ("learn/compare")]
        public IActionResult Compare()
        {
            return View("Compare");
        }

        [Route ("workshops")]
        [Route ("learn/workshops")]
        public IActionResult Workshops()
        {
            return View("Workshops");
        }

        [Route("presentations")]
        [Route("decks")]
        [Route("learn/presentations")]
        public IActionResult Presentations()
        {
            return View("Presentations");
        }
    }
}
