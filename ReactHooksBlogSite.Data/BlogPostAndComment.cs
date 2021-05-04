using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace ReactHooksBlogSite.Data
{
    public class BlogPost
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string PostedBy { get; set; }
        public DateTime Date { get; set; }
        public List<Comment> Comments { get; set; }
    }
    public class Comment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public int BlogPostId { get; set; }
        [JsonIgnore]
        public BlogPost BlogPost { get; set; }

    }
}
