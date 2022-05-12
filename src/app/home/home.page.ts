import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChildren('input') inputs: QueryList<ElementRef>;

  size: number;
  min = 2;
  max = 60;
  f = true;
  a: number[] = [];
  f2=false;
  b: number[] = [];
  runtime: number;

  constructor() {}

  getSize(val) {
    this.size = val.srcElement.valueAsNumber;
    if (this.size < this.min || this.size > this.max) {
      this.f = true;
      return;
    }
    this.f = false;
    setTimeout(() => {
      this.inputs.toArray()[0].nativeElement.focus();
    }, 120);
  }

  onWrite(index) {
    const b = this.inputs.toArray();
    if (this.isInputClean(index, b)) {
      b[index].nativeElement.disabled = true;
      b[index + 1].nativeElement.disabled = false;
      b[index + 1].nativeElement.focus();
    }

    if (
      index === this.size - 1 &&
      !isNaN(Number(b[index].nativeElement.value)) &&
      b[index].nativeElement.value.trim() !== ''
    ) {
      b[index].nativeElement.disabled = true;
      this.f2 = true;
    }
  }

  whichSort(num){
    const len = this.a.length-1;
    this.quickSort(this.a, 0, len, num);
  }

  cleanAll(){
    this.a = [];
    this.f = true;
    this.f2 = false;
    this.size = undefined;
    this.b = [];
  }

  space() {
    if (this.isSizeOkay()) {
      for (let i = 0; i < this.size; i++) {
        this.b[i] = i;
      }
    }
    return this.b;
  }

  isSizeOkay(): boolean {
    return this.size <= this.max && this.size >= this.min;
  }

  quickSort(arr, start, end, n) {
    const p0=performance.now();
    let p;

    if(arr.length > 1){
      p = this.partition(arr, start, end, n);

      if(start < p-1){
        this.quickSort(arr, start, p - 1, n);
      }

      if(p < end){
        this.quickSort(arr, p, end, n);
      }

    }
    this.runtime = Number((performance.now() - p0).toPrecision(2));
    return arr;
  }

  partition(arr, start, end, n) {
    const pivot = arr[Math.floor((start+end)/2)];
    let i = start;
    let j = end;

    while(i<=j){
      if(n === 0){
        while(arr[i]< pivot){
          i++;
        }

        while(arr[j] > pivot){
          j--;
        }
      } else {
        while(arr[i]> pivot){
          i++;
        }

        while(arr[j] < pivot){
          j--;
        }
      }

      if( i <= j ){
        this.swap(arr, i, j);
        i++;
        j--;
      }

    }

    return i;

  }

  swap(arr, i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  isInputClean(idx, el): boolean {
    return (
      !isNaN(Number(el[idx].nativeElement.value)) &&
      idx < this.size - 1 &&
      el[idx].nativeElement.value.trim() !== ''
    );
  }
}
