"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./page.module.css";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "DONE";
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Tasks List</h1>
      <Link href="/create" className={styles.styledLink}>
        Create Task
      </Link>
      <ul className={styles.taskListContainer}>
        {tasks.map(({ id, title, description, status }) => (
          <li key={id} className={styles.taskItem}>
            <h2 className={styles.taskTitle}>{title}</h2>
            <p className={styles.taskDescription}>{description}</p>
            <p
              className={`${styles.taskStatus} ${
                styles[getStatusClass(status)]
              }`}
            >
              {status}
            </p>
            <div className={styles.linksWrapper}>
              <Link href={`/update/${id}`} className={styles.updateLink}>
                Update
              </Link>
              <button
                onClick={() => handleDelete(id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function getStatusClass(status: "PENDING" | "IN_PROGRESS" | "DONE"): string {
  switch (status) {
    case "PENDING":
      return "pending";
    case "IN_PROGRESS":
      return "inProgress";
    case "DONE":
      return "done";
    default:
      return "";
  }
}
