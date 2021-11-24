import { Component, OnInit } from '@angular/core';
import { ModalCorsoComponent } from 'src/app/features/corsi/modal-corso/modal-corso.component';
import { MatDialog } from '@angular/material/dialog';
import { CorsiService } from 'src/app/features/corsi/corsi.service';
import { Corso } from 'src/app/features/models/Corso';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  corsi: Corso[] = [];

  constructor(
    private dialog: MatDialog,
    private corsiService: CorsiService
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {

    const modalCorso = this.dialog.open( ModalCorsoComponent, { data: {id: null} } );

    modalCorso.afterClosed().subscribe(() => {
      this.getCorsi();
    });

  }

  getCorsi(): void {

    this.corsiService.getCorsi()
      .subscribe(res => {
        this.corsi = res;
      });

  }

}
