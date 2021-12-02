import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/reddit/auth/auth.service';

@Component({
  selector: 'app-callback-page',
  templateUrl: './callback-page.component.html',
  styleUrls: ['./callback-page.component.scss']
})
export class CallbackPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
      const code = this.route.snapshot.queryParamMap.get('code');
      console.log(code)
      if(code) {
        this.auth.requestToken(code);
      }
      this.router.navigateByUrl('')
  }

}
