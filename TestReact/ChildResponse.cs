using TestReact.Models;

namespace TestReact
{
    public class ChildResponse
    {
        public List<Child> Childs { get; set; } = new List<Child>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}
