import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss', '../../admin/admin.component.scss']
})

export class UserDashboardComponent implements OnInit {

  bookingList: any = [];
  user: any;

  constructor(
    private router: Router,
    private booking_service: BookingService
  ) { }
  ngOnInit(): void {
    let data: any = localStorage.getItem('user');
    this.user = JSON.parse(data);
    this.getUserBookings(this.user?.uid)
  }


  getUserBookings(id: any): void {
    this.booking_service
      .getBookingById(id)
      .subscribe(
        (response: any) => {
          this.bookingList = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  AddBooking() {
    this.router.navigateByUrl('/public/dashboard/addbooking');
  }
}
