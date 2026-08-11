using AutoMapper;
using TravelAgency.API.DTOs.Booking;

using TravelAgency.API.DTOs.Destination;
using TravelAgency.API.DTOs.Hotel;
using TravelAgency.API.DTOs.HotelImage;
using TravelAgency.API.DTOs.MyBooking;
using TravelAgency.API.DTOs.Package;
using TravelAgency.API.DTOs.PackageImage;
using TravelAgency.API.Models;

using TravelAgency.API.DTOs.User;
using TravelAgency.API.Models;

namespace TravelAgency.API.Mapping;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // Destination
        CreateMap<Destination, DestinationDto>();
        CreateMap<CreateDestinationDto, Destination>();
        CreateMap<UpdateDestinationDto, Destination>();


        // Booking
        CreateMap<Booking, BookingDto>()
            .ForMember(dest => dest.UserName,
                opt => opt.MapFrom(src => src.User.FirstName + " " + src.User.LastName))
            .ForMember(dest => dest.DestinationName,
                opt => opt.MapFrom(src => src.Destination.Name));
             

        CreateMap<CreateBookingDto, Booking>();

        CreateMap<UpdateBookingDto, Booking>();

        //Hotel
        CreateMap<Hotel, HotelDto>()
            .ForMember(dest => dest.DestinationName,
                opt => opt.MapFrom(src => src.Destination.Name));

        CreateMap<CreateHotelDto, Hotel>();
        CreateMap<UpdateHotelDto, Hotel>();

        //Hotel Image
        CreateMap<HotelImage, HotelImageDto>();
        CreateMap<CreateHotelImageDto, HotelImage>();
        CreateMap<UpdateHotelImageDto, HotelImage>();

        //Package
        CreateMap<Package, PackageDto>()
          .ForMember(dest => dest.DestinationName,
              opt => opt.MapFrom(src => src.Destination.Name));

        CreateMap<CreatePackageDto, Package>();
        CreateMap<UpdatePackageDto, Package>();

        //Package Image
        CreateMap<PackageImage, PackageImageDto>();
        CreateMap<CreatePackageImageDto, PackageImage>();
        CreateMap<UpdatePackageImageDto, PackageImage>();




        CreateMap<Booking, MyBookingDto>()
    .ForMember(dest => dest.UserName,
                opt => opt.MapFrom(src => src.User.FirstName + " " + src.User.LastName))

    .ForMember(dest => dest.DestinationName,
        opt => opt.MapFrom(src => src.Destination.Name));


        CreateMap<User, UserDto>()
    .ForMember(
        dest => dest.RoleName,
        opt => opt.MapFrom(
            src => src.Role != null
                ? src.Role.Name
                : string.Empty
        )
    );


    }
}