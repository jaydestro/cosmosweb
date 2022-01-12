using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace cosmosweb.Controllers
{
    [AllowAnonymous]
    public class LearnController : Controller
    {
        public IActionResult Index()
        {
            return View("sql");
        }

        [Route("learn/sql")]
        public IActionResult Sql()
        {
            return View("sql");
        }

        [Route("labs")]
        [Route("learn/labs")]
        public IActionResult Labs()
        {
            return View("labs");
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
