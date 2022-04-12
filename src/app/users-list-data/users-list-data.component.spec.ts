import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersListServiceMock } from '../shared/mock-test/mock-service/users-list-service-mock';
import { UsersListService } from './services/users-list.service';

import { UsersListDataComponent } from './users-list-data.component';

describe('UsersListDataComponent', () => {
  let component: UsersListDataComponent;
  let fixture: ComponentFixture<UsersListDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [UsersListDataComponent],
      providers: [
        {
          provide: UsersListService,
          useClass: UsersListServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsersData() from service in getUsersData()', inject([UsersListService], (usersListService: UsersListService) => {
    const getUsersData = jest.spyOn(usersListService, 'getUsersData');
    const displayInitialData = jest.spyOn(component, 'displayInitialData')
    component.getUsersData();
    expect(getUsersData).toHaveBeenCalled();
    expect(displayInitialData).toHaveBeenCalled();
  }));


  it('should call getUsersData and addDataFilters in ngOnInit()', () => {
    const getUsersData = jest.spyOn(component, 'getUsersData');
    const addDataFilters = jest.spyOn(component, 'addDataFilters')
    component.ngOnInit();
    expect(getUsersData).toHaveBeenCalled();
    expect(addDataFilters).toHaveBeenCalled();
  });

  it('should set allDataSource=dataSource  in displayInitialData()', () => {
    component.displayInitialData('');
    expect(component.allDataSource).toEqual(component.dataSource);
  });

  it('should reset filters in resetFilters()', () => {
    component.resetFilters();
    expect(component.dataSource).toEqual(component.allDataSource);
    expect(component.typeFilters[0].defaultValue).toEqual('All');
    expect(component.typeFilters[1].defaultValue).toEqual('All')
  });

});
