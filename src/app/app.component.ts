import { Component, signal, effect } from '@angular/core'; // Added 'effect'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Smart Task Manager';
  newTaskTitle = signal('');

  // 1. Initialize tasks from LocalStorage (if data exists)
  tasks = signal<Task[]>(this.loadTasks());

  constructor() {
    // 2. Auto-save: Whenever 'tasks' changes, save it to LocalStorage
    effect(() => {
      localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    });
  }

  // Helper to load data safely
  loadTasks(): Task[] {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  }

  addTask() {
    if (this.newTaskTitle().trim()) {
      const newItem: Task = {
        id: Date.now(),
        title: this.newTaskTitle(),
        completed: false
      };
      this.tasks.update(values => [...values, newItem]);
      this.newTaskTitle.set('');
    }
  }

  deleteTask(id: number) {
    this.tasks.update(values => values.filter(t => t.id !== id));
  }

  toggleComplete(id: number) {
    this.tasks.update(values =>
      values.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  // 3. New Feature: Clear All Tasks
  clearAll() {
    this.tasks.set([]);
  }
}