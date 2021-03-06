import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../ngrx-store/reducers";
import { AuthLoading, Signup } from "../../actions/auth.actions";
import { Observable } from "rxjs";
import { authLoading, signupErrorState } from "../../selectors";
import { confirmedPassword, passwordPatter } from "../../../shared/validators";
@Component({
  selector: "app-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"]
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;
  signupSubmited = false;
  signupError$: Observable<null | string>;
  authLoading$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    // Observe loading state
    this.signupError$ = this.store.select(signupErrorState);
    // Observe Error State
    this.authLoading$ = this.store.select(authLoading);

    this.signupForm = new FormGroup({
      username: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl("", Validators.compose([Validators.required, passwordPatter(8)])),
      passwordConfirmation: new FormControl(
        "",
        Validators.compose([Validators.required])
      )
    }, {
      validators: [confirmedPassword]
    });
  }

  ngOnInit() {}

  get signupFormControls() {
    return this.signupForm.controls;
  }

  get passwordConfirmationError () {
    return this.signupForm.getError('notIdentical')
  }

  signup() {
    this.signupSubmited = true;
    const formValue = this.signupForm.value;
    if (formValue.password === formValue.passwordConfirmation) {
      if (this.signupForm.valid) {
        const data = this.signupForm.value;
        this.store.dispatch(new AuthLoading());
        this.store.dispatch(new Signup(data));
      }
    }
  }
}
