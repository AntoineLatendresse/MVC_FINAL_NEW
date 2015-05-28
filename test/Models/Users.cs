using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Linq;
using System.Web;

namespace test.Models
{


    public class Users : test.Class.SqlExpressWrapper
    {
        


        public int ID { get; set; }

        [Display(Name="Adresse email")]
        [Required(ErrorMessage = "L'adresse email est nécessaire à la création d'un compte.")]
        [EmailAddress(ErrorMessage = "L'adresse email entrée n'est pas une adresse valide.")]
        public string Email { get; set; }

        [Display(Name="Nom d'utilisateur")]
        [Required(ErrorMessage = "Vous devez avoir un nom d'utilisateur.")]
        [StringLength(20, MinimumLength = 2,ErrorMessage="Le nom d'utilisisateur doit avoir un minimum de deux charatères")]
        public string UserName { get; set; }


        [Display(Name = "Mot de passe")]
        [Required(ErrorMessage = "Vous devez avoir un mot de passe")]
        [StringLength(30, MinimumLength = 8,ErrorMessage = "Votre mot de passe doit avoir au moins 8 charactères")]
        [DataType(DataType.Password)]
        public string Password { get; set; }


        [Display(Name = "Prenom")]
        [Required(ErrorMessage = "Le prenom est obligatoire")]
        [StringLength(20)]
        public string Prenom { get; set; }

        [Display(Name = "Nom de famille")]
        [StringLength(20)]
        public string Nom { get; set; }

        [Display(Name = "Sexe")]
        public int Sexe { get; set; }


        [Display(Name = "Avatar")]
        public string Picture { get; set; }


        public Users(Object connexionString)
            : base(connexionString)
        {
            SQLTableName = Class.VariablesGlobales.TABLE_USERS;
        }

        public Users()
            : base(Class.VariablesGlobales.CONNECTION_STRING)
        {
            SQLTableName = Class.VariablesGlobales.TABLE_USERS;
        }
        public override void GetValues()
        {
            ID = int.Parse(this["ID"]);
            Email = this["Email"];
            UserName = this["UserName"];
            Password = this["Password"];
            Prenom = this["Prenom"];
            Nom = this["Nom"];
            Sexe = int.Parse(this["Sexe"]);
            Picture = GetAvatarURL();
        }

        public String GetAvatarURL()
        {
            String url;
            if (String.IsNullOrEmpty(Picture))
            {
                url = @"Images/anonymous.jpg";
            }
            else
            {
                url = @"Images/" + Picture + ".jpg";
            }

            return url;
        }

        public override void Insert()
        {
            InsertRecord(Email, UserName, Password, Prenom, Nom, Sexe, Picture);
        }
        public override void Update()
        {
            UpdateRecord(ID, Email, UserName, Password, Prenom, Nom, Sexe, Picture);
        }

        public bool Exist(String userName)
        {
            bool exist = false;

            SelectByFieldName("USERNAME", userName);

            if (reader.HasRows)
            {
                Next();
                exist = true;
                EndQuerySQL();
            }
            return exist;
        }

        public bool ValiderConnexionUser()
        {
            bool valide = false;
            string SQL = "SELECT * FROM " + SQLTableName + " WHERE UserName  ='" + this.UserName + "'"
                + " " + "AND Password ='" + this.Password + "'";
            QuerySQL(SQL);
            if (reader.HasRows)
            {
                valide = true;
            }
            EndQuerySQL();
            return valide;
        }

    }
}