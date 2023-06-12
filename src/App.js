import './App.css';
import TodoList from './components/TodoList';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <TodoList />
      </Provider>
    </>
  );
}

export default App;
