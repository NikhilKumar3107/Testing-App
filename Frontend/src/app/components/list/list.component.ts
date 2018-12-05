import { Component, OnInit } from '@angular/core';
//Importing the router Component to route the other components
import { Router } from '@angular/router';
//importing the MatTable from material
import { MatTableDataSource } from '@angular/material';


import { Issue } from '../../issue.model';
//Importing the services from the Issue services
import { IssueService } from '../../issue.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  //holds the values coming from Backend
  issues: Issue[];
  //This is for columns for Mat-Table
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];

  //initializing the constructor
  constructor(private issueService: IssueService, private router: Router ) {}

  ngOnInit() {
    this.fetchIssues();
  }

  // Defining fetch Issues
  fetchIssues() {
    this.issueService
      .getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('Data requested ...');
        console.log(this.issues);
      });
  }
  //Routing the Edit button
  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }
  //Directly connecting the delete button to Issue service
  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

  }
