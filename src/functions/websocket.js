import { io } from 'socket.io-client';
import { getToken } from '../../axiosInstance';

let socket = null;

export const initializeSocket = () => {
    if (!socket) {
        const token = getToken(); 
        if (!token) {
            throw new Error('Aucun token disponible. Veuillez vous authentifier.');
        }

        socket = io(import.meta.env.VITE_BACKEND_URL, {
            auth: { token },
            withCredentials: true,
        });

        socket.on('error', (err) => {
            console.error('Erreur de connexion WebSocket :', err.message);
            if (err.message === 'Invalid token') {
                window.location.href = '/'; 
            }
        });
    }

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null; 
    }
};

export const sendMessageToBubbles = (bubbleJids, message, title, link, callback) => {
    if (!socket) {
        throw new Error('Socket non initialisée. Appelez initializeSocket() d\'abord.');
    }

    if (!Array.isArray(bubbleJids)) {
        throw new Error('La liste des bulles doit être un tableau.');
    }

    socket.emit('sendMessage', { bubbleJids, message, title, link });

    socket.on('messageSent', () => {
        callback("OK"); 
    });

    socket.on('error', (err) => {
        console.error('Erreur lors de l\'envoi des messages :', err.message);
        callback('ERROR');
    });
};


export const listenToMessages = (callback) => {
    if (!socket) {
        throw new Error('Socket non initialisée. Appelez initializeSocket() d\'abord.');
    }
    socket.on('message', callback);
};

export const getBubbles = (callback) => {
    const socket = initializeSocket();
    socket.emit('getBubbles');

    socket.on('bubblesList', (bubbles) => {
        callback(bubbles); 
    });

    socket.on('error', (err) => {
        throw new Error('Erreur lors de la récupération des bulles :', err.message);
    });
};

export const getSocket = () => {
    if (!socket) {
        throw new Error('Socket non initialisée. Appelez initializeSocket() d\'abord.');
    }
    return socket;
};
