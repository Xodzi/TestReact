using Microsoft.AspNetCore.Mvc;
using TestReact.Models;

namespace TestReact.Repository
{
    public interface IChildrenRepository
    {
        Task<IEnumerable<Child>> GetChildren();
        Task<IActionResult> PutChild(int id, Child child);
        Task<ActionResult<Child>> PostChild(Child child);
        Task<IActionResult> DeleteChild(int id);
    }
}
