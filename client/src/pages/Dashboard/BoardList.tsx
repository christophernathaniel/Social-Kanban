import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BoardList = () => {
    const [boards, setBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState('');

    // Function to fetch all boards for the user
    const fetchBoards = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            const response = await axios.get('http://localhost:5001/api/boards', {
                headers: {
                    Authorization: `Bearer ${token}` // Set Authorization header with token
                }
            });
            setBoards(response.data);
        } catch (error) {
            console.error('Error fetching boards:', error);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    // Function to handle board creation
    const handleCreateBoard = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            const response = await axios.post('http://localhost:5001/api/boards', { name: newBoardName }, {
                headers: {
                    Authorization: `Bearer ${token}` // Set Authorization header with token
                }
            });
            setBoards([...boards, response.data]);
            setNewBoardName('');
        } catch (error) {
            console.error('Error creating board:', error);
        }
    };

    // Function to handle board deletion
    const handleDeleteBoard = async (boardId) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            await axios.delete(`http://localhost:5001/api/boards/${boardId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Set Authorization header with token
                }
            });
            const updatedBoards = boards.filter((board) => board._id !== boardId);
            setBoards(updatedBoards);
        } catch (error) {
            console.error('Error deleting board:', error);
        }
    };

    return (
        <div>
            <h1>Kanban Boards</h1>
            {/* Board list */}
            <ul>
                {boards.map((board) => (
                    <li key={board._id}>
                        {board.name}
                        <button onClick={() => handleDeleteBoard(board._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {/* Create new board form */}
            <div>
                <input
                    type="text"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    placeholder="Enter board name"
                />
                <button onClick={handleCreateBoard}>Create Board</button>
            </div>
        </div>
    );
};

export default BoardList;