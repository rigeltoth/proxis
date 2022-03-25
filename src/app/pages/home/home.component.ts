import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Design } from 'src/app/models/design';
import { DesignService } from 'src/app/services/design.service';

import Swiper, { SwiperOptions } from "swiper";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  config: SwiperOptions = {
    direction: 'vertical', 
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }, 
    loop: true,
    spaceBetween: 35,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
  };  

  designs: Design[] = [] 
  constructor(private designService: DesignService) { }

  ngOnInit(): void {
    this.getDesings()
  }

  getDesings(){
    const url_api = 'https://proxising.com/casalux/'

    this.designService.getDesign().pipe(
      map(res => {

        res.forEach(res => {
          res.image = url_api.concat(res.image.slice(3)) ,
          res.kitchens.forEach(res => {
            res.photos.forEach(res => {
              res.image = url_api.concat(res.image.slice(3))
            })
          })
        })

        return res
      })
    ).subscribe(res =>{ this.designs = res },)
  }

}