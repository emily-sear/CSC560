import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment 4.3';
  constructor(private http: HttpClient) {}
  allCrochetPatterns = ""
  singleCrochetPattern = ""
  getAllCrochetPatterns() {

    this.http.get('http://localhost:3000/api/getAll').subscribe(data => {
      console.log(data);
      this.allCrochetPatterns ="";
      for(let i = 0; i < Object.keys(data).length; i++) {
        if(i != 0) {
          this.allCrochetPatterns += ", " + Object.values(data)[i].name;
        } else {
          this.allCrochetPatterns += Object.values(data)[i].name;
        }

      }
    })
  }

  getSingleCrochetPattern() {
    let inputValue = (<HTMLInputElement>document.getElementById("idInput")).value
    if(inputValue !== "") {
      this.http.get('http://localhost:3000/api/getOne/' + inputValue).subscribe(data => {
        console.log(data);
        this.singleCrochetPattern = "Name: " + Object.values(data)[1] + "\n";
        this.singleCrochetPattern += "Yarn Weight: " + Object.values(data)[2] + "\n";
        this.singleCrochetPattern += "Hook size: " + Object.values(data)[3] + "\n";
        this.singleCrochetPattern += "Amount of yarn: " + Object.values(data)[4] +"\n";
    })
    }
    }
  }
