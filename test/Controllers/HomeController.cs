using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


using MVC_TP_FINAL.Models;
// ?
//using test.Models;


namespace test.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Gallery()
        {
            return View();
        }

        public ActionResult Subscribe()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Subscribe(
            string userName,
            string prenom,
            string nom,
            string telephone,
            string dateNaissance,
            int sexe,
            int civil,
            string pathPicture)
        {
            Session["insertionValide"] = false;

            Users member = new Users((String)Session["MainDB"]);
            

            if (Session["insertionValide"].Equals(true))
            {
                return Redirect("/Home/Index");
            }
            return View();
        }

        public ActionResult List()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Modify()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}