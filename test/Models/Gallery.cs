using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace test.Models
{
    public class Gallery : test.Class.SqlExpressWrapper
    {

        public int Id { get; set; }
        public string Picture { get; set; }

        public Gallery(Object connexionString)
            : base(connexionString)
        {
            SQLTableName = "Gallery";
        }

        public Gallery()
            : base("")
        {
        }

        public override void GetValues()
        {
            Id = int.Parse(this["ID"]);
            Picture = this["Picture"];
        }

        public String GetGalleryURL()
        {
            String url;
            if (String.IsNullOrEmpty(Picture))
            {
                url = @"ImagesGallery/anonymous.jpg";
            }
            else
            {
                url = @"Images/" + Picture + ".jpg";
            }

            return url;
        }

        public override void Insert()
        {
            InsertRecord(Id, Picture);
        }
        public override void Update()
        {
            UpdateRecord(Id, Picture);
        }
    }
}