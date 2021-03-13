namespace AccountManager
{
    using System.Text;

    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.IdentityModel.Tokens;

    using AccountManager.Data;
    using AccountManager.Models;
    using AccountManager.Services;
    using AccountManager.Services.Interfaces;
    using AccountManager.DTOs;
    using AccountManager.ViewModels.ViewModels;
    using AccountManager.ViewModels;
    using AccountManager.ViewModels.InputModels;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AccountManagerContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));

            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<AccountManagerContext>();

            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, AccountManagerContext>();

            var jwt = Configuration.GetSection("JwtSettings").Get<JwtSettings>();
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
           {
               x.RequireHttpsMetadata = false;
               x.SaveToken = false;
               x.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Secret)),
                   ValidateIssuer = false,
                   ValidateAudience = false,
               };
           })
            .AddIdentityServerJwt();

            services.AddAutoMapper(options => 
            {
                options.CreateMap<Account, AccountDTO>();
                options.CreateMap<Expense, ExpenseDTO>();
                options.CreateMap<Income, IncomeDTO>();
                options.CreateMap<Category, CategoryDTO>();
                options.CreateMap<Tag, TagDTO>();

                options.CreateMap<AccountDTO, AccountViewModel>();
                options.CreateMap<IncomeDTO, IncomeViewModel>();
                options.CreateMap<ExpenseDTO, ExpenseViewModel>();
                options.CreateMap<TagDTO, TagViewModel>();
                options.CreateMap<CategoryDTO, CategoryViewModel>();

                options.CreateMap<AccountInputModel, Account>();
                options.CreateMap<IncomeInputModel, Income>();
                options.CreateMap<ExpenseInputModel, Expense>();
                options.CreateMap<CategoryInputModel, Category>();
                options.CreateMap<TagInputModel, Tag>();
            });

            services.AddControllersWithViews();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            var azure = Configuration.GetSection("AzureSettings").Get<AzureSettings>();
            services.AddSingleton(jwt);
            services.AddSingleton(azure);

            services.AddTransient<IJwtService, JwtService>();
            services.AddTransient<IAccountsService, AccountsService>();
            services.AddTransient<IExpensesService, ExpensesService>();
            services.AddTransient<IIncomesService, IncomesService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
