import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  requestResult: any;
  error: boolean = false;
  errorAlertText: string;

  constructor(private http: HttpClient, private _router: Router) { }


  ngOnInit(): void {
    localStorage.clear();
  }

  submitForm(event: any, email: string, password: string): void {
    event.preventDefault();
    const requestUrl: string = 'https://core.nekta.cloud/api/auth/login';
    const requestBody: object = { email: email.trim(), password: password.trim(), personal_data_access: true };

    if (email.trim() != '' && password.trim() != '') {
      this.http.post(requestUrl, requestBody)
        .subscribe((result) => {
          this.error = false;
          this.requestResult = result;
          localStorage.setItem('access_token', this.requestResult.data.access_token);
          this._router.navigate(['list']);
        },
          error => {
            this.error = error;
            this.errorAlertText = 'Что-то пошло не так...';
          }
        );
    } else {
      this.error = true;
      this.errorAlertText = 'Заполните поля.';
    }

  }

}
