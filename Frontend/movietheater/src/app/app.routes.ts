import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './admin/dashboard/dashboard';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { Theaters } from './pages/theaters/theaters';
import { Customers } from './admin/customers/customers';
import { Authentication } from './authentication/authentication';
import { ReviewComponent } from './admin/review/review';
export const routes: Routes = [
    {
        path: '',
        component: Home
    },

    {
        path: 'theaters',
        component: Theaters
    },
    {
        path: 'regislog',
        component: Authentication
    },
    {
        path: 'admin',
        component: AdminLayout,
        children: [
        { path: 'dashboard', component: Dashboard},
        { path: 'movie', component: Dashboard},
        { path: 'review', component: ReviewComponent},
        { path: 'customers', component: Customers}
        ],
    },
    
    {
        path: 'booking/:id', 
        loadChildren: () => import('./booking/booking-module').then(m => m.BookingModule)
    },
    {
        path: 'reviews', component: ReviewComponent
    }
    ];
