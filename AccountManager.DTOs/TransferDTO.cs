namespace AccountManager.DTOs
{
    using System;
    using System.Collections.Generic;

    public class TransferDTO
    {
        public TransferDTO()
        {
            Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        public decimal Amount { get; set; }

        public virtual CategoryDTO Category { get; set; }

        public virtual ICollection<TagDTO> Tags { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }
    }
}