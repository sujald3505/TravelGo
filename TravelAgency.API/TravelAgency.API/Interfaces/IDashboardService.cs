using TravelAgency.API.DTOs.Dashboard;

namespace TravelAgency.API.Services.Interfaces;

public interface IDashboardService
{
    Task<DashboardDto> GetDashboardAsync();
}