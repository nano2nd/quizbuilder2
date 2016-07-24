using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Services;
using QuizBuilder2.Services.Interfaces;

namespace QuizBuilder2
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);
                
            if (env.IsDevelopment())
            {
                builder.AddUserSecrets();
            }  
                
            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connection =  Configuration["ConnectionStrings:QuizBuilderDataConnectionString"]
                    .Replace("<password>", Configuration["dbpassword"]);
                
            services.AddDbContext<QuizDbContext>(options => options.UseSqlServer(connection));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<QuizDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc();

            services.AddQuizBuilderServices();
            
        }

        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            services.AddDbContext<QuizDbContext>(options => options.UseInMemoryDatabase());
        
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<QuizDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc();

            services.AddQuizBuilderServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            ILoggerFactory loggerFactory, IServiceProvider serviceProvider, ISeeder seeder)
        {
            /* The service provider does not yet able to give a scoped instance of
                the DbContext so it would create one that will live for the lifetime of
                the application, thus we create a scoped one of our own just for startup */
            using(var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using(var context = scope.ServiceProvider.GetService<QuizDbContext>())
                {
                    if (env.IsDevelopment())
                        seeder.Seed();
                    else
                        context.Database.Migrate();
                }
            }

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {

                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseIdentity();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
