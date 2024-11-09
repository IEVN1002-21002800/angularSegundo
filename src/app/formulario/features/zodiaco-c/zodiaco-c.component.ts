import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './zodiaco-c.component.html',
  styleUrls: ['./zodiaco-c.component.css']
})

export default class ZodiacoComponent {
  nombre: string = '';
  paterno: string = '';
  materno: string = '';
  dia: number = 1;
  mes: number = 1;
  anio: number = 1990;
  sexo: string = 'Masculino';
  edad: number | null = null;
  signoZodiacalChino: string = '';
  signoImagenChino: string = '';

  calcular() {
    const fechaNacimiento = new Date(this.anio, this.mes - 1, this.dia);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();

    this.edad = diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate()) ? edad - 1 : edad;

    this.signoZodiacalChino = this.calcularSigno(this.anio);
    this.signoImagenChino = this.obtenerImagenSigno(this.signoZodiacalChino);
  }

  calcularSigno(anio: number): string {
    const animalesZodiacoChino = ['Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'];
    const indice = (anio - 4) % 12;
    return animalesZodiacoChino[indice];
  }

  obtenerImagenSigno(signo: string): string {
    const imagenesChinas: { [key: string]: string } = {
      'Rata': 'https://www.clarin.com/img/westernastrology/rata.svg',
      'Bufalo': 'https://www.clarin.com/img/westernastrology/bufalo.svg',
      'Tigre': 'https://www.clarin.com/img/westernastrology/tigre.svg',
      'Conejo': 'https://www.clarin.com/img/westernastrology/conejo.svg',
      'Dragón': 'https://www.clarin.com/img/westernastrology/dragon.svg',
      'Serpiente': 'https://www.clarin.com/img/westernastrology/serpiente.svg',
      'Caballo': 'https://www.clarin.com/img/westernastrology/caballo.svg',
      'Cabra': 'https://www.clarin.com/img/westernastrology/cabra.svg',
      'Mono': 'https://www.clarin.com/img/westernastrology/mono.svg',
      'Gallo': 'https://www.clarin.com/img/westernastrology/gallo.svg',
      'Perro': 'https://www.clarin.com/img/westernastrology/perro.svg',
      'Cerdo': 'https://www.clarin.com/img/westernastrology/chancho.svg'
    };
    return imagenesChinas[signo] || '';
  }
}