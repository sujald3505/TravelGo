import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  stats = [
  {
    number: "10K+",
    title: "Happy Travelers"
  },
  {
    number: "150+",
    title: "Tour Packages"
  },
  {
    number: "50+",
    title: "Countries"
  },
  {
    number: "24/7",
    title: "Customer Support"
  }
];

teamMembers = [
  {
    name: 'John Smith',
    role: 'Founder & CEO',
    image: '/images/John-smith.jpg'
  },
  {
    name: 'Emma Watson',
    role: 'Tour Manager',
    image: '/images/Emma Watson.webp'
  },
  {
    name: 'David Miller',
    role: 'Travel Guide',
    image: '/images/David-miller.webp'
  }
];
features = [
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Safe & Secure',
    description: 'Your journey is protected with trusted travel services.'
  },
  {
    icon: 'fa-solid fa-tags',
    title: 'Best Price',
    description: 'Premium travel packages at affordable prices.'
  },
  {
    icon: 'fa-solid fa-headset',
    title: '24/7 Support',
    description: 'Our support team is always available for you.'
  },
  {
    icon: 'fa-solid fa-earth-americas',
    title: 'Global Destinations',
    description: 'Explore the most beautiful places around the world.'
  }
];
}
