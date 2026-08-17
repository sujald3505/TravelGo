import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Destination } from '../../core/models/destination.model';

@Component({
  selector: 'app-destination-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination-details.html',
  styleUrls: ['./destination-details.css']
})
export class DestinationDetails implements OnInit {

  private route = inject(ActivatedRoute);

  environment = environment;
  destination!: Destination;

  ngOnInit(): void {

    this.route.data.subscribe(data => {

      this.destination = data['destination'];

      console.log('Resolver Data:', this.destination);

    });

  }

}