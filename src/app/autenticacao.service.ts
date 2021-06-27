import { Usuario } from "./shared/usuario.model";
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import{Router} from '@angular/router'


@Injectable({   providedIn: 'root'})
export class AutenticacaoService {
    
    public tokenId: string=''
    constructor(private router: Router){}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        // console.log('Chegamos até o serviço: ', usuario)

       return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                /* Vamos somente gravar o e-mail do usuário, não
                queremos salvar no path usuario_detalhe a senha dele,
                logo, usaremos o delete */
                
                /* Estamos salvando os dados complementares do usuário no path usuario_detalhe
                em formato de base64, pela função nativa btoa do JS */
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)
            })
            .catch((error: Error) => {
                console.log(error)
            })
    }

    public logarUsuario(usuario: string, senha: string): void{
        firebase.auth().signInWithEmailAndPassword(usuario,senha)
        .then((response: any)=>{
            firebase.auth().currentUser?.getIdToken()
                .then((idToken: string)=>{
                    this.tokenId=idToken
                    localStorage.setItem('token',this.tokenId)
                    this.router.navigate(['/home'])
                })
        })
        .catch((error: Error) => {console.log(error)})
    }



    public autenticado(): boolean {
        if(localStorage.getItem('token') === null) { this.router.navigate(['/']) }

        if(this.tokenId !== '' || localStorage.getItem('token') !== null){
            return true
        }
        else {
            return false
        }
       
    }


/*
    public autenticado(): boolean{ 

        if(this.tokenId === '' || localStorage.getItem('token') === null) { this.router.navigate(['/'])  }

        if(this.tokenId !== '' || localStorage.getItem('token') !== null){
            return true
        }
        else {
            return false
        }
    }
*/
    public logout(): void{
        console.log('deslogando user')
        firebase.auth().signOut()
            .then(()=>{
                localStorage.removeItem('token') 
                this.tokenId=''
                this.router.navigate(['/'])
            })
       
    }



}