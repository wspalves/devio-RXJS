import { Component, OnInit } from '@angular/core';

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
  }

  myPromise(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (name == 'Wesley') {
        setTimeout(() => {
          resolve('Seja bem vindo, Wesley');
        }, 1000);
      } else {
        reject('Você não é o Wesley!');
      }
    });
  }
}
