import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './admin/dashboard/dashboard';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'Dashboard',
        component: Dashboard
    }
];
