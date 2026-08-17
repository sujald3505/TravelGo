using AutoMapper;
using TravelGo.Application.DTOs.Booking;
using TravelGo.Domain.Entities;
using TravelGo.Domain.Interfaces;
using TravelGo.Application.Interfaces;

namespace TravelGo.Application.Services;

public class BookingService : IBookingService
{
    private readonly IBookingRepository _bookingRepository;
    private readonly IMapper _mapper;

    public BookingService(
        IBookingRepository bookingRepository,
        IMapper mapper)
    {
        _bookingRepository = bookingRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<BookingDto>> GetAllAsync()
    {
        var bookings =
            await _bookingRepository.GetAllAsync();

        return _mapper.Map<IEnumerable<BookingDto>>(
            bookings);
    }

    public async Task<BookingDto?> GetByIdAsync(int id)
    {
        var booking =
            await _bookingRepository.GetByIdAsync(id);

        if (booking == null)
            return null;

        return _mapper.Map<BookingDto>(booking);
    }

    public async Task<IEnumerable<BookingDto>> GetByUserIdAsync(
        int userId)
    {
        var bookings =
            await _bookingRepository.GetByUserIdAsync(userId);

        return _mapper.Map<IEnumerable<BookingDto>>(
            bookings);
    }

    public async Task<BookingDto> CreateAsync(
        CreateBookingDto dto)
    {
        var booking =
            _mapper.Map<Booking>(dto);

        var createdBooking =
            await _bookingRepository.CreateAsync(
                booking);

        return _mapper.Map<BookingDto>(
            createdBooking);
    }

    public async Task<BookingDto?> UpdateAsync(
        int id,
        UpdateBookingDto dto)
    {
        var existingBooking =
            await _bookingRepository.GetByIdAsync(id);

        if (existingBooking == null)
            return null;

        _mapper.Map(dto, existingBooking);

        var updatedBooking =
            await _bookingRepository.UpdateAsync(
                existingBooking);

        return _mapper.Map<BookingDto>(
            updatedBooking);
    }

    // ==========================================
    // UPDATE ONLY BOOKING STATUS
    // ==========================================

    public async Task<BookingDto?> UpdateStatusAsync(
        int id,
        string status)
    {
        var existingBooking =
            await _bookingRepository.GetByIdAsync(id);

        if (existingBooking == null)
            return null;

        // Only Status changes
        existingBooking.Status = status;

        var updatedBooking =
            await _bookingRepository.UpdateAsync(
                existingBooking);

        return _mapper.Map<BookingDto>(
            updatedBooking);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _bookingRepository.DeleteAsync(id);
    }
}