using System.ComponentModel.DataAnnotations;

namespace ContactApi
{
    public class Phone
    {
        public int Id { get; set; }

        [StringLength(20)]
        public string phone { get; set; } = string.Empty;

        public int ContactId { get; set; }

        //public Contact Contact { get; set; }
    }
}
