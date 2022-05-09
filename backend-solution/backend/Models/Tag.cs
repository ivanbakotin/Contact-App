using System.ComponentModel.DataAnnotations;

namespace ContactApi
{
    public class Tag
    {
        public int Id { get; set; }

        [StringLength(20)]
        public string tag { get; set; } = string.Empty;

        public int ContactId { get; set; }

        //public Contact Contact { get; set; }
    }
}
