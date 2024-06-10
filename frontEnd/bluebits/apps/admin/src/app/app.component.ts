import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ShellComponent } from './component/shell/shell.component';
@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, ShellComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sdsd';
}
