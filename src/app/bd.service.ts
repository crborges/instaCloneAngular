import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { promise } from 'selenium-webdriver';
import {Progresso} from './progresso.service'
import { Postagem } from './shared/postagem.model';

@Injectable({   providedIn: 'root'})
export class Bd {



    constructor (private progresso :Progresso){}

    public publicar(postagem: Postagem): void{
        firebase.database().ref(`publicacoes/${btoa(postagem.email)}`).push(postagem)
        .then((resposta: any)=>{
            let nome_imagem=  resposta.key
            firebase.storage().ref()
            .child(`imagens/${nome_imagem}`)
            .put(postagem.imagem)
            .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot: any)=>{
                        this.progresso.status='andamento'
                        this.progresso.estado=snapshot
                    },//acao a ser executada durante a execução do metodo
                    (error)=>{
                        this.progresso.status='erro'
                    }, //o que fazer se der erro
                    ()=>{ 
                        this.progresso.status='concluido'
                    } //o que fazer quando tudo acabar
            )
        })
    }



    public getPosts(email: string): Postagem[]{
            let publicacoes : Postagem[] =[]


            setTimeout(() => {
                

                firebase.database().ref(`publicacoes/${btoa(email)}`)
                .once('value')
                .then((snapshot: any)=>{
                    snapshot.forEach((childSnapshot: any)=>{
                        let publicacao: Postagem = new Postagem()
                        publicacao.conteudo=childSnapshot.val().conteudo
                        publicacao.email=childSnapshot.val().email
                        publicacao.titulo=childSnapshot.val().titulo
                        publicacao.nome ='crrborges'
                        //publicacao.nome=childSnapshot.val().nome

                        // vai buscar o noem do cara    
                        firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                            .orderByKey()
                            .once("value")
                            .then((snapshot: any) => {
                                publicacao.nome = snapshot.val().nomeCompleto
                            })

                        firebase.storage()
                            .ref()
                            .child(`imagens/${childSnapshot.key}`)
                            .getDownloadURL()
                            .then((url: string)=>{
                                publicacao.imagem=url
                                publicacoes.push(publicacao)
                            })
                    })
                   
                }) 
            }, 1000);

            return publicacoes.reverse()

    }







}