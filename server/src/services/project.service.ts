import { pool } from "../config/database";
import type { Project, CreateProjectInput } from "../types/project.types";

export const getAllProjects = async (userId: number): Promise<Project[]> => {
  const result = await pool.query<Project>(
    `SELECT
       p.id,
       p.name,
       p.description,
       p.status,
       p.created_at::text AS "createdAt",
       COUNT(t.id)::int AS "taskCount",
       COUNT(t.id) FILTER (WHERE t.status = 'done')::int AS "completedTasks"
     FROM projects p
     LEFT JOIN tasks t
       ON t.project_id = p.id
       AND t.user_id = p.user_id
     WHERE p.user_id = $1
     GROUP BY p.id
     ORDER BY p.created_at DESC`,
    [userId],
  );

  return result.rows;
};

export const getProjectById = async (
  projectId: number,
  userId: number,
): Promise<Project | undefined> => {
  const result = await pool.query<Project>(
    `SELECT
       p.id,
       p.name,
       p.description,
       p.status,
       p.created_at::text AS "createdAt",
       COUNT(t.id)::int AS "taskCount",
       COUNT(t.id) FILTER (WHERE t.status = 'done')::int AS "completedTasks"
     FROM projects p
     LEFT JOIN tasks t
       ON t.project_id = p.id
       AND t.user_id = p.user_id
     WHERE p.id = $1 AND p.user_id = $2
     GROUP BY p.id`,
    [projectId, userId],
  );

  return result.rows[0];
};

export const createProject = async (
  data: CreateProjectInput,
  userId: number,
): Promise<Project> => {
  const result = await pool.query<Project>(
    `INSERT INTO projects (
       user_id,
       name,
       description,
       status
     )
     VALUES ($1, $2, $3, $4)
     RETURNING
       id,
       name,
       description,
       status,
       created_at::text AS "createdAt"`,
    [userId, data.name, data.description, data.status],
  );

  return {
    ...result.rows[0],
    taskCount: 0,
    completedTasks: 0,
  };
};

export const updateProject = async (
  projectId: number,
  userId: number,
  data: CreateProjectInput,
): Promise<Project | undefined> => {
  const result = await pool.query<Project>(
    `UPDATE projects
     SET
       name = $1,
       description = $2,
       status = $3
     WHERE id = $4 AND user_id = $5
     RETURNING
       id,
       name,
       description,
       status,
       created_at::text AS "createdAt"`,
    [data.name, data.description, data.status, projectId, userId],
  );

  if (!result.rows[0]) {
    return undefined;
  }

  return getProjectById(projectId, userId);
};

export const deleteProject = async (
  projectId: number,
  userId: number,
): Promise<boolean> => {
  const result = await pool.query(
    `DELETE FROM projects
     WHERE id = $1 AND user_id = $2`,
    [projectId, userId],
  );

  return (result.rowCount ?? 0) > 0;
};
