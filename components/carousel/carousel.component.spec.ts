import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from './carousel.module';
import { dispatchTouchEvent } from '../core/testing';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: TestCarouselComponent;
  let fixture: ComponentFixture<TestCarouselComponent>;
  let carouselEle;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestCarouselComponent],
      imports: [CarouselModule, BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCarouselComponent);
    component = fixture.componentInstance;
    carouselEle = fixture.debugElement.query(By.css('carousel')).nativeElement;
    fixture.detectChanges();
  });

  it ('should taouchstart work', () => {
    dispatchTouchEvent(carouselEle, 'touchstart', 0, 0);
    fixture.detectChanges();
    dispatchTouchEvent(carouselEle, 'touchmove', 230, 0);
    fixture.detectChanges();
    dispatchTouchEvent(carouselEle, 'touchend', 230, 0);
    fixture.detectChanges();
    dispatchTouchEvent(carouselEle, 'touchcancel');
  });

  it ('should taouchstart work', () => {
    component.autoplay = false;
    fixture.detectChanges();
    dispatchTouchEvent(carouselEle, 'touchstart', 300, 0);
    fixture.detectChanges();
    dispatchTouchEvent(carouselEle, 'touchmove', 0, 0);
    fixture.detectChanges();
    dispatchTouchEvent(carouselEle, 'touchend', 0, 0);
    fixture.detectChanges();
    dispatchTouchEvent(carouselEle, 'touchcancel');
  });

  it ('should move work', () => {
    component.carouselComponent.selectedIndex = 0;
    expect(component.carouselComponent.carousel(-1));
    component.carouselComponent.selectedIndex = 1;
    expect(component.carouselComponent.carousel(-1));
    expect(component.carouselComponent.setSlideStyles(0, -1));
    expect(component.carouselComponent.setSlideStyles(1, -1));
    expect(component.carouselComponent.setSlideStyles(2, -1));
    expect(component.carouselComponent.swipeDirection(1, 2, 1, 2));
    expect(component.carouselComponent.swipeDirection(2, 1, 2, 1));
  });

  it ('should data work', () => {
    component.state.data = ['TekJlZRVCjLFexlOCuWn'];
    fixture.detectChanges();
    expect(carouselEle.querySelector('.slider-list').childElementCount).toBe(1);
  });

  it('should create', fakeAsync(() => {
    tick(10);
    expect(component).toBeTruthy();
  }));
});

@Component({
  selector: 'test-carousel',
  template: `
  <Carousel
    [autoplay]="autoplay"
    [infinite]="true"
    [vertical]="false"
    [dragging]="dragging"
    (beforeChange)="beforeChange($event)"
    (afterChange)="afterChange($event)"
    >
      <CarouselSlide *ngFor="let item of state.data;let i = index">
        <div style="display: inline-block; width: 100%;" [ngStyle]="{'height': state.imgHeight}">
          <img src="https://zos.alipayobjects.com/rmsportal/{{item}}.png" style="width: 100%;"/>
        </div>
      </CarouselSlide>
  </Carousel>
  <Carousel
    [autoplay]="autoplay"
    [infinite]="true"
    [vertical]="true"
    [dragging]="dragging"
    [selectedIndex]="1"
    (beforeChange)="beforeChange($event)"
    (afterChange)="afterChange($event)"
    >
      <CarouselSlide *ngFor="let item of state.data;let i = index">
        <div style="display: inline-block; width: 100%;" [ngStyle]="{'height': state.imgHeight}">
          <img src="https://zos.alipayobjects.com/rmsportal/{{item}}.png" style="width: 100%;"/>
        </div>
      </CarouselSlide>
  </Carousel>
  `
})
export class TestCarouselComponent {
  autoplay = true;
  dragging = true;
  colors = [];
  data = [];
  state = {
    data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI' , 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    imgHeight: '184px'
  };
  @ViewChild(CarouselComponent) carouselComponent: CarouselComponent;
  dataOutPut(event) {
    this.data = event;
  }

  clickEvent(event) {
    console.log(event);
  }

  beforeChange(event) {
    console.log('slide ' + event.from + ' to ' + event.to);
  }

  afterChange(event) {
    console.log('slide to ' + event);
  }
}
