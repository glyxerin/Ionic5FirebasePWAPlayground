import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LOGIN} from "../constants/formValidationMessage";
import {HelperService} from "../providers/helper.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  formError: any = {
    email: '',
    password: ''
  };
  validationMessage: any = LOGIN;

  constructor(private helperService: HelperService, private router: Router) { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.email = new FormControl('',
        [
            Validators.required,
            Validators.email
    ]
    );

    this.password = new FormControl('',
        [
          Validators.required,
          Validators.minLength(6)
        ]
    );
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });

    this.loginForm.valueChanges.subscribe(data => {
      this.onFormValueChanged(data);
    })
  }

  onFormValueChanged(data) {
    // console.log('data', data);
    // console.log('this.loginForm', this.loginForm);

    this.formError = this.helperService.prepareValidationMessage(this.loginForm, this.validationMessage, this.formError);

    console.log('=====formError', this.formError);
  }

  goToSignUpPage() {
    this.router.navigate(['/signup']);
  }

}