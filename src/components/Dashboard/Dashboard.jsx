import { useSelector } from 'react-redux'
import { selectTaskStats, selectAllTasks } from '../../store/selectors'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './Dashboard.css'

const Dashboard = () => {
  const stats = useSelector(selectTaskStats)
  const tasks = useSelector(selectAllTasks)

  const priorityData = [
    { name: 'High', value: stats.byPriority.high, color: '#ef4444' },
    { name: 'Medium', value: stats.byPriority.medium, color: '#f59e0b' },
    { name: 'Low', value: stats.byPriority.low, color: '#10b981' },
  ]

  const categoryData = Object.entries(stats.byCategory).map(([name, value]) => ({
    name,
    value,
  }))

  const completionData = [
    { name: 'Completed', value: stats.completed, color: '#10b981' },
    { name: 'Active', value: stats.active, color: '#6366f1' },
  ]

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4']

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Task Statistics Dashboard</h2>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon stat-icon-total">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8b5a2b" strokeWidth="2">
              <path d="M9 2v4M15 2v4M9 6h6M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              <rect x="7" y="9" width="10" height="12" fill="white" stroke="#8b5a2b" strokeWidth="1" />
              <line x1="9" y1="12" x2="15" y2="12" stroke="#8b5a2b" strokeWidth="1.5" />
              <line x1="9" y1="15" x2="15" y2="15" stroke="#8b5a2b" strokeWidth="1.5" />
              <line x1="9" y1="18" x2="15" y2="18" stroke="#8b5a2b" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">TOTAL TASKS</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-completed">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">COMPLETED</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-active">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.active}</div>
            <div className="stat-label">ACTIVE</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon-rate">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.5">
              <rect x="5" y="14" width="4" height="6" fill="#10b981" stroke="none" />
              <rect x="5" y="14" width="4" height="6" stroke="#1e293b" />
              <rect x="11" y="10" width="4" height="10" fill="#ef4444" stroke="none" />
              <rect x="11" y="10" width="4" height="10" stroke="#1e293b" />
              <rect x="17" y="12" width="4" height="8" fill="#3b82f6" stroke="none" />
              <rect x="17" y="12" width="4" height="8" stroke="#1e293b" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.completionRate.toFixed(1)}%</div>
            <div className="stat-label">COMPLETION RATE</div>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-card">
          <h3>Task Completion</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={completionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {completionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Tasks by Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value">
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Tasks by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {recentTasks.length > 0 && (
        <div className="dashboard-recent">
          <h3>Recent Tasks</h3>
          <div className="recent-tasks-list">
            {recentTasks.map((task) => (
              <div key={task.id} className="recent-task-item">
                <div className={`recent-task-status ${task.completed ? 'completed' : 'active'}`} />
                <div className="recent-task-info">
                  <div className="recent-task-title">{task.title}</div>
                  <div className="recent-task-meta">
                    {task.category} • {task.priority}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

