using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Repo
{

  public interface ITodoItemRepo
  {
    Task<List<TodoItem>> GetAllTodoItems();

    Task<TodoItem> GetTodoItemById(long id);

    Task<TodoItem> CreateTodoItem(TodoItem item);

    Task<TodoItem> UpdateTodoItem(TodoItem item);

    Task<TodoItem> DeleteTodoItem(long id);
  }

  public class TodoItemRepo : ITodoItemRepo
  {
    private readonly TodoContext _context;

    public TodoItemRepo(TodoContext context)
    {
      _context = context;

      if (_context.TodoItems.Count() == 0)
      {
        _context.TodoItems.Add(new TodoItem { Name = "Item1" });
        _context.SaveChanges();
      }
    }

    public async Task<TodoItem> CreateTodoItem(TodoItem item)
    {
      TodoItem created = _context.TodoItems.Add(new TodoItem { Name = item.Name, IsComplete = item.IsComplete }).Entity;
      await _context.SaveChangesAsync();

      return created;
    }

    public async Task<TodoItem> DeleteTodoItem(long id)
    {
      TodoItem itemToDelte = await _context.TodoItems.FindAsync(id);
      if (itemToDelte == null)
      {
        return null;
      }
      _context.Remove(itemToDelte);
      await _context.SaveChangesAsync();
      return itemToDelte;
    }

    public async Task<List<TodoItem>> GetAllTodoItems()
    {
      return await _context.TodoItems.ToListAsync();
    }

    public async Task<TodoItem> GetTodoItemById(long id)
    {
      TodoItem foundItem;
      foundItem = await _context.TodoItems.FindAsync(id);
      return foundItem;
    }

    public async Task<TodoItem> UpdateTodoItem(TodoItem item)
    {
      TodoItem itemTOUpdate = await _context.TodoItems.FindAsync(item.Id);
      _context.Entry(itemTOUpdate).CurrentValues.SetValues(item);
      await _context.SaveChangesAsync();
      return item;
    }
  }
}