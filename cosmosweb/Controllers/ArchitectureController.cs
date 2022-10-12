using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace cosmosweb.Controllers
{
    [AllowAnonymous]
    public class ArchitectureController : Controller
    {
        
        [Route("architecture")]
        [Route("learn/sql/architecture")]
        [Route("learn/nosql/architecture")]
        public IActionResult Index()
        {
            return View("Index");
        }

        //public IActionResult Architecture()
        //{
        //    return View();
        //}

        [Route("architecture/web")]
        [Route("learn/sql/architecture/web")]
        [Route("learn/nosql/architecture/web")]
        public IActionResult Web()
        {
            return View("Web");
        }

        [Route("architecture/iot")]
        [Route("learn/sql/architecture/iot")]
        [Route("learn/nosql/architecture/iot")]
        public IActionResult IoT()
        {
            return View("IoT");
        }

        [Route("architecture/serverless")]
        [Route("learn/sql/architecture/serverless")]
        [Route("learn/nosql/architecture/serverless")]
        public IActionResult Serverless()
        {
            return View("Serverless");
        }

        [Route("architecture/personalization")]
        [Route("learn/sql/architecture/personalization")]
        [Route("learn/nosql/architecture/personalization")]
        public IActionResult Personalization()
        {
            return View("Personalization");
        }

        [Route("architecture/retail")]
        [Route("learn/sql/architecture/retail")]
        [Route("learn/nosql/architecture/retail")]
        public IActionResult Retail()
        {
            return View("Retail");
        }

        [Route("architecture/gaming")]
        [Route("learn/sql/architecture/gaming")]
        [Route("learn/nosql/architecture/gaming")]
        public IActionResult Gaming()
        {
            return View("Gaming");
        }

        [Route("architecture/transportation")]
        [Route("learn/sql/architecture/transportation")]
        [Route("learn/nosql/architecture/transportation")]
        public IActionResult Transportation()
        {
            return View("Transportation");
        }

        [Route("architecture/financial")]
        [Route("learn/sql/architecture/financial")]
        [Route("learn/nosql/architecture/financial")]
        public IActionResult Financial()
        {
            return View("Financial");
        }

    }
}