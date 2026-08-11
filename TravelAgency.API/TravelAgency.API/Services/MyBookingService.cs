using AutoMapper;
using TravelAgency.API.DTOs.MyBooking;
using TravelAgency.API.Repositories.Interfaces;
using TravelAgency.API.Services.Interfaces;

namespace TravelAgency.API.Services.Implementations;

public class MyBookingService : IMyBookingService
{
    private readonly IMyBookingRepository _myBookingRepository;
    private readonly IMapper _mapper;

    public MyBookingService(
        IMyBookingRepository myBookingRepository,
        IMapper mapper)
    {
        _myBookingRepository = myBookingRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<MyBookingDto>> GetAllByUserIdAsync(int userId)
    {
        var bookings = await _myBookingRepository.GetAllByUserIdAsync(userId);

        return _mapper.Map<IEnumerable<MyBookingDto>>(bookings);
    }

    public async Task<MyBookingDto?> GetDetailsAsync(int bookingId)
    {
        var booking = await _myBookingRepository.GetDetailsAsync(bookingId);

        if (booking == null)
            return null;

        return _mapper.Map<MyBookingDto>(booking);
    }
}