using TravelGo.Application.DTOs.Dashboard;

namespace TravelGo.Application.Interfaces;

public interface IDashboardService
{
    Task<DashboardDto> GetDashboardAsync();
}