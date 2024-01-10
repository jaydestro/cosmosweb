using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using cosmosweb.Services;
using System.Threading.Tasks;
using cosmosweb.Models;
using System.Collections.Generic;
using System;

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

        [Route("conf/livestream")]
        public async Task<IActionResult> LiveStream()
        {
            if (ConferenceSchedule == null)
                await LoadSessions();

            return View("LiveStream", ConferenceSchedule.LiveSessions);
        }

        [Route("conf/ondemand")]
        public async Task<IActionResult> OnDemand()
        {
            if (ConferenceSchedule == null)
                await LoadSessions();

            return View("OnDemand", ConferenceSchedule.OnDemandSessions);
        }

        [Route("conf/speakers")]
        public async Task<IActionResult> Speakers()
        {
            return View("Speakers");
        }
    }
}
