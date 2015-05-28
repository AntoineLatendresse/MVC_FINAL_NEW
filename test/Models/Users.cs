using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;
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

        [Display(Name = "Rang")]
        public int Rank { get; set; }


        public Users(Object connexionString)
            : base(connexionString)
        {
            SQLTableName = Class.VariablesGlobales.TABLE_USERS;
        }

        public Users()
            : base(Class.VariablesGlobales.CONNECTION_STRING_MAINDB)
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
            Rank = int.Parse(this["Rank"]);
            
        }


        public override void Insert()
        {
           InsertRecord(Email, UserName, Password, Prenom, Nom, Rank);
        }
        public override void Update()
        {
            UpdateRecord(ID, Email, UserName, Password, Prenom, Nom, Rank);
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


        public string GetRank()
        {
           string rank = "";
           string SQL_Select = "SELECT GuildRank.Rank FROM " + SQLTableName
              + " " + "INNER JOIN GuildRank ON GuildRank.ID = " + SQLTableName + ".Rank"
              + " " + " WHERE " + SQLTableName + ".UserName  ='" + this.UserName + "'";

           // instancier l'objet de collection
           SqlConnection connection = new SqlConnection(connexionString);
           // bâtir l'objet de requête
           SqlCommand sqlcmd = new SqlCommand(SQL_Select);
           // affecter l'objet de connection à l'objet de requête
           sqlcmd.Connection = connection;
           // ouvrir la connection avec la bd
           connection.Open();
           // éxécuter la requête SQL et récupérer les enregistrements qui en découlent dans l'objet Reader
           SqlDataReader dataReader = sqlcmd.ExecuteReader();

           while (dataReader.Read())
           {
              rank = dataReader.GetString(0);
           }
           return rank;
        }

    }
}