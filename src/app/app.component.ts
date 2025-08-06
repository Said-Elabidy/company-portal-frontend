import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ ده المهم

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // ✅ ضيفه هنا
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'company-portal-frontend';
}