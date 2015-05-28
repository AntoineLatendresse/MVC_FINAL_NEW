using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using test.Models;



namespace test.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Gallery()
        {
            Gallery gal = new Gallery();
            gal.SelectAll();
            return View(gal);
        }

        public ActionResult Deconnexion()
        {
           Session["UserValid"] = false;
           return RedirectToAction("Login", "Home");
        }


        public ActionResult Inscription()
        {
            return View(new UsersInscription());
        }

        [HttpPost]
        public ActionResult Inscription(UsersInscription newMember)
        {
            Session["insertionValide"] = false;
            
            if(ModelState.IsValid)
            {
               Users user = new Users();
               user.UserName = newMember.UserName;
               user.Password = newMember.Password;
               user.Email = newMember.Email;
               user.Prenom = newMember.Prenom;
               user.Nom = newMember.Nom;
               user.Rank = 5;
               user.Insert();
               Session["insertionValide"] = true;
            }
            if (Session["insertionValide"].Equals(true))
            {
                Session["insertionValide"] = null;
                return Redirect("/Home/Modify");
            }
            return View(newMember);
        }


        public ActionResult List()
        {
            Users users = new Users();
            users.SelectAll();
            return View(users);
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(UsersLogin loginUser)
        {
           Users users = new Users();
           if (loginUser.Valider())
           {
              users.SelectByFieldName("UserName", loginUser.UserName);

              Session["UserValid"] = true;
              Session["UserId"] = users.ID;
              Session["Nom"] = users.Nom;
              Session["Prenom"] = users.Prenom;
              Session["Rank"] = users.Rank;
              return RedirectToAction("Modify", "Home");
           }
           return View(loginUser);
        }

        [HttpGet]
        public ActionResult Modify()
        {
           if ((bool)Session["UserValid"])
           {
              Users users = new Users();
              users.SelectByID(Session["UserId"].ToString());
              users.Next();
              users.EndQuerySQL();
              return View(users);
           }
           return Redirect("/Home/Login");
        }

        [HttpPost]
        public ActionResult Modify(Users users)
        {
           if (ModelState.IsValid)
           {
              Users updatedUser = new Users();
              updatedUser.SelectByID(Session["UserId"].ToString());
              updatedUser.EndQuerySQL();

              updatedUser.UserName = users.UserName;
              updatedUser.Nom = users.Nom;
              updatedUser.Prenom = users.Prenom;
              updatedUser.Password = users.Password;
              updatedUser.Email = users.Email;

              updatedUser.Update();
              Session["Name"] = updatedUser.Nom;
              return RedirectToAction("Index", "Home");
           }
           return View(users);
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