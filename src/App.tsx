import { useState } from "react";

function App() {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [memo, setMemo] = useState("");

  return (
    <div>
      <h1>シンプル家計簿</h1>

      <h2>支出の入力</h2>
      <div>
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

