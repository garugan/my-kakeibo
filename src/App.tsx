import { useState } from "react";

type Expense = {
  id: number
  date: string;
  category: string;
  amount: number;
  memo: string;
};
 
function App() {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [memo, setMemo] = useState("");

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAdd = () => {
  // 入力チェック
  if (!date || !category || amount === "") return;

  //新しい支出データの作成
  const newExpense = {
    id: Date.now(),
    date,
    category,
    amount: Number(amount),
    memo,
  };

  // 配列stateを更新
  setExpenses((prev) => [...prev, newExpense]);
  
  // 入力欄をリセット
  setDate("");
  setCategory("");
  setAmount("");
  setMemo("");
};

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h1>シンプル家計簿</h1>

      <h2>支出の入力</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label>
          日付：
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label>
          カテゴリ：
          <input type="text" placeholder="食費・交通・趣味など" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>

        <label>
          金額：
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))} />
        </label>

        <label>
          メモ：
          <input type="text" value={memo} onChange={(e) => setMemo(e.target.value)} />
        </label>

        <button>追加する</button>

      </div>
    </div>
  );
};


export default App;

