import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  //The URI of the API
  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  //This function returns all Issues.
  getIssues(){
    return this.http.get(`${this.uri}/issues`);
  }
  //This function returns Issues by id.
  getIssuesById(id){
    return this.http.get(`${this.uri}/issues/{:id}`);
  }
  //This function adds an Issue
  addIssue(title, responsible, description, severity){
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.http.post(`${this.uri}/issues/add`,issue);
  }
  //This function updates an Issue
  updateIssue(id, title, responsible, description, severity, status){
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };
    return this.http.post(`${this.uri}/issues/update/${id}`,issue);
  }
  //This function deletes IssueService
  deleteIssue(id){
    return this.http.get(`${this.uri}/issues/delete/${id}`);
  }
}
