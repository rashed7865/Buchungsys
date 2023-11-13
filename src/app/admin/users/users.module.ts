import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersListComponent } from './users-list/users-list.component';



@NgModule({
  declarations: [
    UsersListComponent,
    BookingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule {
  static routes: Routes | undefined;

}
