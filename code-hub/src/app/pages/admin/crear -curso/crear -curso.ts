import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursosService } from '../../../core/services/CursosService';
import Swal from 'sweetalert2'
import { CursoModel } from '../../../core/models/CursoModel';
import { UsuarioService } from '../../../core/services/usuarioService';
import { UsuarioModel } from '../../../core/models/UsuarioModel';
import { CommonModule } from '@angular/common';

interface HorarioOption {
  id: number;
  label: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

@Component({
  selector: 'app-crear--curso',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './crear -curso.html',
  styleUrl: './crear -curso.css',
})
export class CrearCurso {
  formCurso: FormGroup;
  profesores: UsuarioModel[] = [];
  previewImagen: string | ArrayBuffer | null = null;
  imagenSeleccionada: string = '';

  imagenesCursos: string[] = [
  'cursos/curso1.webp',
  'cursos/curso2.webp',
  'cursos/curso3.webp',
  'cursos/curso4.webp'
];
getImagenRandom(): string {
  const index = Math.floor(Math.random() * this.imagenesCursos.length);
  return this.imagenesCursos[index];
}

  horariosDisponibles: HorarioOption[] = [
    { id: 1, label: 'Lunes 08:00-10:00', dia: 'Lunes', horaInicio: '08:00', horaFin: '10:00' },
    { id: 2, label: 'Miércoles 08:00-10:00', dia: 'Miércoles', horaInicio: '08:00', horaFin: '10:00' },
    { id: 3, label: 'Martes 10:00-12:00', dia: 'Martes', horaInicio: '10:00', horaFin: '12:00' },
    { id: 4, label: 'Viernes 10:00-12:00', dia: 'Viernes', horaInicio: '10:00', horaFin: '12:00' },
    { id: 5, label: 'Lunes 14:00-16:00', dia: 'Lunes', horaInicio: '14:00', horaFin: '16:00' },
    { id: 6, label: 'Miércoles 14:00-16:00', dia: 'Miércoles', horaInicio: '14:00', horaFin: '16:00' },
    { id: 7, label: 'Martes 08:00-10:00', dia: 'Martes', horaInicio: '08:00', horaFin: '10:00' },
    { id: 8, label: 'Jueves 08:00-10:00', dia: 'Jueves', horaInicio: '08:00', horaFin: '10:00' }
  ];

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private usuarioService: UsuarioService
  ) {
    this.formCurso = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      profesorId: ['', Validators.required],
      imagen: [''],
      estado: ['activo', Validators.required],
      horarioId: ['', Validators.required] // select de horario
    });
  }

  ngOnInit(): void {
    this.cargarProfesores();
  }

  cargarProfesores() {
    this.usuarioService.getUsuarios().subscribe(users => {
      this.profesores = users.filter(u => u.roleId === 2);
    });
  }

  seleccionarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = `./cursos/${file.name}`;
      this.formCurso.patchValue({ imagen: this.imagenSeleccionada });

      const reader = new FileReader();
      reader.onload = () => (this.previewImagen = reader.result);
      reader.readAsDataURL(file);
    }
  }

  handleSubmit(): void {
    if (this.formCurso.invalid) {
      Swal.fire('Error', 'Por favor completa todos los campos', 'warning');
      return;
    }

    const formValue = this.formCurso.value;

    // Transformar horarioId en array de objetos igual que tu BD
    const horarioSeleccionado = this.horariosDisponibles.find(h => h.id == formValue.horarioId);
    const horariosArray = horarioSeleccionado ? [{
      dia: horarioSeleccionado.dia,
      horaInicio: horarioSeleccionado.horaInicio,
      horaFin: horarioSeleccionado.horaFin
    }] : [];

    const nuevoCurso: CursoModel = {
      nombre: formValue.nombre,
      descripcion: formValue.descripcion,
      fechaInicio: formValue.fechaInicio,
      profesorId: formValue.profesorId,
      imagen: this.getImagenRandom(),
      estado: formValue.estado,
      horarios: horariosArray
    };

    this.cursosService.crearCurso(nuevoCurso).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Curso creado correctamente', 'success');
        this.formCurso.reset({ estado: 'activo' });
        this.previewImagen = null;
      },
      error: () => Swal.fire('Error', 'No se pudo crear el curso', 'error')
    });
  }
}
