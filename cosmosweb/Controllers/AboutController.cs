using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace cosmosweb.Controllers
{
    public class AboutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Community()
        {
            return View("Community");
        }

        public IActionResult Customers()
        {
            return View("Customers");
        }

        [Route ("about/github")]
        public IActionResult GitHub()
        {
            return View("GitHub");
        }
    }
}