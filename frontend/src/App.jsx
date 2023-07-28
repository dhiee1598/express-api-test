import { useEffect, useState } from 'react';
import GoalForm from './components/GoalForm';

const App = () => {
  const [datas, setDatas] = useState([{}]);

  useEffect(() => {
    fetch('http://localhost:5000/api/goals')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDatas(data);
      });
  }, []);

  return (
    <div>
      {datas.map((data, i) => {
        return (
          <div key={i}>
            <h1>{data.title}</h1>
          </div>
        );
      })}
      <GoalForm />
    </div>
  );
};

export default App;
