import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private githubAPIUrl = "https://api.github.com";

  constructor(private httpClient: HttpClient) { }

  public getUsers() {
    return this.httpClient.get(`${this.githubAPIUrl}/users`);
  }
}
