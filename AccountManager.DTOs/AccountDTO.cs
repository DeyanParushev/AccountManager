namespace AccountManager.DTOs
{
    using System;
    using System.Collections.Generic;

    public class AccountDTO
    {
        public AccountDTO()
        {
            Id = Guid.NewGuid().ToString();
            Transfers = new HashSet<TransferDTO>();
        }

        public string Id { get; set; }

        public virtual ICollection<TransferDTO> Transfers { get; set; }
    }
}
