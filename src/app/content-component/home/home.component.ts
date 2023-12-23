import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    slides: string [] = [
      `Do you need a simple and effective way to organize your notes, tasks, and to-do lists?
       Do you want to access your lists from any device and sync them across all your platforms?`,
      `If you answered yes to any of these questions, 
      then El Nota is the app for you. El Nota is a web application 
      that lets you create, edit, and manage your notes/to-do lists with ease.`,
      `El Nota is more than just a note-taking app. 
      It’s a productivity tool that helps you stay on top of your personal and professional projects. 
      Whether you need to jot down a shopping list, prepare a presentation, plan a trip, or write a journal entry, 
      El Nota can help you do it all.`,
      `El Nota is the ultimate note-taking app for anyone who wants to keep track of their life. 
      Try it today and see how it can make your life easier and more organized.`
    ]
    i=0;
}
