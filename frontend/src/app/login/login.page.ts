import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import axios from 'axios';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  usuario : any = {};

  constructor(private toastController: ToastController,
   private router: Router) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //this.message = this.data.getMessageById(parseInt(id, 10));
    axios.get("http://localhost:3000/user/" + id)
    .then( result => {
      if (result.data.success == true) {

        if( result.data.usuario != null){
          this.usuario = result.data.usuario;
        }else{
          this.usuario = {};
        }
       
      } else {
        console.log(result.data.error);
      }
      
    }).catch(error => {
      console.log(error.message);
    })
  }

  ionViewWillEnter(): void {
    // verificar si es que mi el usuario esta logeado
    let token = localStorage.getItem("token");

    localStorage.removeItem("token");
    if(token){
      this.router.navigate(["/home"]);
    }
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
    

    
  }

  loginUser(){
    console.log("usuario", this.usuario);
    var data = {
     
      email: this.usuario.email,
      password: this.usuario.password

    }

    axios.post("http://localhost:3000/user/login" , data)
    .then(  async result => {
      if (result.data.success == true) {
        this.presentToats ("Usuario Logeado!!!");
        localStorage.setItem("token", result.data.token);
        
          this.router.navigate(["/home"]);
      } else {
        this.presentToats (result.data.error );
        
      }
      
    }).catch( async error => {
      this.presentToats (error.message.data.error );
    })
  }

  async presentToats (message : string){
    const toast = await this.toastController.create({
      message:message,
      duration: 1500,
      position: 'bottom',
      });

    await toast.present();
  };

  logoutUser(){
    console.log("usuario", this.usuario);
    var data = {
     
      email: this.usuario.email,
      password: this.usuario.password

    }

    axios.post("http://localhost:3000/user/logout" , data)
    .then(  async result => {
      if (result.data.success == true) {
        this.presentToats ("Usuario DesLogeado!!!");
        localStorage.setItem("token", result.data.token);
        
          this.router.navigate(["/login"]);
      } else {
        this.presentToats (result.data.error );
        
      }
      
    }).catch( async error => {
      this.presentToats (error.message.data.error );
    })
  }

  



}




