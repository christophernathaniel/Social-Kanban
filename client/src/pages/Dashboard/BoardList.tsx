import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import InvitationForm from './invitationForm';
import InvitationList from './invitationList';
import { useUser } from '../../contexts/UserContext.tsx';

const BoardList = () => {
    const [boards, setBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState('');
    const { user } = useUser();

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
            console.error(response.data);
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

    const handleDeleteBoard = async (boardId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5001/api/boards/${boardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedBoards = boards.filter((board) => board._id !== boardId);
            setBoards(updatedBoards);
        } catch (error) {
            console.error('Error deleting board:', error);
        }
    };

    // Function to handle removing a member to a board
    const handleRemoveMember = async (board, userId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5001/api/boards/${board._id}/members/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Optionally, update the board state or UI after member removal
        } catch (error) {
            console.error('Error removing member from board:', error);
            // Handle error
        }
    };


    return (
        <DefaultLayout>
            <h1>Kanban Boards</h1>
            <InvitationList />
            {/* Board list */}
            <ul>
                {boards.map((board) => (
                    <li key={board._id}>
                        <h3>{board.name}</h3>
                        {board.members.length > 0 && (
                            <>
                                <p>Members:</p>
                                <ul>
                                    {board.members.map((member) => (
                                        <li key={member._id}>
                                            {member.name} - {member.username}
                                            {member._id === user._id && (
                                                <button className="removeSelf" onClick={() => handleRemoveMember(board, member._id)}>Remove</button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        <button onClick={() => handleDeleteBoard(board._id)}>Delete</button>
                        <InvitationForm boardId={board._id} />
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
        </DefaultLayout>
    );
};

export default BoardList;