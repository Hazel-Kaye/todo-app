import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Function to handle adding a task or updating an existing task
  const handleAddTask = () => {
    if (!textInput.trim()) {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }

    if (isEditing) {
      setTasks(tasks.map(task => 
        task.id === currentTaskId ? { ...task, text: textInput } : task
      ));
      setIsEditing(false);
      setCurrentTaskId(null);
    } else {
      setTasks([...tasks, { id: Date.now().toString(), text: textInput, completed: false }]);
    }
    setTextInput('');
  };

  // Function to delete a task by its id
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Function to start editing a task by setting its text in the input
  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTextInput(taskToEdit.text);
      setIsEditing(true);
      setCurrentTaskId(id);
    }
  };

  // Function to mark a task as complete or undo it
  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to render each task in the list
  const renderTaskItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
        {item.text}
      </Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity style={styles.button} onPress={() => handleEditTask(item.id)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDeleteTask(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.completeButton]} onPress={() => handleCompleteTask(item.id)}>
          <Text style={styles.buttonText}>{item.completed ? 'Undo' : 'Done'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        value={textInput}
        onChangeText={setTextInput}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>{isEditing ? 'Update Task' : 'Add Task'}</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderTaskItem}
        style={styles.taskList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  taskList: {
    marginTop: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskButtons: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
  },
  completeButton: {
    backgroundColor: '#32CD32',
  },
  buttonText: {
    color: '#fff',
  },
});
