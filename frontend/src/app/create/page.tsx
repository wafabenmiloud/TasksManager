// src/app/create/page.tsx
"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'PENDING' | 'IN_PROGRESS' | 'DONE'>('PENDING');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://tasksmanager-1zxj.onrender.com/tasks', { title, description, status });
      router.push('/');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Create Task</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as 'PENDING' | 'IN_PROGRESS' | 'DONE')} required>
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>Create</button>
      </form>
    </div>
  );
}
