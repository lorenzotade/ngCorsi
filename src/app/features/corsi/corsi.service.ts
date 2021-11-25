import { Injectable } from '@angular/core';
import { banner_db, corsi_db, lessons_db } from 'src/db';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';
import { Corso } from '../models/Corso';
import { Lesson } from '../models/Lesson';
import { Banner } from '../models/Banner';

@Injectable({
  providedIn: 'root'
})
export class CorsiService {

  corsi: Corso[] = [];
  lessons: Lesson[] = [];
  banners: Banner[] = [];

  private corsiSubject = new BehaviorSubject<Corso[]>(this.corsi);
  private lezioniSubject = new BehaviorSubject<Lesson[]>(this.lessons);

  corsi$ = this.corsiSubject.asObservable();
  lessons$ = this.lezioniSubject.asObservable();

  constructor() {

    this.getCorsi()
      .pipe(
        tap(
          corsi => {
            this.corsiSubject.next(corsi);
          }
        )
      )
      .subscribe(res => {
        this.corsi = res;
      });

    this.getAllLessons()
      .pipe(
        tap(
          lessons => {
            this.lezioniSubject.next(lessons);
          }
        )
      )
      .subscribe(res => {
        this.lessons = res;
      });

    this.getBanners()
      .subscribe(res => {
        this.banners = res;
      });

   }

  getCorsi(): Observable<Corso[]> {

    return of(corsi_db);

  }

  getDetails(id: number): Observable<Corso> {

    return this.corsi$.pipe(
        map(corsi => corsi.filter(corso => corso.id === id)[0])
      );

  }

  getLatestCorsi(num: number = 3): Observable<Corso[]> {

    return this.corsi$.pipe(
      map(corsi => corsi.slice(-num))
    );

  }

  getNumCorsi(): Observable<number> {

    return this.corsi$.pipe(
      map(corsi => corsi.length)
    );

  }

  searchCorsi(search: string): Observable<Corso[]> {

    return this.corsi$.pipe(
      map(
        corsi => corsi.filter(
          corso => corso.title.toLowerCase().includes(search.toLowerCase())
        )
      )
    );

  }

  getBanners(): Observable<Banner[]> {

    return of(banner_db);

  }

/*   getBannerCorsi(): Observable<any> {

    const corsiBanner: any[] = [];

    for (let i = 1; i < this.corsi.length; i+2) {
      this.banners.forEach(banner => {
        corsiBanner.push(banner);
      });
    }

    return of(corsiBanner);

  } */

  getAvgLessons(): Observable<number> {

    return this.lessons$.pipe(
      mergeMap(lessons => this.getNumCorsi()
        .pipe(
          map(
            numCorsi => lessons.length / numCorsi
          )
        )
      )
    );

  }

  getAllLessons(): Observable<Lesson[]> {

    return of(lessons_db);

  }

  getCourseLessons(id: number): Observable<Lesson[]> {

    return this.lessons$.pipe(
      map(
        lessons => lessons.filter(lesson => lesson.id_course === id)
      )
    );

  }

  updateCorso(corso: Corso): void {

    const index = this.corsi.findIndex(item => item.id === corso.id);

    if (index !== -1) {
      this.corsi[index] = corso;
    } else {
      this.corsi.push(corso);
    }

    this.corsiSubject.next(this.corsi);

  }

}
