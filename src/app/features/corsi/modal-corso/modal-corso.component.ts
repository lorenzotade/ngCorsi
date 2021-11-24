import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Corso } from '../../models/Corso';
import { CorsiService } from '../corsi.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-corso',
  templateUrl: './modal-corso.component.html',
  styleUrls: ['./modal-corso.component.scss']
})
export class ModalCorsoComponent implements OnDestroy {

  corso?: Partial<Corso>;

  detailsSub?: any;

  formCorso = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl('')
  });

  constructor(

    private corsiService: CorsiService,
    private dialogRef: MatDialogRef<ModalCorsoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number | null}

  ) {

    if (this.data.id) {
      this.getDetails(this.data.id);
    } else {
      this.composeCorso();
    }

  }

  onSubmit(): void {

    const updatedCorso: Corso = {
      ...this.corso,
      ...this.formCorso.value
    };

    this.corsiService.updateCorso(updatedCorso);

    this.dialogRef.close();

  }

  getDetails(id: number): void {

    this.detailsSub = this.corsiService.getDetails(id)
      .subscribe(res => {
        this.corso = res;
        this.formCorso.setValue({
          title: this.corso.title,
          description: this.corso.description,
          image: this.corso.image
        });
      });

  }

  composeCorso(): void {

    this.corsiService.getCorsi()
      .subscribe(res => {
        const newID = res.length + 1;
        this.corso = {
          last_update: new Date(Date.now()).toLocaleString().split(',')[0],
          avg_votes: 0,
          id: newID
        };
      });

  }

  ngOnDestroy(): void {

    this.detailsSub && this.detailsSub.unsubscribe();

  }

}

