using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using TodoApi.Services;

namespace TodoApi.Controllers
{
  [Route("api/todo")]
  [ApiController]
  public class TodoController : ControllerBase
  {
    private readonly ITodoItemService _service;

    public TodoController(ITodoItemService service)
    {
      _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
    {
      var response = await _service.GetAllTodoItems();
      return response;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
    {
      var response = await _service.GetTodoItemById(id);
      if (response == null)
      {
        return NotFound();
      }
      return response;
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem item)
    {
      var response = await _service.CreateTodoItem(item);
      return response;
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TodoItem>> PutTodoItem(long id, TodoItem item)
    {
      if (id == item.Id)
      {
        var response = await _service.UpdateTodoItem(item);
        return response;
      }
      return BadRequest();

    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<TodoItem>> DeleteTodoItem(long id)
    {
      var response = await _service.DeleteTodoItem(id);
      return response;
    }
  }
}