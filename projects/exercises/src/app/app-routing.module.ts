import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'class-1', loadChildren: () => import('./class-1/emoji.module').then(m => m.EmojiModule) },
  { path: 'class-2', loadChildren: () => import('./class-2/class-2.module').then(m => m.Class2Module) },
  { path: 'class-3', loadChildren: () => import('./class-3/class-3.module').then(m => m.Class3Module) },
  { path: 'class-4', loadChildren: () => import('./class-4/class-4.module').then(m => m.Class4Module) },
  { path: 'practice', loadChildren: () => import('./practice/practice.module').then(m => m.PracticeModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
