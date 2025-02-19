import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <h1 className="text-3xl font-bold mb-8">Task Manager</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <TaskForm />
                  <TaskList />
                </div>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;