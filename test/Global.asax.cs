using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace test
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);


            // pour pouvoir accéder à la propriété Application["MaindDB"]
            string DB_Path = Server.MapPath(@"~\App_Data\MainDB.mdf");
            Application["MainDB"] = @"Data Source=(LocalDB)\v11.0;AttachDbFilename='" 
                + DB_Path + "';Integrated Security=True";
        }
    }
}
