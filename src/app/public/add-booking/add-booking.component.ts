import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss', '../../admin/admin.component.scss']
})
export class AddBookingComponent implements OnInit {

  currentDate: any;
  threeWeeksFromToday: any;
  minDate: any;
  maxDate: any;
  bookingForm!: FormGroup;
  user: any;
  timeInPast = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let data: any = localStorage.getItem('user');
    this.user = JSON.parse(data);
    this.currentDate = new Date();
    this.threeWeeksFromToday = new Date(this.currentDate);
    this.threeWeeksFromToday.setDate(this.threeWeeksFromToday.getDate() + 21);
    this.minDate = new Date(this.currentDate).toISOString().split('T')[0];
    this.maxDate = new Date(this.threeWeeksFromToday).toISOString().split('T')[0];

    this.bookingForm = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      fromTime: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      toTime: ['', [Validators.required]],
      userUid: [this.user?.uid],
      userName: [this.user?.displayName],
      userEmail: [this.user?.email],
    });

  }

  TimeInPast(): void {
    this.bookingForm.value.fromTime;
    const currentDate = new Date();
    const selectedDate = new Date(this.bookingForm.get('fromDate')?.value);
    if (selectedDate.toDateString() === currentDate.toDateString()) {
      const currentTime = new Date();
      const selectedTime = this.bookingForm.get('fromTime')?.value.split(':');
      if ((+selectedTime[0] > currentTime.getHours()) || (+selectedTime[0] === currentTime.getHours() && +selectedTime[1] >= currentTime.getMinutes())) {
        this.timeInPast = false
      }
      else {
        this.timeInPast = true
      }

    }

  }

  // Check() {
  //   if (this.bookingForm.value.fromDate > this.bookingForm.value.toDate) {
  //     this.bookingForm?.get('toDate')?.setValue('');
  //   }
  // }

  addBooking() {
    if (this.bookingForm.valid) {
      this.bookingService.createBooking(this.bookingForm.value)
        .subscribe((res) => {
          this.router.navigateByUrl('/public/dashboard/bookings');
        }),
        (err: any) => {
          console.log(err);
        }
    }
    else {
      this.bookingForm.markAllAsTouched();
    }
  }
}
