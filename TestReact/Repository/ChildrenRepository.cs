using Microsoft.EntityFrameworkCore;
using TestReact.Models;

namespace TestReact.Repository
{
    public class ChildrenRepository : IChildrenRepository
    {
        private readonly ClinicContext _context;

        public ChildrenRepository(ClinicContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Child>> GetChildren()
        {
            return await _context.Children
               .ToListAsync();
        }
    }
}
