using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace cosmosweb.Controllers
{
    [AllowAnonymous]
    public class ConfController : Controller
    {
        [Route("conf")]
        public IActionResult Index()
        {
            return View("Index");
        }

        [Route("conf/agenda")]
        public IActionResult Agenda()
        {
            return View("Agenda");
        }

        [Route("conf/speakers")]
        public IActionResult Speakers()
        {
            return View("Speakers");
        }
    }
}
