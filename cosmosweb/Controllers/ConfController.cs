using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using cosmosweb.Services;
using System.Threading.Tasks;
using cosmosweb.Models;
using System.Collections.Generic;

namespace cosmosweb.Controllers
{
    [AllowAnonymous]
    public class ConfController : Controller
    {

        Sessionize sessionize = new Sessionize();

        ConferenceSchedule ConferenceSchedule;

        private async Task LoadSessions()
        {
            ConferenceSchedule = await sessionize.GetSessions();
        }

        [Route("conf")]
        public async Task<IActionResult> Index()
        {
            return View("Index");
        }

        [Route("conf/agenda")]
        public async Task<IActionResult> Agenda()
        {
            if (ConferenceSchedule == null)
                await LoadSessions();

            return View("Agenda", ConferenceSchedule);
        }

        [Route("conf/speakers")]
        public async Task<IActionResult> Speakers()
        {
            return View("Speakers");
        }

        [Route("conf/countdown")]
        public async Task<IActionResult> Countdown()
        {
            return View("CountDown");
        }
        [Route("conf/agenda2")]
        public async Task<IActionResult> Agenda2()
        {
            if (ConferenceSchedule == null)
                await LoadSessions();

            return View("Agenda2", ConferenceSchedule);
        }
    }
}
