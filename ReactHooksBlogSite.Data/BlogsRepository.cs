using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactHooksBlogSite.Data
{
    public class BlogsRepository
    {
        private readonly string _connectionString;
        public BlogsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<BlogPost> GetBlogPosts(int page)
        {
            var ctx = new BlogPostDbContext(_connectionString);
            return ctx.BlogPosts.Include(bp => bp.Comments).OrderByDescending(bp => bp.Date).Skip((page - 1) * 3).Take(3).ToList();
        }
        public BlogPost GetBlogPostForId (int id)
        {
            var ctx = new BlogPostDbContext(_connectionString);
            return ctx.BlogPosts.Include(bp => bp.Comments).FirstOrDefault(bp => bp.Id == id);
        }
        public void AddBlogPost (BlogPost blogPost)
        {
            var ctx = new BlogPostDbContext(_connectionString);
            ctx.BlogPosts.Add(blogPost);
            ctx.SaveChanges();
        }
        public void AddComment(Comment comment)
        {
            var ctx = new BlogPostDbContext(_connectionString);
            ctx.Comments.Add(comment);
            ctx.SaveChanges();
        }
        public int MostRecentBlogId()
        {
            var ctx = new BlogPostDbContext(_connectionString);
            BlogPost bp = ctx.BlogPosts.OrderByDescending(bp => bp.Id).First(bp => bp.Id != 0);
            return bp.Id;
        }
        public int GetHighestPage()
        {
            var ctx = new BlogPostDbContext(_connectionString);
            var total = ctx.BlogPosts.Count();
            if (total % 3 == 0)
            {
                return total / 3;
            }
            return (total / 3) + 1;
        }
    }
}
