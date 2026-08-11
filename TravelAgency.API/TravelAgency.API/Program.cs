using Microsoft.EntityFrameworkCore;
using TravelAgency.API.Authentication;
using TravelAgency.API.Data;
using TravelAgency.API.Interfaces;
using TravelAgency.API.Repositories;
using TravelAgency.API.Seed;
using TravelAgency.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TravelAgency.API.Mapping;
using TravelAgency.API.Repositories.Implementations;
using TravelAgency.API.Repositories.Interfaces;
using TravelAgency.API.Services.Implementations;
using TravelAgency.API.Services.Interfaces;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your JWT token"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));



builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<IAuthRepository, AuthRepository>();

builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

builder.Services.AddScoped<IDestinationRepository, DestinationRepository>();

builder.Services.AddScoped<IDestinationService, DestinationService>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));


builder.Services.AddScoped<IBookingRepository, BookingRepository>();
builder.Services.AddScoped<IBookingService, BookingService>();

builder.Services.AddScoped<IHotelRepository, HotelRepository>();

builder.Services.AddScoped<IPackageRepository, PackageRepository>();

builder.Services.AddScoped<IHotelService, HotelService>();

builder.Services.AddScoped<IPackageService, PackageService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IDashboardService, DashboardService>();

builder.Services.AddScoped<IMyBookingRepository, MyBookingRepository>();

builder.Services.AddScoped<IMyBookingService, MyBookingService>();

builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddScoped<IInquiryService, InquiryService>();

builder.Services.AddScoped<IHotelImageRepository, HotelImageRepository>();

builder.Services.AddScoped<IHotelImageService, HotelImageService>();

builder.Services.AddScoped<
    IPackageImageRepository,
    PackageImageRepository>();

builder.Services.AddScoped<
    IPackageImageService,
    PackageImageService>();

builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("JwtSettings"));

var jwtSettings = builder.Configuration
    .GetSection("JwtSettings")
    .Get<JwtSettings>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = jwtSettings!.Issuer,
        ValidAudience = jwtSettings.Audience,

        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSettings.Key))
    };
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    await DataSeeder.SeedAsync(context);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("AllowAngular");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
