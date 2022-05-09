using System.ComponentModel.DataAnnotations;

namespace ContactApi
{
    public class Contact
    {
        public int Id { get; set; }

        [StringLength(30)]
        public string first_name { get; set; } = string.Empty;

        [StringLength(30)]
        public string last_name { get; set; } = string.Empty;

        [StringLength(50)]
        public string? address { get; set; } = string.Empty;

        [StringLength(30)]
        public string? city { get; set; } = string.Empty;

        [StringLength(30)]
        public string? country { get; set; } = string.Empty;

        [StringLength(30)]
        public string? gender { get; set; } = string.Empty;

        public bool bookmark { get; set; } = false;

        //public ICollection<Phone>? Phones { get; set; }
        //public ICollection<Email> Emails { get; set; }
        //public ICollection<Tag> Tags { get; set; }

    }
}
