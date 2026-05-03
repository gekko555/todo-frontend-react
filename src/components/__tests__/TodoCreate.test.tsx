import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoCreate } from '../TodoCreate';
import type { Todo } from '../../types/todo';

/**
 * TodoCreateコンポーネントのテスト
 */
describe('TodoCreate', () => {
  /**
   * 正常にTodoを作成できること
   */
  it('should create a todo when form is submitted with valid title', () => {
    // モック関数を作成
    const mockOnTodoCreate = vi.fn();

    // コンポーネントをレンダリング
    render(<TodoCreate onTodoCreate={mockOnTodoCreate} />);

    // 入力フィールドを取得
    const input = screen.getByLabelText(/タイトル/i);
    // ボタンを取得
    const button = screen.getByRole('button', { name: /作成/i });

    // タイトルを入力
    fireEvent.change(input, { target: { value: 'テストTodo' } });

    // フォームを送信
    fireEvent.click(button);

    // onTodoCreateが呼ばれたことを確認
    expect(mockOnTodoCreate).toHaveBeenCalledTimes(1);

    // 作成されたTodoの内容を確認
    const createdTodo = mockOnTodoCreate.mock.calls[0][0] as Todo;
    expect(createdTodo.title).toBe('テストTodo');
    expect(createdTodo.completed).toBe(false);
    expect(createdTodo.id).toBeDefined();
    expect(createdTodo.createdAt).toBeDefined();
  });

  /**
   * 空のタイトルで送信するとエラーが表示されること
   */
  it('should show error when submitting with empty title', () => {
    const mockOnTodoCreate = vi.fn();

    render(<TodoCreate onTodoCreate={mockOnTodoCreate} />);

    const button = screen.getByRole('button', { name: /作成/i });

    // 空のタイトルで送信
    fireEvent.click(button);

    // onTodoCreateが呼ばれないことを確認
    expect(mockOnTodoCreate).not.toHaveBeenCalled();

    // エラーメッセージが表示されることを確認
    expect(screen.getByText(/タイトルを入力してください/i)).toBeInTheDocument();
  });

  /**
   * 空白のみのタイトルで送信するとエラーが表示されること
   */
  it('should show error when submitting with whitespace-only title', () => {
    const mockOnTodoCreate = vi.fn();

    render(<TodoCreate onTodoCreate={mockOnTodoCreate} />);

    const input = screen.getByLabelText(/タイトル/i);
    const button = screen.getByRole('button', { name: /作成/i });

    // 空白のみを入力
    fireEvent.change(input, { target: { value: '   ' } });

    // 送信
    fireEvent.click(button);

    // onTodoCreateが呼ばれないことを確認
    expect(mockOnTodoCreate).not.toHaveBeenCalled();

    // エラーメッセージが表示されることを確認
    expect(screen.getByText(/タイトルを入力してください/i)).toBeInTheDocument();
  });

  /**
   * 送信後に入力フィールドがクリアされること
   */
  it('should clear input field after successful submission', () => {
    const mockOnTodoCreate = vi.fn();

    render(<TodoCreate onTodoCreate={mockOnTodoCreate} />);

    const input = screen.getByLabelText(/タイトル/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /作成/i });

    // タイトルを入力
    fireEvent.change(input, { target: { value: 'テストTodo' } });
    expect(input.value).toBe('テストTodo');

    // 送信
    fireEvent.click(button);

    // 入力フィールドがクリアされたことを確認
    expect(input.value).toBe('');
  });
});
