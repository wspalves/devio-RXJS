import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'devio-RXJS';

  ngOnInit(): void {
    this.myPromise('Js')
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));

    this.myObservable('Wesley').subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error),
    });
  }

  myPromise(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (name == 'Wesley') {
        setTimeout(() => {
          resolve('Promise - Seja bem vindo, Wesley');
        }, 1000);
      } else {
        reject('Promise - Você não é o Wesley!');
      }
    });
  }

  myObservable(name: string): Observable<string> {
    return new Observable((subscriber) => {
      if (name == 'Wesley') {
        subscriber.next('Observable - Olá, sr. Wesley!');
      } else {
        subscriber.error('Observable - Voce não é o Wesley!');
      }

      subscriber.next('Observable - Olá, Wesley!');
      subscriber.next('Observable - Olá dnv!');
      setTimeout(() => {
        subscriber.next('Observable - Olá com delay!');
      }, 1000);
    });
  }
}
