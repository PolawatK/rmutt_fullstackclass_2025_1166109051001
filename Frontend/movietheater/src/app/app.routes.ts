import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './admin/dashboard/dashboard';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { Theatercrud } from './admin/theatercrud/theatercrud';

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
        { path: 'theatercrud', component: Theatercrud},
        { path: 'movie', component: Dashboard}
        ],
    },
    {
        path: 'booking', 
        loadChildren: () => import('./booking/booking-module').then(m => m.BookingModule)
    },
    ];
