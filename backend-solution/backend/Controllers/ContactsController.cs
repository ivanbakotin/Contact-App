#nullable enable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContactApi;
using ContactApi.Data;

namespace ContactApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly DataContext _context;

        public ContactsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            var result = from contact in _context.Contacts
                         select new
                         {
                             id = contact.Id,
                             first_name = contact.first_name,
                             last_name = contact.last_name,
                             address = contact.address,
                             city = contact.city,
                             country = contact.country,
                             gender = contact.gender,
                             bookmark = contact.bookmark,
                             tags = (
                                from t in _context.Tags
                                where t.ContactId == contact.Id
                                select t.tag
                            ).ToList(),
                         };

            return Ok(result);
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContact(int id)
        {
            var result = from contact in _context.Contacts
                         where contact.Id == id
                         select new
                         {
                             id = contact.Id,
                             first_name = contact.first_name,
                             last_name = contact.last_name,
                             address = contact.address,
                             city = contact.city,
                             country = contact.country,
                             gender = contact.gender,
                             bookmark = contact.bookmark,
                             tags = (
                                from t in _context.Tags
                                where t.ContactId == contact.Id
                                select t.tag
                            ).ToList(),
                             phones = (
                                from p in _context.Phones
                                where p.ContactId == contact.Id
                                select p.phone
                            ).ToList(),
                             emails = (
                                from e in _context.Emails
                                where e.ContactId == contact.Id
                                select e.email
                            ).ToList()
                         };


            return Ok(result);
        }

        // GET: api/Contacts/Bookmarked/
        [HttpGet("Bookmarked/")]
        public async Task<IActionResult> GetBoomarked()
        {
            var result = from contact in _context.Contacts
                         where contact.bookmark == true
                         select new
                         {
                             id = contact.Id,
                             first_name = contact.first_name,
                             last_name = contact.last_name,
                             address = contact.address,
                             city = contact.city,
                             country = contact.country,
                             gender = contact.gender,
                             bookmark = contact.bookmark,
                         };


            return Ok(result);
        }

        // GET: api/Contacts/Form/{id}/
        [HttpGet("Form/{id}")]
        public async Task<IActionResult> GetFormInfo(int id)
        {
            var contacts = (from contact in _context.Contacts
                           where contact.Id == id
                           select new
                           {
                               id = contact.Id,
                               first_name = contact.first_name,
                               last_name = contact.last_name,
                               address = contact.address,
                               city = contact.city,
                               country = contact.country,
                               gender = contact.gender,
                               bookmark = contact.bookmark,
                           }).FirstOrDefault();

            var tags = (from tag in _context.Tags
                       where tag.ContactId == id
                       select new
                       {
                           Id = tag.Id,
                           ContactId = tag.ContactId,
                           tag = tag.tag
                       }).ToList();

            var emails = (from email in _context.Emails
                         where email.ContactId == id
                         select new
                         {
                             Id = email.Id,
                             ContactId = email.ContactId,
                             email = email.email
                         }).ToList();

            var phones = (from phone in _context.Phones
                         where phone.ContactId == id
                         select new
                         {
                             Id = phone.Id,
                             ContactId = phone.ContactId,
                             phone = phone.phone
                         }).ToList();

            dynamic result = new System.Dynamic.ExpandoObject();

            result.contact = contacts;
            result.tags = tags;
            result.phones = phones;
            result.emails = emails;

            return Ok(result);
        }

        // PUT: api/Contacts/
        [HttpPut("Form/")]
        public async Task<IActionResult> PutContacts(Contact form)
        {

            _context.Entry(form).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Contacts/Search/param
        [HttpGet("Search/")]
        public async Task<IActionResult> SearchContacts(string? parameter)
        {
            if (parameter == null)
            {
                var full_result = from contact in _context.Contacts
                                  select new
                                  {
                                      id = contact.Id,
                                      first_name = contact.first_name,
                                      last_name = contact.last_name,
                                      address = contact.address,
                                      city = contact.city,
                                      country = contact.country,
                                      gender = contact.gender,
                                      bookmark = contact.bookmark,
                                      tags = (
                                         from t in _context.Tags
                                         where t.ContactId == contact.Id
                                         select t.tag
                                     ).ToList(),
                                  };

                return Ok(full_result);
            }

            var result = (from contact in _context.Contacts
                          join tag in _context.Tags 
                          on contact.Id equals tag.ContactId into ps
                          from tag in ps.DefaultIfEmpty()
                          where tag.tag.Contains(parameter) || 
                                contact.first_name.Contains(parameter) ||
                                contact.last_name.Contains(parameter)
                          select new
                          {
                              id = contact.Id,
                              first_name = contact.first_name,
                              last_name = contact.last_name,
                              address = contact.address,
                              city = contact.city,
                              country = contact.country,
                              gender = contact.gender,
                              bookmark = contact.bookmark,
                              tags = (
                                from t in _context.Tags
                                where t.ContactId == contact.Id
                                select t.tag
                            ).ToList(),
                          }).ToList();

            return Ok(result);
        }

        // POST: api/Contacts
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContacts", new { id = contact.Id }, contact);
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            _context.Contacts.RemoveRange(_context.Contacts.Where(x => x.Id == id));
            _context.Tags.RemoveRange(_context.Tags.Where(x => x.ContactId == id));
            _context.Emails.RemoveRange(_context.Emails.Where(x => x.ContactId == id));
            _context.Phones.RemoveRange(_context.Phones.Where(x => x.ContactId == id));
     
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.Id == id);
        }
    }
}
