import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Empleado{
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasT: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styles: ``
})


export default class EmpleadosComponent implements OnInit{
  formGroup!: FormGroup;
  empleados: Empleado[] = [];
  mostrarT: boolean = false;
  matriculaM: string | null = null;
  matriculaA: string = '';

  constructor(private fb: FormBuilder){}

  ngOnInit(): void{
    this.formGroup = this.fb.group({
      matricula: [''],
      nombre: [''],
      correo: [''],
      edad: [''],
      horasT: [''],
      matriculaA: ['']
    });

    const empleadosG = localStorage.getItem('empleados');
    if (empleadosG){
      this.empleados = JSON.parse(empleadosG);
    }
  }

  onSubmit(): void{
    const empleadoN: Empleado = {
      matricula:this.formGroup.value.matricula,
      nombre:this.formGroup.value.nombre,
      correo:this.formGroup.value.correo,
      edad:this.formGroup.value.edad,
      horasT:this.formGroup.value.horasT,
    };

    if (this.matriculaM){
      this.empleados = this.empleados.map(emple => emple.matricula === this.matriculaM ? empleadoN : emple);
      this.matriculaM = null;
    }else{
      this.empleados.push(empleadoN);
    }

    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    this.formGroup.reset();
  }

  calcularP(empleado: Empleado): { subT:number, pagoHE: number, pagoH: number }{
    const horasN = empleado.horasT > 40 ? 40 : empleado.horasT;
    const horasE = empleado.horasT > 40 ? empleado.horasT - 40 : 0; 

    const pagoH = horasN * 70;
    const pagoHE = horasE * 140;
    const subT = pagoH + pagoHE;

    return {subT, pagoHE, pagoH}
  }

  calcularT(): number{
    return this.empleados.reduce((total, empleado) => total + this.calcularP(empleado).subT, 0);
  }

  imprimir(): void{
    this.mostrarT = true;

    const empleadosG = localStorage.getItem('empleados');
    if(empleadosG){
      this.empleados = JSON.parse(empleadosG);
    }
  }

  modificar(): void{
    const empleado = this.empleados.find(emple => emple.matricula === this.matriculaA);
    if(empleado){
      this.formGroup.patchValue(empleado);
      this.matriculaM = this.matriculaA;
    }
  }

  eliminar(): void{
    this.empleados = this.empleados.filter(emple => emple.matricula !== this.matriculaA);
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }
}

