import React, { useEffect } from "react";
import "./switch.scss";

import { getState, setStateOn, setStateOff } from "../services/lights.service";

export default function Switch({handleLogout}) {
  const [relayState, setRelayState] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    async function fetchGetState() {
      try {
        setLoading(true);
        const state = await getState();
        if (state === "activo") {
          setRelayState(true);
          setLoading(false);
        } else {
          setRelayState(false);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error al obtener el estado del relé:", error);
      }
    }
    // Al iniciar el componente Switch lanza la primera comprobacion del estado del relé
    fetchGetState();

    // se inicia un intervalo de 5 segundos para comprobar el estado del rele

    const intervalId = setInterval(fetchGetState, 5000); // Comprobación cada 5 segundos

    // limpa el intervalo al desmontar el component
    return () => clearInterval(intervalId);
  }, []);

  const handleChange = async () => {
    try {
      setLoading(true);
      if (relayState) {
        await setStateOff(); // Llama a la función para apagar el relé en el ESP32
        setRelayState(false);
        setLoading(false);
      } else {
        await setStateOn(); // Llama a la función para encender el relé en el ESP32
        setRelayState(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al cambiar el estado del relé:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="switch"
        checked={relayState} // se marca activo o no en funcion del estado del relé 
        disabled={loading} // mientras la página esta cargando el interuptor se desactiva para evitar enviar dos peticiones juntas
        onChange={handleChange} // al cambiar el estado del switch llama la funcion handle change
      />
      <label htmlFor="switch">Toggle</label>
      <button onClick={handleLogout}
      // boton de cerrar seision
      > 
        Cerrar sesión</button> 
    </>

  );
}
