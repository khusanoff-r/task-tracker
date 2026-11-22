import { pool } from "../config/database";
import type { Task, CreateTaskInput } from "../types/task.types";

export const getAllTasks = async (userId: number): Promise<Task[]> => {
  const result = await pool.query<Task>(
    `SELECT
       id,
       title,
       description,
       status,
       priority,
       due_date::text AS "dueDate"
     FROM tasks
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId],
  );

  return result.rows;
};

export const getTaskById = async (
  taskId: number,
  userId: number,
): Promise<Task | undefined> => {
  const result = await pool.query<Task>(
    `SELECT
       id,
       title,
       description,
       status,
       priority,
       due_date::text AS "dueDate"
     FROM tasks
     WHERE id = $1 AND user_id = $2`,
    [taskId, userId],
  );

  return result.rows[0];
};

export const createTask = async (
  data: CreateTaskInput,
  userId: number,
): Promise<Task> => {
  const result = await pool.query<Task>(
    `INSERT INTO tasks (
       user_id,
       title,
       description,
       status,
       priority,
       due_date
     )
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING
       id,
       title,
       description,
       status,
       priority,
       due_date::text AS "dueDate"`,
    [
      userId,
      data.title,
      data.description,
      data.status,
      data.priority,
      data.dueDate,
    ],
  );

  return result.rows[0];
};

export const updateTask = async (
  taskId: number,
  userId: number,
  data: CreateTaskInput,
): Promise<Task | undefined> => {
  const result = await pool.query<Task>(
    `UPDATE tasks
     SET
       title = $1,
       description = $2,
       status = $3,
       priority = $4,
       due_date = $5,
       updated_at = NOW()
     WHERE id = $6 AND user_id = $7
     RETURNING
       id,
       title,
       description,
       status,
       priority,
       due_date::text AS "dueDate"`,
    [
      data.title,
      data.description,
      data.status,
      data.priority,
      data.dueDate,
      taskId,
      userId,
    ],
  );

  return result.rows[0];
};

export const deleteTask = async (
  taskId: number,
  userId: number,
): Promise<boolean> => {
  const result = await pool.query(
    `DELETE FROM tasks
     WHERE id = $1 AND user_id = $2`,
    [taskId, userId],
  );

  return (result.rowCount ?? 0) > 0;
};
