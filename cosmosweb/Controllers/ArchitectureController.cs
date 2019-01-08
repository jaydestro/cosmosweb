using Microsoft.AspNetCore.Mvc;

namespace cosmosweb.Controllers
{
    public class ArchitectureController : Controller
    {
        [Route("architecture")]
        public IActionResult Index()
        {
            return View("Index");
        }

        //public IActionResult Architecture()
        //{
        //    return View();
        //}

        [Route("architecture/web")]
        public IActionResult Web()
        {
            return View("Web");
        }

        [Route("architecture/iot")]
        public IActionResult IoT()
        {
            return View("IoT");
        }

        [Route("architecture/serverless")]
        public IActionResult Serverless()
        {
            return View("Serverless");
        }

        [Route("architecture/personalization")]
        public IActionResult Personalization()
        {
            return View("Personalization");
        }

        [Route("architecture/retail")]
        public IActionResult Retail()
        {
            return View("Retail");
        }

        [Route("architecture/gaming")]
        public IActionResult Gaming()
        {
            return View("Gaming");
        }

        [Route("architecture/transportation")]
        public IActionResult Transportation()
        {
            return View("Transportation");
        }

        [Route("architecture/financial")]
        public IActionResult Financial()
        {
            return View("Financial");
        }

    }
}