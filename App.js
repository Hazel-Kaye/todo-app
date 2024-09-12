import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search text

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
      setTasks([...tasks, { id: Date.now().toString(), text: textInput }]);
    }
    setTextInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTextInput(taskToEdit.text);
      setIsEditing(true);
      setCurrentTaskId(id);
    }
  };

  // Function to filter tasks based on the search query
  const filteredTasks = tasks.filter(task => 
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item.text}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity style={styles.button} onPress={() => handleEditTask(item.id)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDeleteTask(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
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

      {/* Search input */}
      <TextInput
        style={styles.input}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredTasks} // Use filtered tasks based on search
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
  buttonText: {
    color: '#fff',
  },
});
