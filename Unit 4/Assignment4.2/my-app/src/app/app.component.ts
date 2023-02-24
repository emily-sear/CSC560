import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

  
})
export class AppComponent {
  title = 'my-app';
  constructor(private http: HttpClient) {}
  allPlayers = "";
  mostPassingTouchdowns = "";
  mostRushingYards = "";
  leastRushingYards = "";
  mostToLeastRecievingYards = "";
  allPlayersClicked() {

    this.http.get('http://localhost:3000/api/getAll').subscribe(data => {
      console.log(data);
      this.allPlayers ="";
      for(let i = 0; i < Object.keys(data).length; i++) {
        if(i != 0) {
          this.allPlayers += ", " + Object.values(data)[i].name;
        } else {
          this.allPlayers += Object.values(data)[i].name;
        }

      }
    })
  }
  mostPassingTouchdownsClicked() {
    this.http.get('http://localhost:3000/api/get/mostPassingTouchdowns').subscribe(data => {
      console.log(data);
      this.mostPassingTouchdowns = Object.values(data)[0].name;
    })
   
  }
  mostRushingYardsClicked() {
    this.http.get('http://localhost:3000/api/get/mostRushingYards').subscribe(data => {
      console.log(data);
      this.mostRushingYards = Object.values(data)[0].name;
    })
  }
  leastRushingYardsClicked() {
    this.http.get('http://localhost:3000/api/get/leastRushingYards').subscribe(data => {
      console.log(data);
      this.leastRushingYards = Object.values(data)[0].name;
    })
  }
  mostToLeastRecievingYardsClicked() {
    this.http.get('http://localhost:3000/api/get/mostToLeastRecievingYards').subscribe(data => {
      console.log(data);
      for(let i = 0; i < Object.keys(data).length; i++) {
        if(i != 0) {
          this.mostToLeastRecievingYards += ", " + Object.values(data)[i].name;
        } else {
          this.mostToLeastRecievingYards += Object.values(data)[i].name;
        }

      }
    })  }
}
