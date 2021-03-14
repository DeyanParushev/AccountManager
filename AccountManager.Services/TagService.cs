namespace AccountManager.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    
    using AutoMapper;

    using AccountManager.Data;
    using AccountManager.Models;
    using AccountManager.Services.Interfaces;

    public class TagService : ITagService
    {
        private readonly AccountManagerContext context;
        private readonly IMapper mapper;

        public TagService(AccountManagerContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<ICollection<T>> GetAll<T>(string userId)
        {
            UserExistCheck(userId);

            var tags = context.Tags.Select(x => x).ToList();
            var outputTags = mapper.Map<ICollection<T>>(tags);

            return outputTags;
        }

        public async Task<T> GetOne<T>(int tagId)
        {
            TagExistCheck(tagId);

            var tag = context.Tags.SingleOrDefault(x => x.Id == tagId);
            var outputTag = mapper.Map<T>(tag);

            return outputTag;
        }

        public async Task Create(Tag tag, string userId)
        {
            UserExistCheck(userId);

            var tagExists = context.Tags
                .Any(x => x.Id == tag.Id || x.Name.ToLower() == tag.Name.ToLower());

            if (tagExists)
            {
                throw new ApplicationException("Tag already exists");
            }

            tag.Name = tag.Name.ToLower();
            context.Tags.Add(tag);
            await context.SaveChangesAsync();
        }

        public async Task<T> Edit<T>(Tag inputTag, string userId)
        {
            UserExistCheck(userId);
            TagExistCheck(inputTag.Id);

            var tag = context.Tags.SingleOrDefault(x => x.Id == inputTag.Id);
            tag.Name = inputTag.Name.ToLower();

            await context.SaveChangesAsync();

            var outputTag = mapper.Map<T>(tag);
            return outputTag;
        }

        public async Task Delete(int tagId, string userId)
        {
            UserExistCheck(userId);
            TagExistCheck(tagId);

            var tag = context.Tags.SingleOrDefault(x => x.Id == tagId);
            context.Remove(tag);

            await context.SaveChangesAsync();
        }

        private void UserExistCheck(string userId)
        {
            if (!context.Users.Any(x => x.Id == userId))
            {
                throw new ArgumentNullException("User does not exist.");
            }
        }

        private void TagExistCheck(int tagId)
        {
            if (!context.Tags.Any(x => x.Id == tagId))
            {
                throw new ArgumentNullException("Tag does not exist.");
            }
        }
    }
}
