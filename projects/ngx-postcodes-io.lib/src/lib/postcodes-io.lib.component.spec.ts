import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PostcodesIoTsLibComponent } from './postcodes-io.lib.component'

describe('PostcodesIoTsLibComponent', () => {
  let component: PostcodesIoTsLibComponent
  let fixture: ComponentFixture<PostcodesIoTsLibComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostcodesIoTsLibComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PostcodesIoTsLibComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
