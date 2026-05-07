import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectName, setProjectName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/tasks'
      );

      setTasks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    try {

      await axios.post(
        'http://localhost:5000/api/tasks',
        {
          title,
          description,
          projectName,
          assignedTo,
          dueDate,
        }
      );

      setTitle('');
      setDescription('');
      setProjectName('');
      setAssignedTo('');
      setDueDate('');

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {

      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status }
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {

      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    window.location.href = '/login';
  };

  const filteredTasks = tasks.filter((task) => {

    const title = task.title || '';
    const description = task.description || '';
    const assignedTo = task.assignedTo || '';
    const projectName = task.projectName || '';

    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase()) ||
      assignedTo.toLowerCase().includes(search.toLowerCase()) ||
      projectName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingTasks = tasks.filter(
    (task) => task.status === 'pending'
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === 'completed'
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === 'in progress'
  ).length;

  const overdueTasks = tasks.filter((task) => {

    if (!task.dueDate) return false;

    return (
      new Date(task.dueDate) < new Date() &&
      task.status !== 'completed'
    );

  }).length;

  return (

    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f4f7fb',
        padding: '40px',
        fontFamily: 'Arial',
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >

        <div>

          <h1
            style={{
              margin: 0,
              color: '#1e293b',
            }}
          >
            Team Task Manager
          </h1>

          <p
            style={{
              color: '#64748b',
            }}
          >
            Logged in as:
            {' '}
            <strong>{role}</strong>
          </p>

        </div>

        <button
          onClick={logout}
          style={{
            padding: '12px 18px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Logout
        </button>

      </div>

      {/* DASHBOARD CARDS */}

      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '35px',
        }}
      >

        {[
          {
            label: 'Total Tasks',
            value: tasks.length,
          },
          {
            label: 'Pending',
            value: pendingTasks,
          },
          {
            label: 'In Progress',
            value: inProgressTasks,
          },
          {
            label: 'Completed',
            value: completedTasks,
          },
          {
            label: 'Overdue',
            value: overdueTasks,
          },
        ].map((card, index) => (

          <div
            key={index}
            style={{
              backgroundColor:
                card.label === 'Overdue'
                  ? '#ffecec'
                  : 'white',

              border:
                card.label === 'Overdue'
                  ? '1px solid #ef4444'
                  : '1px solid #e2e8f0',

              borderRadius: '14px',

              padding: '20px',

              width: '180px',

              boxShadow:
                '0 4px 10px rgba(0,0,0,0.05)',
            }}
          >

            <h3
              style={{
                margin: 0,
                color:
                  card.label === 'Overdue'
                    ? '#dc2626'
                    : '#334155',
              }}
            >
              {card.label}
            </h3>

            <p
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                marginTop: '10px',
              }}
            >
              {card.value}
            </p>

          </div>

        ))}

      </div>

      {/* FILTERS */}

      <div
        style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '35px',
          flexWrap: 'wrap',
        }}
      >

        <input
          type="text"
          placeholder="Search tasks, projects, users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '14px',
            width: '320px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '15px',
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          style={{
            padding: '14px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '15px',
          }}
        >

          <option value="all">
            All Status
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="in progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>

        </select>

      </div>

      {/* CREATE TASK */}

      {role === 'admin' && (

        <div
          style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '16px',
            marginBottom: '40px',
            boxShadow:
              '0 4px 12px rgba(0,0,0,0.06)',
          }}
        >

          <h2
            style={{
              marginTop: 0,
              marginBottom: '20px',
              color: '#1e293b',
            }}
          >
            Create New Task
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(220px, 1fr))',

              gap: '15px',
            }}
          >

            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) =>
                setProjectName(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Assign To"
              value={assignedTo}
              onChange={(e) =>
                setAssignedTo(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              style={inputStyle}
            />

          </div>

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            style={{
              ...inputStyle,
              width: '100%',
              marginTop: '15px',
              minHeight: '100px',
            }}
          />

          <button
            onClick={addTask}
            style={{
              marginTop: '20px',
              padding: '14px 22px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '15px',
            }}
          >
            Add Task
          </button>

        </div>

      )}

      {/* TASK LIST */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(340px, 1fr))',

          gap: '25px',
        }}
      >

        {filteredTasks.map((task) => {

          const isOverdue =
            task.dueDate &&
            new Date(task.dueDate) < new Date() &&
            task.status !== 'completed';

          return (

            <div
              key={task._id}
              style={{
                backgroundColor:
                  isOverdue
                    ? '#fff5f5'
                    : 'white',

                border:
                  isOverdue
                    ? '1px solid #ef4444'
                    : '1px solid #e2e8f0',

                borderRadius: '16px',

                padding: '22px',

                boxShadow:
                  '0 4px 10px rgba(0,0,0,0.05)',
              }}
            >

              <p
                style={{
                  color: '#2563eb',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                {task.projectName || 'No Project'}
              </p>

              <h2
                style={{
                  marginTop: 0,
                  color: '#1e293b',
                }}
              >
                {task.title}
              </h2>

              <p
                style={{
                  color: '#475569',
                  lineHeight: '1.5',
                }}
              >
                {task.description}
              </p>

              <p>
                <strong>Assigned To:</strong>
                {' '}
                {task.assignedTo || 'Unassigned'}
              </p>

              <p>
                <strong>Due Date:</strong>
                {' '}
                {task.dueDate
                  ? new Date(
                      task.dueDate
                    ).toLocaleDateString()
                  : 'No Due Date'}
              </p>

              {isOverdue && (

                <p
                  style={{
                    color: '#dc2626',
                    fontWeight: 'bold',
                  }}
                >
                  OVERDUE
                </p>

              )}

              <p>
                <strong>Status:</strong>
                {' '}
                {task.status}
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '15px',
                }}
              >

                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(
                      task._id,
                      e.target.value
                    )
                  }
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border:
                      '1px solid #cbd5e1',
                  }}
                >

                  <option value="pending">
                    Pending
                  </option>

                  <option value="in progress">
                    In Progress
                  </option>

                  <option value="completed">
                    Completed
                  </option>

                </select>

                {role === 'admin' && (

                  <button
                    onClick={() =>
                      deleteTask(task._id)
                    }
                    style={{
                      padding: '10px 14px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>

                )}

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );
}

const inputStyle = {
  padding: '14px',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  fontSize: '15px',
};

export default Dashboard;