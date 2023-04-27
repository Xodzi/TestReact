using TestReact.Models;

namespace TestReact.Repository
{
    public interface IChildrenRepository
    {
        Task<IEnumerable<Child>> GetChildren();
    }
}
