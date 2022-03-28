import { AfterViewChecked, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Design, Kitchen, Photo } from 'src/app/models/design';
import { DesignService } from 'src/app/services/design.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  configkit: SwiperOptions = {
    // loop: true,
    effect: 'coverflow',
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 90,
      modifier: 5,
      slideShadows: true
    },
    centeredSlides: true,
    slidesPerView: 2
  };
  
  configPhotos: SwiperOptions = {
    // direction: 'vertical',
    // loop: true,
    effect: 'fade',
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    spaceBetween: 30,
    slidesPerView: 5
  };

  @ViewChildren('view') public view!: QueryList<ElementRef> ;

  designs: Design[] = []
  kitchens: Kitchen[] = []
  photos: Photo[] = []

  private designId$ = new Subject<number>()
  private kitchenId$ = new Subject<number>()
  
  designid: number = 0 
  kitchenid: number = 0 
  seemore: boolean = false
  
  constructor(
    private designService: DesignService,
    private render2: Renderer2) {}

    
  ngAfterViewChecked(): void {
    this.designId$.subscribe(res => this.designid = res)
    this.ngView()
  }
  
  ngOnInit(): void {
    this.getDesings()
    
    this.designId$.subscribe(res => {
      this.kitchens = this.designs[res].kitchens
    })
    
    this.kitchenId$.subscribe(res => {
      this.photos = this.kitchens[res].photos
    })
  }

  ngView(){

      const viewA = this.view.toArray()
      const viewB = viewA[this.designid].nativeElement
      viewA.map( res => {
        this.render2.removeClass(res.nativeElement, 'scale-75')
      })
  
      this.render2.addClass(viewB, 'scale-75')
  }

  getDesings(){
    const url_api = 'https://proxising.com/casalux/'

    this.designService.getDesign().pipe(
      map(res => {

        res.forEach(res => {
          res.image = url_api.concat(res.image.slice(3)) ,
          res.kitchens.forEach(res => {
            res.photos.forEach(res => { res.image = url_api.concat(res.image.slice(3))})
          }),
          res.contents.forEach(res => {
            res.image = url_api.concat(res.image.slice(3))
          })
        })
        return res
      })
      ).subscribe(res =>{ 
        this.designs = res
        this.designId$.next(0)
        this.kitchenId$.next(0)
    },)
  }

  getIdKit(id: number){
    this.designId$.next(id)
  }

  getIdPhoto(id: number){
    this.kitchenId$.next(id)
  }

  toggleSeeMore(){
    if (this.seemore)
      this.seemore = false
    else 
      this.seemore = true

  }

}
