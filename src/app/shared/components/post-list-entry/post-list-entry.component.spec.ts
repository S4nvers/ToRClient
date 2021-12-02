import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListEntryComponent } from './post-list-entry.component';

describe('PostListEntryComponent', () => {
  let component: PostListEntryComponent;
  let fixture: ComponentFixture<PostListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
