import { Component } from '@angular/core';
import { HistoireAccueil } from 'src/ameInterfaces';

@Component({
  selector: 'app-notre-histoire',
  templateUrl: './notre-histoire.component.html',
  styleUrls: ['./notre-histoire.component.scss']
})
export class NotreHistoireComponent {

  histoires: HistoireAccueil[] = [
    {
      id:1,
      histoire:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam quisque id diam vel quam elementum pulvinar.
      Id velit ut tortor pretium viverra. Commodo elit at imperdiet dui accumsan sit. Magna etiam tempor orci eu lobortis. Vel quam elementum pulvinar etiam non quam lacus.
      Et pharetra pharetra massa massa ultricies mi. Diam maecenas sed enim ut sem viverra aliquet. Enim praesent elementum facilisis leo vel fringilla est. Enim nulla aliquet
      porttitor lacus luctus accumsan tortor posuere ac. Commodo ullamcorper a lacus vestibulum sed arcu non odio. Amet dictum sit amet justo donec. Magna eget est lorem
      ipsum dolor sit.`
    },
  ];

}
