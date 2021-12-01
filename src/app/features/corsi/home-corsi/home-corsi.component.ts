import { Component, OnInit } from '@angular/core';
import { CorsiService } from '../corsi.service';
import { Course } from '../../models/Course';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home-corsi',
  templateUrl: './home-corsi.component.html',
  styleUrls: ['./home-corsi.component.scss']
})
export class HomeCorsiComponent implements OnInit {

  corsi: Course[] = [];
  banners: Course[] = [];

  searchForm: FormControl = new FormControl('');

  constructor(
    private corsiService: CorsiService
  ) { }

  ngOnInit(): void {

    this.getCorsi();

    this.getBanners();

    this.insertAds();

    this.searchForm.valueChanges.subscribe((val: string) => {
      this.corsiService.searchCorsi(val)
        .subscribe(res => {
          this.corsi = res;
        });
    });

  }

  getCorsi(): void {

    this.corsiService.getCorsi()
      .subscribe(res => {
        this.corsi = res;
      });

  }

  getBanners(): void {

    this.corsiService.getBanners()
      .subscribe(res => {
        this.banners = res;
      });

  }

  insertAds(): void {

    let bannerIndex = 0;

    for (let i = 2; i < this.corsi.length; i += 3) {

      this.corsi.splice(i, 0, this.banners[bannerIndex]);

      bannerIndex++;

    }

    console.log(this.corsi);

  }

}
