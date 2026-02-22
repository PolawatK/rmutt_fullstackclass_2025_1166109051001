import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Confirmed } from './confirmed/confirmed';
import { SelectSeats } from './select-seats/select-seats';
import { Payments } from './payments/payments';

const routes: Routes = [
  {
    path: '',
    component: SelectSeats
  },
  {
    path: 'payments',
    component: Payments
  },
  {
    path: 'confirmed',
    component: Confirmed
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }