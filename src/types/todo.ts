/**
 * Todoアイテムの型定義
 */
export interface Todo {
  /** Todoの一意識別子 */
  id: string;
  /** Todoのタイトル */
  title: string;
  /** Todoの完了状態 */
  completed: boolean;
  /** 作成日時 */
  createdAt: Date;
}

/**
 * 新規Todo作成時の入力データ型
 */
export interface CreateTodoInput {
  /** Todoのタイトル */
  title: string;
}
