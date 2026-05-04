import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import type { Todo } from '../types/todo';

/**
 * Todo作成コンポーネントのProps
 */
interface TodoCreateProps {
  /** Todo作成時のコールバック関数 */
  onTodoCreate: (todo: Todo) => void;
}

/**
 * Todo作成コンポーネント
 * 
 * ユーザーが新しいTodoを作成するためのフォームを提供する
 */
export const TodoCreate = ({ onTodoCreate }: TodoCreateProps) => {
  // 入力フィールドの状態管理
  const [title, setTitle] = useState('');
  // エラーメッセージの状態管理
  const [error, setError] = useState('');

  /**
   * フォーム送信ハンドラー
   * 
   * @param e - フォーム送信イベント
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション: タイトルが空の場合はエラー
    if (!title.trim()) {
      setError('タイトルを入力してください');
      return;
    }

    // 新しいTodoオブジェクトを作成
    const newTodo: Todo = {
      id: crypto.randomUUID(), // 一意なIDを生成
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
    };

    // 親コンポーネントにTodo作成を通知
    onTodoCreate(newTodo);

    // フォームをリセット
    setTitle('');
    setError('');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        新しいTodoを作成
      </Typography>

      {/* フォーム */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* エラーメッセージ表示 */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* タイトル入力フィールド */}
        <TextField
          label="タイトル"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          placeholder="Todoのタイトルを入力"
          fullWidth
          error={!!error}
          helperText={error ? ' ' : ''}
        />

        {/* 送信ボタン */}
        <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
          作成
        </Button>
      </Box>
    </Box>
  );
};
