import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { Design, Kitchen } from 'src/app/models/design';
import { DesignService } from 'src/app/services/design.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  config: SwiperOptions = {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };

  designs: Design[] = []
  kitchens: Kitchen[] = []
  private designId$ = new BehaviorSubject<number>(0)

  constructor(private designService: DesignService) { }

  ngOnInit(): void {
    this.getDesings()

    this.designId$.subscribe(res => this.kitchens = this.designs[res].kitchens)
    console.log(this.kitchens)
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

  getId(id: string){
    this.designId$.next(Number(id))
  }

}
