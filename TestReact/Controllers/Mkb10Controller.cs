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
    public class Mkb10Controller : ControllerBase
    {
        private readonly ClinicContext _context;

        public Mkb10Controller(ClinicContext context)
        {
            _context = context;
        }

        // GET: api/Mkb10
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mkb10>>> GetMkb10s()
        {
          if (_context.Mkb10s == null)
          {
              return NotFound();
          }
            return await _context.Mkb10s.ToListAsync();
        }

        // GET: api/Mkb10/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Mkb10>> GetMkb10(int id)
        {
          if (_context.Mkb10s == null)
          {
              return NotFound();
          }
            var mkb10 = await _context.Mkb10s.FindAsync(id);

            if (mkb10 == null)
            {
                return NotFound();
            }

            return mkb10;
        }

        // PUT: api/Mkb10/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMkb10(int id, Mkb10 mkb10)
        {
            if (id != mkb10.Id)
            {
                return BadRequest();
            }

            _context.Entry(mkb10).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Mkb10Exists(id))
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

        // POST: api/Mkb10
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Mkb10>> PostMkb10(Mkb10 mkb10)
        {
          if (_context.Mkb10s == null)
          {
              return Problem("Entity set 'ClinicContext.Mkb10s'  is null.");
          }
            _context.Mkb10s.Add(mkb10);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Mkb10Exists(mkb10.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMkb10", new { id = mkb10.Id }, mkb10);
        }

        // DELETE: api/Mkb10/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMkb10(int id)
        {
            if (_context.Mkb10s == null)
            {
                return NotFound();
            }
            var mkb10 = await _context.Mkb10s.FindAsync(id);
            if (mkb10 == null)
            {
                return NotFound();
            }

            _context.Mkb10s.Remove(mkb10);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Mkb10Exists(int id)
        {
            return (_context.Mkb10s?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
