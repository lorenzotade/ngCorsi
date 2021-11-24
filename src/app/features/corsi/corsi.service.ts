import { Injectable } from '@angular/core';
import { corsi_db, lessons_db } from 'src/db';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Corso } from '../models/Corso';
import { Lesson } from '../models/Lesson';

@Injectable({
  providedIn: 'root'
})
export class CorsiService {

  corsi: Corso[] = [];
  lessons: Lesson[] = [];

  private corsiSubject = new BehaviorSubject<Corso[]>(this.corsi);

  corsi$ = this.corsiSubject.asObservable();

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
      .subscribe(res => {
        this.lessons = res;
      });

   }

  getCorsi(): Observable<Corso[]> {

    return of(corsi_db);

  }

  getAllLessons(): Observable<Lesson[]> {

    return of(lessons_db);

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

  getCourseLessons(id: number): Observable<Lesson[]> {

    const courseLessons = this.lessons.filter(lesson => {
      return lesson.id_course === id;
    });

    return of(courseLessons);

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
