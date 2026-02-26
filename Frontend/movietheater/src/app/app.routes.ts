import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './admin/dashboard/dashboard';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { ReviewComponent } from './admin/review/review';
import { Customers } from './admin/customers/customers';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'admin',
        component: AdminLayout,
        children: [
        { path: 'dashboard', component: Dashboard},
        { path: 'review', component: ReviewComponent},
        { path: 'customers', component: Customers}
        ],
    },
    {
        path: 'booking', 
        loadChildren: () => import('./booking/booking-module').then(m => m.BookingModule)
    },
    ];
