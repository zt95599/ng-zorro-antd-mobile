import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WingBlankModule } from './wing-blank.module';

describe('WingBlank', () => {
  let component: TestWingBlank;
  let fixture: ComponentFixture<TestWingBlank>;
  let WingBlankEle;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WingBlankModule],
      declarations: [TestWingBlank]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWingBlank);
    component = fixture.componentInstance;
    WingBlankEle = fixture.debugElement.query(By.css('WingBlank'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // !!obj
  });

  it('should size work', () => {
    expect(WingBlankEle.nativeElement.classList.contains('am-wingblank-md')).toBe(false);
    component.size = 'md';
    fixture.detectChanges();
    expect(WingBlankEle.nativeElement.classList.contains('am-wingblank-md')).toBe(true);
  });
});

@Component({
  selector: 'test-wing-blank-child',
  template: `
  <div>
    <WingBlank [size]="size" ></WingBlank>
  </div>
 `
})
export class TestWingBlank {
  size = 'xs'; // 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  constructor() {}
}
