import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectStatusOptions: string[] = ['Stable', 'Critical', 'Finished'];
  userForm: FormGroup;

  ngOnInit(){
    this.userForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required/*, this.projectNameForbiddenValidator*/], 
          this.asyncProjectNameForbiddenValidator),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl()
    })
  }

  onSubmit(){
    console.log(this.userForm.value);
  }

  // projectNameForbiddenValidator(control: FormControl): {[s: string]: boolean}{
  //   if(control.value === 'Test'){
  //     return {'nameIsForbidden': true};
  //   }
  //   return null;
  // }

  asyncProjectNameForbiddenValidator(control: FormControl): Observable<any> | Promise<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'Test'){
          resolve({'nameIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
