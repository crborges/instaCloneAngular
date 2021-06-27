import { Component,OnInit } from '@angular/core';
import  firebase from 'firebase/app'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'instaClone';


  ngOnInit(): void{

    var firebaseConfig = {
      apiKey: "AIzaSyCAQXaMx1eIyRzhVtw14QP6KRqYjyq1uRs",
      authDomain: "instaclone-3b7e9.firebaseapp.com",
      projectId: "instaclone-3b7e9",
      storageBucket: "instaclone-3b7e9.appspot.com",
      messagingSenderId: "519155372743",
      appId: "1:519155372743:web:7461df40b886db3c15e4e2",
      measurementId: "G-B92GDM04MN"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }






  

}
