import { RouterModule, Route } from "@angular/router";
import { NgModule } from "@angular/core";

// Pages
import { LoginComponent } from "./containers/login/login.component";
import { SignupComponent } from "./containers/signup/signup.component";

// Guards
import { ChechAuthService } from './guards/chech-auth.service';

const routes: Route[] = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [ChechAuthService]
  },
  {
    path: "singup",
    component: SignupComponent,
    canActivate: [ChechAuthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
