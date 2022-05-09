import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../weather.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todaydate = new Date();
  city: string = '';
  weatherTempr !: any;
  searchForm !: FormGroup;
  constructor(private weatherservice: WeatherService, private route: Router) {

  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      city: new FormControl(
        null,
        [Validators.required]
      )
    })
  }

  sendCity() {
    console.log(this.searchForm.value)
    this.city = this.searchForm.value.city

    this.weatherservice.loadData(this.city).subscribe({
      complete: () => { console.log('Success done!') },
      error: () => {
        alert("You have enter wrong city!!! ")
        this.route.navigate([''])
      },
      next: (data: any = []) => {
        console.log(data)
        this.route.navigate([`city/${this.city}`])
        this.weatherTempr = data
        console.log(this.weatherTempr)
      }
    })
  }

}
