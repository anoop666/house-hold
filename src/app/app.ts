import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePage } from "./shared/widgets/pages/home-page/home-page";
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'heis-household';
}
