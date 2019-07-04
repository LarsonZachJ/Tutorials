using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using TodoApi.Models;
using TodoApi.Repo;
using TodoApi.Services;

namespace TodoApi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    readonly string AngularOrigins = "_AllowAngularOrigins";

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors(options =>
      {
        options.AddPolicy(AngularOrigins, builder =>
              {
                builder.WithOrigins("http://localhost:4200");
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
              });
      });

      services.AddDbContext<TodoContext>(options => options.UseInMemoryDatabase("TodoList"));
      services.AddTransient<ITodoItemRepo, TodoItemRepo>();
      services.AddTransient<ITodoItemService, TodoItemService>();
      services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver()).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
        app.UseHttpsRedirection();
      }

      app.UseCors(AngularOrigins);
      app.UseMvc();
    }
  }
}
