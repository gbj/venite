import { Component, Input, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/organization/organization.module';
import { slugify } from 'src/app/slugify';

@Component({
  selector: 'venite-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss'],
})
export class CreateOrganizationComponent implements OnInit {
  @Input() modal : any;
  @Input() name: string;

  url: string = '';
  urlExists: boolean;
  location: string = '';
  website: string = '';

  base: string = '';

  constructor(private organizationService : OrganizationService) { }

  ngOnInit() {
    this.base = window?.location?.host || '';
    this.url = this.slugify(this.name);
    this.validateURL(this.url);
  }

  slugify(name : string) {
    return slugify(name);
  }

  dismiss() {
    this.modal.dismiss();
  }

  create() {
    this.modal.dismiss({
      name: this.name,
      url: this.url,
      location: this.location,
      website: this.website
    });
  }

  async validateURL(slug: string) {
    if(slug) {
      this.urlExists = await this.organizationService.exists(slug);
    } else {
      this.urlExists = false;
    }
  }
}
