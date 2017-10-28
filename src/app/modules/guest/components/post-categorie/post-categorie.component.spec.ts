import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategorieComponent } from './post-categorie.component';

describe('PostCategorieComponent', () => {
  let component: PostCategorieComponent;
  let fixture: ComponentFixture<PostCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
