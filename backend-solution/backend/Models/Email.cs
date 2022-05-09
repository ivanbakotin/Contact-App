using System.ComponentModel.DataAnnotations;

namespace ContactApi
{
    public class Email
    {
        public int Id { get; set; }

        [StringLength(20)]
        public string email { get; set; } = string.Empty;

        public int ContactId { get; set; }

        //public Contact Contact { get; set; }
    }
}
