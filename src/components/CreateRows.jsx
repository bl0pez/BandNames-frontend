import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const CreateRows = () => {

    const [bands, setBands] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { socket } = useContext(SocketContext);

    useEffect(() => {

        setIsLoaded(true);

        socket.on('current-bands', (bands) => {
            setBands(bands);
            setIsLoaded(false);
        });

        return () => socket.off('current-bands');
    }, [socket]);


    const changeName = (event, id) => {
        const nuevoNombre = event.target.value;

        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = nuevoNombre;
            }
            return band;
        }));
    }

    const onPerdioFoco = (id, nombre) => {
        socket.emit('cambiar-nombre-banda', { id, nombre });
    }

    const votar = (id) => {
        socket.emit('votar-banda', id);
    }

    const borrarBanda = (id) => {
        socket.emit('borrar-banda', id);
    }


    return (
        <>
            {
                isLoaded
                    // spiner de boostrap
                    ? (<tr><td className='text-center' colSpan='4'>
                        <div className="spinner-border text-primary text-center" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div></td></tr>)
                    : (
                        bands.map(band => (
                            <tr key={band.id}>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => votar(band.id)}
                                    >+1</button>
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        value={band.name}
                                        onChange={(e) => changeName(e, band.id)}
                                        onBlur={() => onPerdioFoco(band.id, band.name)}
                                    />
                                </td>
                                <td>
                                    <h3>{band.votes}</h3>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => borrarBanda(band.id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))
                    )
            }

        </>
    )
}
