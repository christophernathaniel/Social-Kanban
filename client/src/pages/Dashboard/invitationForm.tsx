import React, { useState } from 'react';
import axios from 'axios';

interface InvitationFormProps {
    boardId: string;
}

const InvitationForm: React.FC<InvitationFormProps> = ({ boardId }) => {
    const [recipientUsername, setRecipientUsername] = useState('');

    const handleSendInvitation = async () => {
        try {
            const token = localStorage.getItem('token');
            // Include boardId in the request payload
            await axios.post('http://localhost:5001/api/invitations', { recipientUsername, boardId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Invitation sent successfully!');
            setRecipientUsername('');
        } catch (error) {
            alert('Failed to send invitation: ' + error.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={recipientUsername}
                onChange={(e) => setRecipientUsername(e.target.value)}
                placeholder="Recipient Username"
            />
            <button onClick={handleSendInvitation}>Send Invitation</button>
        </div>
    );
};

export default InvitationForm;