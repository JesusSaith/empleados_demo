import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. IMPORTANTE: Importar RouterOutlet y RouterLink
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. IMPORTANTE: Agregarlos al array de imports
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App{
  title = 'empleados_demo';
}