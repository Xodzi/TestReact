using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestReact.Models;
using System.Web;

namespace TestReact.Repository
{
    public class ChildrenRepository : IChildrenRepository
    {
        private readonly ClinicContext _context;

        public ChildrenRepository(ClinicContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> DeleteChild(int id)
        {
            var child = await _context.Children.FindAsync(id);
            if (child == null)
            {
                return new NotFoundResult();
            }

            _context.Children.Remove(child);
            await _context.SaveChangesAsync();

            return new NoContentResult();
        }

        public async Task<IEnumerable<Child>> GetChildren()
        {
            return await _context.Children
               .ToListAsync();
        }

        public async Task<ActionResult<Child>> PostChild(Child child)
        {
            _context.Children.Add(child);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ChildExists(child.ChildId))
                {
                    return new ConflictObjectResult(child);
                }
                else
                {
                    throw;
                }
            }

            return new CreatedAtActionResult("GetChild","Children", new { id = child.ChildId }, child);
        }

        public async Task<IActionResult> PutChild(int id, Child child)
        {

            _context.Entry(child).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChildExists(id))
                {
                    return new NotFoundResult();
                }
                else
                {
                    throw;
                }
            }

            return new NoContentResult();

            }
        private bool ChildExists(int id)
        {
            return _context.Children.Any(e => e.ChildId == id);
        }
    }
}
