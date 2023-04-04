import { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {

    const [valor, setValor] = useState('');
    const { socket } = useContext(SocketContext);

    const onSubmit = (e) => {
        e.preventDefault();

        if (valor.trim().length > 0) {
            socket.emit('crear-banda', { nombre: valor });
            setValor('');
        }

    }

    return (
        <>
            <h2>Agregar Banda</h2>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ingrese el nombre de la banda"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />
            </form>

        </>
    )
}
