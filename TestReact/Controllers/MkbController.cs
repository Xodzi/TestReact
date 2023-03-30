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
    public class MkbController : ControllerBase
    {
        private readonly ClinicContext _context;

        public MkbController(ClinicContext context)
        {
            _context = context;
        }

        // GET: api/Mkb
        [HttpGet]
        public IEnumerable<Mkb> Get()
        {
            return _context.Mkb10s.ToList();
        }

        // GET: api/Mkb/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Mkb>> GetMkb(int id)
        {
          if (_context.Mkb10s == null)
          {
              return NotFound();
          }
            var mkb = await _context.Mkb10s.FindAsync(id);

            if (mkb == null)
            {
                return NotFound();
            }

            return mkb;
        }

        // PUT: api/Mkb/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMkb(int id, Mkb mkb)
        {
            if (id != mkb.Id)
            {
                return BadRequest();
            }

            _context.Entry(mkb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MkbExists(id))
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

        // POST: api/Mkb
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Mkb>> PostMkb(Mkb mkb)
        {
          if (_context.Mkb10s == null)
          {
              return Problem("Entity set 'ClinicContext.Mkb10s'  is null.");
          }
            _context.Mkb10s.Add(mkb);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MkbExists(mkb.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMkb", new { id = mkb.Id }, mkb);
        }

        // DELETE: api/Mkb/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMkb(int id)
        {
            if (_context.Mkb10s == null)
            {
                return NotFound();
            }
            var mkb = await _context.Mkb10s.FindAsync(id);
            if (mkb == null)
            {
                return NotFound();
            }

            _context.Mkb10s.Remove(mkb);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MkbExists(int id)
        {
            return (_context.Mkb10s?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
