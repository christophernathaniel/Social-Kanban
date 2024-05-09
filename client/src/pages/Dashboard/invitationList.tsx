// InvitationList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvitationList: React.FC = () => {
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
                const response = await axios.get('http://localhost:5001/api/invitations', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInvitations(response.data);
                console.error(response.data);
            } catch (error: any) {
                console.error('Error fetching invitations:', error);
            }
        };

        fetchInvitations();
    }, []);

    const handleAcceptInvitation = async (invitationId: string) => {
        try {
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
            await axios.put(`http://localhost:5001/api/invitations/${invitationId}/accept`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Invitation accepted successfully!');
            // Update invitation list after accepting
            // or remove the accepted invitation from the list
        } catch (error: any) {
            alert('Failed to accept invitation: ' + error.message);
        }
    };

    const handleRejectInvitation = async (invitationId: string) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5001/api/invitations/${invitationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Invitation rejected successfully!');
            // Update invitation list after rejection
            // or remove the rejected invitation from the list
        } catch (error: any) {
            alert('Failed to reject invitation: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Invitations</h2>
            <ul>
                {invitations.map((invitation: any) => (
                    <li key={invitation._id}>
                        From: {invitation.recipientUsername}
                        <br />
                        Board: {invitation.board.name}
                        <button onClick={() => handleAcceptInvitation(invitation._id)}>Accept</button>
                        <button onClick={() => handleRejectInvitation(invitation._id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InvitationList;