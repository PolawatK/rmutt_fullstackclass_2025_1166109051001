import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './admin/dashboard/dashboard';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { Theatercrud } from './admin/theatercrud/theatercrud';
import { Theaters } from './pages/theaters/theaters';
import { Customers } from './admin/customers/customers';
import { Authentication } from './authentication/authentication';
import { ReviewComponent } from './admin/review/review';
import { Bookingcrud} from './admin/bookingcrud/bookingcrud';
import { Moviecrud } from './admin/moviecrud/moviecrud';
import { Movies } from './pages/movies/movies';
import { Mybooking } from './pages/mybooking/mybooking';
// import { Showtime } from './admin/showtime/showtime';
import { MovieDetail } from './pages/movie-detail/movie-detail';
import { AuthGuard } from './guards/auth.guard';

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
        path: 'mybooking',
        component: Mybooking
    },
    {
        path: 'movies',
        component: Movies
    },
    {
        path: 'admin',
        component: AdminLayout,
        children: [
        { path: '', component: Dashboard},
        { path: 'movie', component: Dashboard},
        { path: 'review', component: ReviewComponent},
        { path: 'customers', component: Customers},
        { path: 'theaters', component: Theatercrud},
        { path: 'theatercrud', component: Theatercrud},
        { path: 'bookingcrud', component: Bookingcrud},
        { path: 'movies', component: Moviecrud},//moviecrud
        // { path: 'showtime', component: Showtime},
        ],
    },
    {
  path: 'booking/:id',
  loadChildren: () =>
    import('./booking/booking-module').then(m => m.BookingModule),
  canActivate: [AuthGuard]
},{
        path: 'moviedetail/:id',
        component: MovieDetail
    },
    {
        path: 'reviews', component: ReviewComponent
    }
    

    ];
