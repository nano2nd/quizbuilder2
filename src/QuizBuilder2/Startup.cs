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
using Microsoft.AspNetCore.Identity;

namespace QuizBuilder2
{
    public class Startup
    {
        private IConfigurationRoot _configuration { get; }
        private bool _isDevelopment { get; }

        public Startup(IHostingEnvironment env)
        {
            _isDevelopment = env.IsDevelopment();

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);
            
            if (env.IsDevelopment() || env.IsStaging())
            {
                builder.AddUserSecrets();
            }  
                
            builder.AddEnvironmentVariables();
            _configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // if (_isDevelopment)
            // {
            //     services.AddDbContext<QuizDbContext>(options => options.UseInMemoryDatabase());
            // }
            // else
            {
                var connection =  _configuration["ConnectionStrings:QuizBuilderDataConnectionString"]
                    .Replace("<password>", _configuration["dbpassword"]);
                
                services.AddDbContext<QuizDbContext>(options => options.UseSqlServer(connection));
            }

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<QuizDbContext>()
                .AddDefaultTokenProviders();

            services
                .AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });;

            services.AddSingleton<IConfiguration>(s => _configuration);
            services.AddQuizBuilderServices();       
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            ILoggerFactory loggerFactory, IServiceProvider serviceProvider, ISeeder seeder,
            UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            /* Since there is no request yet, the service provider is not yet able to give a scoped 
                instance of the DbContext so it otherwise creates one that will live for the lifetime of
                the application, thus we create a scoped one of our own just for startup */
            using(var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using(var context = scope.ServiceProvider.GetService<QuizDbContext>())
                {
                    if (_isDevelopment)
                        seeder.Seed();
                    else
                        context.Database.Migrate();
                }
            }

            loggerFactory.AddConsole(_configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            
            app.UseStaticFiles();

            app.UseIdentity();

            if (_isDevelopment)
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();

                // Create a user
                var user = new ApplicationUser { 
                    UserName = "nano2nd@icloud.com"
                };

                // Running this method asynchronously causes indefinite hang
                var userM = userManager.CreateAsync(user, _configuration["dbpassword"]).Result;

                // Add the required role
                var quizAdminRole = new IdentityRole {
                   Name = "QuizAdminRole"
                };
                var role = roleManager.CreateAsync(quizAdminRole).Result;
                var addResult = userManager.AddToRoleAsync(user, "QuizAdminRole").Result;
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
