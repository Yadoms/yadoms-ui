import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PluginsComponent} from './plugins.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {PluginService} from '../../../core/plugin.service';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared';
import {PluginInstance, PluginInstances} from '../../../core/models/pluginInstances';
import {PluginCategory} from '../../../core/models/available-plugin';
import {MatInputModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

@Component({selector: 'yd-admin-page-header', template: ''})
class YdAdminPageMockComponent {
}

class MockPluginService extends PluginService {
  availablePluginInstances = new PluginInstances();

  constructor() {
    super(null);

    const pi1 = new PluginInstance();
    pi1.Id = 1;
    pi1.DisplayName = 'System';
    pi1.Type = 'System';
    pi1.Configuration = null;
    pi1.AutoStart = true;
    pi1.Category = PluginCategory.System;
    const pi2 = new PluginInstance();
    pi2.Id = 2;
    pi2.DisplayName = 'My fakePlugin instance';
    pi2.Type = 'dev-fakePlugin';
    pi2.Configuration = {
      'StringParameter': '',
      'BoolParameter': false,
      'IntParameter': 258,
      'DecimalParameter': 25.3,
      'EnumParameter': 'EnumValue2',
      'MySection': {
        'content': {
          'SubIntParameter': 65535,
          'SubStringParameter': ''
        }
      },
      'ConditionalParameter': ''
    };
    pi2.AutoStart = true;
    pi2.Category = PluginCategory.User;

    this.availablePluginInstances.plugins = [pi1, pi2];
  }

  public getAllPluginsInstance(): Promise<PluginInstances> {
    return Promise.resolve(this.availablePluginInstances);
  }
}


describe('PluginsComponent', () => {
  let component: PluginsComponent;
  let mockPluginService: MockPluginService;
  let fixture: ComponentFixture<PluginsComponent>;
  let mainElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, MatTableModule, MatInputModule, BrowserAnimationsModule, NoopAnimationsModule],
      declarations: [PluginsComponent, YdAdminPageMockComponent],
      providers: [{provide: PluginService, useClass: MockPluginService}]
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(PluginsComponent);
      component = fixture.componentInstance;
      mainElement = fixture.debugElement.nativeElement;
    });
  }));

  beforeEach(() => {
    mockPluginService = new MockPluginService();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header first', () => {
    expect(mainElement.querySelectorAll('*')[0].tagName.toLowerCase()).toEqual('yd-admin-page-header');
  });

  it('should display plugins instances', fakeAsync(() => {
    fixture.detectChanges();
    const pluginInstancesElements = mainElement.querySelectorAll('mat-row');
    expect(pluginInstancesElements.length).toEqual(2);
    let rows = pluginInstancesElements[0].querySelectorAll('mat-cell');
    expect(rows.length).toEqual(3);
    expect(rows[0].textContent).toEqual(mockPluginService.availablePluginInstances.plugins[0].DisplayName);
    expect(rows[1].textContent).toEqual(mockPluginService.availablePluginInstances.plugins[0].Type);
    expect(rows[2].textContent).toEqual(mockPluginService.availablePluginInstances.plugins[0].AutoStart.toString());

    rows = pluginInstancesElements[1].querySelectorAll('mat-cell');
    expect(rows.length).toEqual(3);
    expect(rows[0].textContent).toEqual(mockPluginService.availablePluginInstances.plugins[1].DisplayName);
    expect(rows[1].textContent).toEqual(mockPluginService.availablePluginInstances.plugins[1].Type);
    expect(rows[2].textContent).toEqual(mockPluginService.availablePluginInstances.plugins[1].AutoStart.toString());
  }));

  it('should display 2 instances with search "st"', fakeAsync(() => {
    component.availablePluginInstances.filter = 'st';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const pluginInstancesElements = mainElement.querySelectorAll('mat-row');
      expect(pluginInstancesElements.length).toEqual(2);
      expect(pluginInstancesElements[0].querySelectorAll('mat-cell')[0].textContent).toEqual(mockPluginService.availablePluginInstances.plugins[0].DisplayName);
      expect(pluginInstancesElements[1].querySelectorAll('mat-cell')[0].textContent).toEqual(mockPluginService.availablePluginInstances.plugins[1].DisplayName);
    });
  }));

  it('should display 1 instance with search "sta"', fakeAsync(() => {
    component.availablePluginInstances.filter = 'sta';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const pluginInstancesElements = mainElement.querySelectorAll('mat-row');
      expect(pluginInstancesElements.length).toEqual(1);
      expect(pluginInstancesElements[0].querySelectorAll('mat-cell')[0].textContent).toEqual(mockPluginService.availablePluginInstances.plugins[1].DisplayName);
    });
  }));

  it('should display 0 instance with search "stax"', fakeAsync(() => {
    fixture.detectChanges();
    component.availablePluginInstances.filter = 'stax';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const pluginInstancesElements = mainElement.querySelectorAll('mat-row');
      expect(pluginInstancesElements.length).toEqual(0);
    });
  }));
});
