import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { ChartModule } from 'angular-highcharts';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToastModule } from 'primeng/toast';

import { ReactiveFormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { NgFor } from '@angular/common';

import { TagModule } from 'primeng/tag';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
export const Module = [
  InputTextareaModule,
  RouterOutlet,
  InputNumberModule,
  InputSwitchModule,
  FormsModule,
  EditorModule,
  DatePipe,
  NgFor,
  TagModule,
  DropdownModule,
  FieldsetModule,
  ReactiveFormsModule,
  ColorPickerModule,
  InputTextModule,
  ConfirmDialogModule,
  ToastModule,
  CommonModule,
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  RouterLink,
  ChartModule,
  RouterOutlet,
];
