import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserProfile } from 'src/app/auth/user/user-profile';
import { Observable, merge, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'venite-member-chip',
  templateUrl: './member-chip.component.html',
  styleUrls: ['./member-chip.component.scss'],
})
export class MemberChipComponent implements OnInit {
  /** UID of a user to be rendered */
  @Input() uid : string;
  @Input() user : UserProfile;

  @Output() click : EventEmitter<CustomEvent> = new EventEmitter();

  user$ : Observable<UserProfile>

  constructor(private auth : AuthService) { }

  ngOnInit() {
    this.user$ = merge(of(this.user), this.auth.getUserProfile(this.uid)).pipe(
      tap(profile => console.log('member chip, profile = ')),
      filter(profile => !!profile)
    );
  }

}
