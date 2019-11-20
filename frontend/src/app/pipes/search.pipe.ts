import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(users: User[], search = ''): User[] {
    // .trim deletes all spaces
    if (!search.trim()) {
      return users
    }
    return users.filter( user => {
      return user.name.toLowerCase().includes(search.toLocaleLowerCase()) || 
      user.surname.toLowerCase().includes(search.toLocaleLowerCase())
    })
  }  

}
 