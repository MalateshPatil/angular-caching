import { Component, OnInit } from '@angular/core';
import { GithubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'angular-caching';

  constructor(public gitHubService: GithubService){

  }
  ngOnInit(){
    this.gitHubService.getUsers().subscribe(
      data =>{
        console.log(data);
      }
    )
  }

  loadUsers(){
    this.gitHubService.getUsers().subscribe(
      data =>{
        console.log(data);
      }
    )
  }
}
