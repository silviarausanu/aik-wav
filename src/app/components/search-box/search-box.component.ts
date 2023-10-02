import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {

  @Output()
  query: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder
  ) {}

  searchControl: FormControl = new FormControl('');
  form: FormGroup = this.formBuilder.group({
    query: this.searchControl,
  });

  search() {
    this.query.emit(this.searchControl.value);
  }
}
