namespace AccountManager.Models
{
    using System;
    using System.Collections.Generic;

    using Microsoft.AspNetCore.Identity;

    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            base.Id = Guid.NewGuid().ToString();
            Accounts = new HashSet<Account>();
        }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
