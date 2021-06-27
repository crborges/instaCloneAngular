import { Component, OnInit,ViewChild } from '@angular/core';
import {Bd} from '../../bd.service'
import firebase from 'firebase';
import { Postagem } from 'src/app/shared/postagem.model';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {
  public email : string =''
  public publicacoes: Postagem[]=[]
  constructor(private banco: Bd) { }


  ngOnInit(): void { 
    firebase.auth().onAuthStateChanged((user)=>{
      this.email =''+user?.email
      this.atualizarTimeLine()
   })
 }

  public atualizarTimeLine(): void{
    this.publicacoes=this.banco.getPosts(this.email);
      //.then((publicacoes :Postagem[] )=>{console.log(publicacoes)         this.publicacoes=publicacoes      })
  }

}
