import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent {
  constructor(private router:Router, private route:ActivatedRoute){}
  onNavigateBack(): void {
    this.router.navigate(['../'],{ relativeTo: this.route });
  }
}
