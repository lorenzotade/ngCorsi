import { Component, OnInit } from '@angular/core';
import { CorsiService } from 'src/app/features/corsi/corsi.service';
import { Course } from 'src/app/features/models/Course';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  corsi: Course[] = [];

  constructor(
    private corsiService: CorsiService
  ) { }

  ngOnInit(): void {

    this.getLatestCourses();

  }

  getLatestCourses(): void {

    this.corsiService.getLatestCorsi()
      .subscribe(res => {
        this.corsi = res;
      });

  }

}
