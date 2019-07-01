using System.Collections.Generic;
using System.Threading.Tasks;
using TodoApi.Models;
using TodoApi.Repo;

namespace TodoApi.Services
{
  public interface ITodoItemService
  {

    Task<List<TodoItem>> GetAllTodoItems();

    Task<TodoItem> GetTodoItemById(long id);

    Task<TodoItem> CreateTodoItem(TodoItem item);

    Task<TodoItem> UpdateTodoItem(TodoItem item);

    Task<TodoItem> DeleteTodoItem(long id);
  }
  public class TodoItemService : ITodoItemService
  {
    ITodoItemRepo _repo;
    public TodoItemService(ITodoItemRepo repo)
    {
      _repo = repo;
    }

    public async Task<TodoItem> CreateTodoItem(TodoItem item)
    {
      return await _repo.CreateTodoItem(item);
    }

    public async Task<TodoItem> DeleteTodoItem(long id)
    {
      return await _repo.DeleteTodoItem(id);
    }

    public async Task<List<TodoItem>> GetAllTodoItems()
    {
      return await _repo.GetAllTodoItems();
    }

    public async Task<TodoItem> GetTodoItemById(long id)
    {
      return await _repo.GetTodoItemById(id);
    }

    public async Task<TodoItem> UpdateTodoItem(TodoItem item)
    {
      return await _repo.UpdateTodoItem(item);
    }
  }
}