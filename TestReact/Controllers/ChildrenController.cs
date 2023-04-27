﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestReact.Models;
using TestReact.Repository;

namespace TestReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChildrenController : ControllerBase
    {
        private readonly ClinicContext _context;
        private IChildrenRepository _childrenRepository;

        public ChildrenController(ClinicContext context)
        {
            _context = context;
            _childrenRepository = new ChildrenRepository(context);
        }

        // GET: api/Children
        [HttpGet]
        public async Task<IEnumerable<Child>> GetChildren()
        {
            return await _childrenRepository.GetChildren();
            //return await _context.Children
            //    .ToListAsync();
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

        #region MKB10
        [HttpGet]
        [Route("api/Children/mkb")]
        public async Task<ActionResult<IEnumerable<Mkb10>>> GetMkb10s()
        {
            if (_context.Mkb10s == null)
            {
                return NotFound();
            }
            return await _context.Mkb10s.ToListAsync();
        }

        #endregion
    }
}
