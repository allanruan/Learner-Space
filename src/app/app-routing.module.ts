import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './cards/cards.component';
import { GoalComponent } from './goal/goal.component';
import { HomeComponent } from './home/home.component';
import { UserComponent} from './user/user.component'


import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cards', component: CardsComponent,canActivate: [AuthGuard], data: {roles:["user"]} },
  { path: 'goals', component: GoalComponent,canActivate: [AuthGuard], data: {roles:["user"]} },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: {roles:["admin"]} }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
