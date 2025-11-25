import { useEffect, useState } from "react";

type Expense = {
  id: number;
  date: string;
  category: string;
  amount: number;
  memo: string;
};

// localStorage から初期値読み込み
const loadInitialExpenses = (): Expense[] => {
  const savedData = localStorage.getItem("expenses");
  if (!savedData) return [];

  try {
    const parsed = JSON.parse(savedData);
    if (Array.isArray(parsed)) {
      return parsed as Expense[];
    }
  } catch (error) {
    console.error("expenses の JSON パースに失敗しました:", error);
  }
  return [];
};

function App() {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [memo, setMemo] = useState("");

  const [expenses, setExpenses] = useState<Expense[]>(() =>
    loadInitialExpenses()
  );

  // 🔍 カテゴリフィルタ用
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // 変更があったら localStorage に保存
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAdd = () => {
    if (!date || !category || amount === "") return;

    const newExpense: Expense = {
      id: Date.now(),
      date,
      category,
      amount: Number(amount),
      memo,
    };

    setExpenses((prev) => [...prev, newExpense]);

    setDate("");
    setCategory("");
    setAmount("");
    setMemo("");
  };

  const handleDelete = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // 🔍 フィルタ済みの配列を作成
  const filteredExpenses =
    filterCategory === "all"
      ? expenses
      : expenses.filter((e) => e.category === filterCategory);

  // 🔢 合計はフィルタ後のデータで計算
  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  // セレクトボックスに出すカテゴリ一覧（重複排除）
  const categoryOptions = Array.from(
    new Set(expenses.map((e) => e.category))
  );

  return (
    <div className="container">
      <h1>シンプル家計簿</h1>

      <h2>支出の入力</h2>
      <div className="form-grid">
        <label>
          日付
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          カテゴリ
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value="">選択してください</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label>
          金額
          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </label>

        <label>
          メモ
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </label>
      </div>

      <button onClick={handleAdd}>追加する</button>

      {/* 🔍 カテゴリフィルタ UI */}
      <div style={{ marginTop: 24 }}>
        <label>
          カテゴリで絞り込み：
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ marginLeft: 8, padding: 4 }}
          >
            <option value="all">すべて</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <h2 style={{ marginTop: 24 }}>
        一覧(合計：{total.toLocaleString()}円)
      </h2>
      {filteredExpenses.length === 0 ? (
        <p>該当する支出がありません。</p>
      ) : (
        <table border={1} cellPadding={4} style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>日付</th>
              <th>カテゴリ</th>
              <th>金額</th>
              <th>メモ</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map((e) => (
              <tr key={e.id}>
                <td>{e.date}</td>
                <td>{e.category}</td>
                <td style={{ textAlign: "right" }}>
                  {e.amount.toLocaleString()}円
                </td>
                <td>{e.memo}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDelete(e.id)}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
