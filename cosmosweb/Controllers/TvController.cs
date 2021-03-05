using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace cosmosweb.Controllers
{
    [AllowAnonymous]
    public class TvController : Controller
    {
        [Route("tv")]
        public IActionResult Index()
        {
            return View("Index");
        }
    }
}
