import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './admin/dashboard/dashboard';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { Theaters } from './pages/theaters/theaters';

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
        path: 'admin',
        component: AdminLayout,
        children: [
        { path: 'dashboard', component: Dashboard},
        { path: 'movie', component: Dashboard}
        ],
    },
    {
        path: 'booking/:id', 
        loadChildren: () => import('./booking/booking-module').then(m => m.BookingModule)
    },
    ];
