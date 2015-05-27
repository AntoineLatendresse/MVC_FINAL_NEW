using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MVC_TP_FINAL.Models
{
    public class UsersLogin
    {

        [Required]
        [StringLength(20,MinimumLength=2)]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }



    }
}