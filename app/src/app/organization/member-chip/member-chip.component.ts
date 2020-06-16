import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserProfile } from 'src/app/auth/user/user-profile';
import { Observable } from 'rxjs';

@Component({
  selector: 'venite-member-chip',
  templateUrl: './member-chip.component.html',
  styleUrls: ['./member-chip.component.scss'],
})
export class MemberChipComponent implements OnInit {
  /** UID of a user to be rendered */
  @Input() uid : string;

  user$ : Observable<UserProfile>

  constructor(private auth : AuthService) { }

  ngOnInit() {
    this.user$ = this.auth.getUserProfile(this.uid);
  }

}
