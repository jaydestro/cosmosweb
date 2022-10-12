using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace cosmosweb.Controllers
{
    [AllowAnonymous]
    public class LearnController : Controller
    {
        public IActionResult Index()
        {
            return View("nosql");
        }

        [Route("learn/sql")]
        public IActionResult Sql()
        {
            return View("sql");
        }

        [Route("learn/nosql")]
        public IActionResult NoSql()
        {
            return View("nosql");
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
