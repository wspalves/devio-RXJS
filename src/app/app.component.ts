import { Component, OnInit } from '@angular/core';
import { Observable, UnsubscriptionError } from 'rxjs';
import { User } from './user';

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
      complete: () => console.log('Completed!'),
    });

    const observer = {
      next: (value: any) => console.log('Sucess: ', value),
      error: (error: any) => console.log('Erro: ', error),
      complete: () => console.log('End.'),
    };

    const obs = this.myObservable('Wesley');
    obs.subscribe(observer);

    const userObs = this.userObservable('Admin', 'admin@g.com');
    const userSubs = userObs.subscribe(observer);

    setTimeout(() => {
      userSubs.unsubscribe();
    }, 3000);
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

      subscriber.complete();
    });
  }

  userObservable(name: string, email: string): Observable<User> {
    return new Observable((subscriber) => {
      if (name == 'Admin') {
        let user = new User(name, email);

        setTimeout(() => {
          subscriber.next(user);
        }, 1000);

        setTimeout(() => {
          subscriber.next(user);
        }, 2000);

        setTimeout(() => {
          subscriber.next(user);
        }, 3000);

        setTimeout(() => {
          subscriber.next(user);
        }, 4000);

        setTimeout(() => {
          subscriber.complete();
        }, 5000);
      }
    });
  }
}
