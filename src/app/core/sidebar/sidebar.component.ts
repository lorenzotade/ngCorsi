import { Component, OnInit } from '@angular/core';
import { CorsiService } from 'src/app/features/corsi/corsi.service';
import { Corso } from 'src/app/features/models/Corso';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  corsi: Corso[] = [];

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
