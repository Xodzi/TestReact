using System;
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
        public ChildrenController(ClinicContext context, IChildrenRepository _rep)
        {
            _context = context;
            _childrenRepository = _rep;
        }
        public ChildrenController(IChildrenRepository _rep)
        {
            _childrenRepository = _rep;
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
            if (child == null || id != child.ChildId)
            {
                return BadRequest();
            }

            return await _childrenRepository.PutChild(id, child);
        }

        // POST: api/Children
        [HttpPost]
        public async Task<ActionResult<Child>> PostChild(Child child)
        {
            //Console.WriteLine(child);
           return await _childrenRepository.PostChild(child);
        }

        // DELETE: api/Children/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChild(int id)
        {
            return await _childrenRepository.DeleteChild(id);
        }

        public bool ChildExists(int id)
        {
            return _context.Children.Any(e => e.ChildId == id);
        }
        public async Task<IEnumerable<Child>> GetById(int id)
        {
            return await _childrenRepository.GetById(id);
        }
    }
}
