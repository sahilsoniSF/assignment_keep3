import { Component } from '@angular/core';
import { FormControl ,FormGroup,FormBuilder, Validators} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = new FormControl();
    password = new FormControl();
    submitMessage:string;
    // loginform:FormGroup;
    loginUser:User;

    constructor(private formBuilder:FormBuilder,
                private authService:AuthenticationService,
                private routeService:RouterService)
    {
      // this.loginform=this.formBuilder.group({
      //   username:"",
      //   password:""
      // })
    }
    loginform=new FormGroup(
      {
        username:new FormControl("",[Validators.required,Validators.minLength(3)]),
        password:new FormControl("",[Validators.required,Validators.minLength(5)])
      }
    )

    loginSubmit() {
      this.loginUser=this.loginform.value;
      this.authService.authenticateUser(this.loginUser)
      .subscribe(data=>{
        this.authService.setBearerToken(data["token"]);
        this.routeService.routeToDashboard();
      },
      err=>{
        if(err.error !=undefined)
        { 
        this.submitMessage=err.error.message;
        }
        else
        this.submitMessage=err.message;        
      })
    }

    getUserName(){
      return this.loginform.get('username');
    }
    getPassword(){
      return this.loginform.get('password');
    }
}
