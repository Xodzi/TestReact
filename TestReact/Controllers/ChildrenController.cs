using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestReact.Models;

namespace TestReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChildrenController : ControllerBase
    {
        private readonly ClinicContext _context;

        public ChildrenController(ClinicContext context)
        {
            _context = context;
        }

        // GET: api/Children
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Child>>> GetChildren()
        {

            var test = _context.Mkb10s.ToList();

            
            return await _context.Children
                .ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutChild(int id, Child child)
        {
            if (id != child.ChildId)
            {
                return BadRequest();
            }

            _context.Entry(child).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChildExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Children
        //To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Child>> PostChild(Child child)
        {
            //Console.WriteLine(child);
            _context.Children.Add(child);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ChildExists(child.ChildId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetChild", new { id = child.ChildId }, child);
        }

        // DELETE: api/Children/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChild(int id)
        {
            var child = await _context.Children.FindAsync(id);
            if (child == null)
            {
                return NotFound();
            }

            _context.Children.Remove(child);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChildExists(int id)
        {
            return _context.Children.Any(e => e.ChildId == id);
        }
    }
}
