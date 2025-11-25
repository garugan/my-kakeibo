import { useEffect, useState } from "react";

type Expense = {
  id: number;
  date: string;
  category: string;
  amount: number;
  memo: string;
};

// 🔵 ここで localStorage から初期値を読む
const loadInitialExpenses = (): Expense[] => {
  const savedData = localStorage.getItem("expenses");
  if (!savedData) return [];

  try {
    const parsed = JSON.parse(savedData);
    if (Array.isArray(parsed)) {
      return parsed as Expense[];
    } else {
      console.warn("expenses の形式が配列ではありません:", parsed);
      return [];
    }
  } catch (error) {
    console.error("expenses の JSON パースに失敗しました:", error);
    return [];
  }
};

function App() {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [memo, setMemo] = useState("");

  // 🔵 初期値として localStorage の内容を読み込む
  const [expenses, setExpenses] = useState<Expense[]>(() =>
    loadInitialExpenses()
  );

  // ✅ expenses が変わるたびに保存
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAdd = () => {
    // 入力チェック
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

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h1>シンプル家計簿</h1>

      <h2>支出の入力</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label>
          日付：
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          カテゴリ：
          <input
            type="text"
            placeholder="食費・交通・趣味など"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>

        <label>
          金額：
          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </label>

        <label>
          メモ：
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </label>

        <button onClick={handleAdd}>追加する</button>
      </div>

      <h2 style={{ marginTop: 24 }}>
        一覧(合計：{total.toLocaleString()}円)
      </h2>
      {expenses.length === 0 ? (
        <p>まだ登録がありません。</p>
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
            {expenses.map((e) => (
              <tr key={e.id}>
                <td>{e.date}</td>
                <td>{e.category}</td>
                <td style={{ textAlign: "right" }}>
                  {e.amount.toLocaleString()}円
                </td>
                <td>{e.memo}</td>
                <td>
                  <button onClick={() => handleDelete(e.id)}>削除</button>
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
