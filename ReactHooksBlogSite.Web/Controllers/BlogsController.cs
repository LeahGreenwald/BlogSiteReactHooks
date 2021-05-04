using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactHooksBlogSite.Data;
using Microsoft.Extensions.Configuration;

namespace ReactHooksBlogSite.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private string _connectionString;
        public BlogsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("getblogposts")]
        public List<BlogPost> GetBlogPosts(int page)
        {
            var repo = new BlogsRepository(_connectionString);
            return repo.GetBlogPosts(page);
        }
        [HttpGet]
        [Route("getblogpostforid")]
        public BlogPost GetBlogPostForId(int id)
        {
            var repo = new BlogsRepository(_connectionString);
            var bp = repo.GetBlogPostForId(id);
            return bp;
        }
        [HttpPost]
        [Route("newpost")]
        public void NewPost (BlogPost blogPost)
        {
            blogPost.Date = DateTime.Now;
            blogPost.PostedBy = "Poster";
            var repo = new BlogsRepository(_connectionString);
            repo.AddBlogPost(blogPost);
        }
        [HttpPost]
        [Route("newcomment")]
        public void NewComment(Comment comment)
        {
            comment.Date = DateTime.Now;
            var repo = new BlogsRepository(_connectionString);
            repo.AddComment(comment);
        }
        [HttpGet]
        [Route("getmostrecentblogid")]
        public int getMostRecentBlogId()
        {
            var repo = new BlogsRepository(_connectionString);
            var bp = repo.MostRecentBlogId();
            return bp;
        }
        [HttpGet]
        [Route("gethighestpage")]
        public int getHighestPage()
        {
            var repo = new BlogsRepository(_connectionString);
            return repo.GetHighestPage();
        }
    }
}
