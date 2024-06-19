import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((type, message) => {
        setToasts((prevToasts) => [...prevToasts, { type, message, id: Date.now() }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastContainer
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 9999,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                }}
                position="bottom-center"
            >
                {toasts.map((toast) => (
                    <Toast key={toast.id} onClose={() => removeToast(toast.id)} bg={toast.type} delay={3000} autohide style={{ pointerEvents: 'all' }}>
                        <Toast.Body>{toast.message}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
};