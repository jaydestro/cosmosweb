using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;

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
    }
}
