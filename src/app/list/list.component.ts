import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  requestResult: any;
  error: boolean = false;
  paginationPage: number = 1;
  paginationPageSize: number = 10;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const access_token: string = localStorage.getItem('access_token');
    const requestUrl: string = 'https://core.nekta.cloud/api/device/metering_devices';
    const requestBody: object = {
      page: 1, last_page: 0, sort_field: "id", sort: "desc", search_string: null, device_state: "all", is_archived: false, paginate: false,
      append_fields: ["active_polling", "attributes", "tied_point"], per_page: 10
    };
    const headers = new HttpHeaders({'Authorization': `Bearer ${access_token}` });
    const requestOptions = { headers: headers };

    this.http.post(requestUrl, requestBody, requestOptions)
      .subscribe((result) => {
        this.error = false;
        this.requestResult = result;
      },
        error => this.error = error
      );
  }

}
