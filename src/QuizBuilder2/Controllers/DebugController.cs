using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using QuizBuilder2.Data;
using QuizBuilder2.Models;
using QuizBuilder2.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuizBuilder2.Controllers
{
    [Authorize(Roles = "QuizAdminRole")]
    [Route("api/[controller]/[action]")]
    public class DebugController : Controller
    {
        private readonly IHostingEnvironment _env;

        public DebugController(IHostingEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        public JsonResult Environment()
        {
            return new JsonResult(new {
                Application_Name = _env.ApplicationName,
                Environment_Name = _env.EnvironmentName,
                Content_Root_Path = _env.ContentRootPath
            });
        }

        
    }
}
