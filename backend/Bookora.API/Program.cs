using System.Text;
using System.Text.Json.Serialization;
using Bookora.API.Data;
using Bookora.API.Hubs;
using Bookora.API.Interfaces;
using Bookora.API.Repositories;
using Bookora.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        var allowedOrigins =
            builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ??
            Array.Empty<string>();

        policy
            .SetIsOriginAllowed(origin =>
            {
                if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri))
                {
                    return false;
                }

                var host = uri.Host.ToLowerInvariant();

                return allowedOrigins.Contains(origin, StringComparer.OrdinalIgnoreCase) ||
                       host == "localhost" ||
                       host == "127.0.0.1" ||
                       host.EndsWith(".vercel.app") ||
                       host.StartsWith("10.") ||
                       host.StartsWith("172.") ||
                       host.StartsWith("192.168.");
            })
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme =
            JwtBearerDefaults.AuthenticationScheme;

        options.DefaultChallengeScheme =
            JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        var key = Encoding.UTF8.GetBytes(
            builder.Configuration["Jwt:Key"]!
        );

        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer =
                    builder.Configuration["Jwt:Issuer"],

                ValidAudience =
                    builder.Configuration["Jwt:Audience"],

                IssuerSigningKey =
                    new SymmetricSecurityKey(key),
            };
    });

builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<BookoraDemoSeeder>();

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddSignalR();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Bookora API",
        Version = "v1",
    });

    options.AddSecurityDefinition("Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Enter JWT token",
        });

    options.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer",
                    }
                },
                Array.Empty<string>()
            }
        });
});

builder.Services.AddScoped<
    IBusinessRepository,
    BusinessRepository>();

builder.Services.AddScoped<
    IBusinessService,
    BusinessService>();

builder.Services.AddScoped<
    IOfferRepository,
    OfferRepository>();

builder.Services.AddScoped<
    IOfferService,
    OfferService>();

builder.Services.AddScoped<
    IOfferSlotRepository,
    OfferSlotRepository>();

builder.Services.AddScoped<
    IOfferSlotService,
    OfferSlotService>();

builder.Services.AddScoped<
    IBookingRepository,
    BookingRepository>();

builder.Services.AddScoped<
    IBookingService,
    BookingService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapHub<BookingHub>("/hubs/bookings");

app.Run();
