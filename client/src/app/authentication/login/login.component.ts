import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public form: {
		email: string,
		password: string
	};

  constructor(	private _authService: AuthenticationService	) {
  	this.form = {email: "", password:""};
 }

  ngOnInit(): void {
  }

  //Method to sumbit the formdata
  public onSubmit(form){
  	console.log(form);
  	this._authService.test().subscribe(
  		(restult) =>{
  			 console.log(restult);
  			},	
  		(error) => {
  			console.log(<any>error);
  		}
  	)
  }

}
